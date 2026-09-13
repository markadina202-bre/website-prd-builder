# 06 — Referensi Arsitektur Skala Besar (1 Juta Concurrent Users)

> **Sumber:** referensi yang ditempel user (2026-09-13), disimpan utuh sebagai acuan jangka panjang.
> **Status:** REFERENSI — bukan rencana build saat ini. Adopsi bertahap sesuai roadmap.
> **Catatan adaptasi ke stack kita:**
> - Dokumen memakai Next.js sebagai contoh → padanannya di kita **SvelteKit** (prinsip sama: static + ISR + edge + CDN).
> - Mulai: 1 region + 1 provider LLM via OpenRouter (Fase 1). Multi-provider + antrian + cache semantik = Fase 7+.
> - Pola yang LANGSUNG relevan: request deduplication, progressive generation (stream per seksi), template pre-generation untuk fitur umum, priority queue Free/Pro/Enterprise.

---

# 🏗️ Arsitektur 1 Juta Concurrent Users — PRD Generator

Pertama, saya jujur: **1 juta concurrent untuk PRD generator itu extreme.** Tapi kalau kamu mau build untuk scale itu, berikut arsitektur yang bisa handle.

---

## 1. REALITY CHECK: Angka yang Harus Dipahami

```
1,000,000 concurrent users ≠ 1,000,000 PRD/detik

Asumsi realistis:
├── 1,000,000 users online bersamaan
├── ~5% aktif generate PRD di waktu yang sama = 50,000 active
├── Rata-rata 1 PRD = 30 detik
├── Throughput: ~1,667 PRD/detik (peak)
├── Rata-rata harian: ~2-5 juta PRD/hari
│
├── LLM API calls per PRD: ~3-5 calls
├── Total LLM calls/detik: ~5,000-8,000
├── Token/detik: ~15-30 juta
│
└── Ini BUTUH arsitektur distributed, bukan single server.
```

---

## 2. HIGH-LEVEL ARCHITECTURE (Multi-Region)

```
┌─────────────────────────────────────────────────────────────────────┐
│                        GLOBAL TRAFFIC                              │
│                                                                     │
│  Users: 🌏 Asia  🌍 Europe  🌎 Americas                            │
│           │          │            │                                  │
│           ▼          ▼            ▼                                  │
│  ┌─────────────────────────────────────────────┐                    │
│  │          CDN + EDGE (Cloudflare)            │                    │
│  │  ├── Static assets (Next.js static)         │                    │
│  │  ├── Edge cache (KV cache read replica)     │                    │
│  │  └── DDoS protection + rate limiting        │                    │
│  └─────────────────┬───────────────────────────┘                    │
│                    │                                                │
│                    ▼                                                │
│  ┌─────────────────────────────────────────────┐                    │
│  │         GLOBAL LOAD BALANCER                │                    │
│  │         (Cloudflare LB / AWS ALB)           │                    │
│  │  ├── Geo-routing (user → nearest region)    │                    │
│  │  ├── Health checks                          │                    │
│  │  └── SSL termination                        │                    │
│  └───┬─────────────┬─────────────┬─────────────┘                    │
│      │             │             │                                  │
│      ▼             ▼             ▼                                  │
│  ┌────────┐   ┌────────┐   ┌────────┐                              │
│  │REGION  │   │REGION  │   │REGION  │                              │
│  │ap-se-1 │   │eu-we-1 │   │us-ea-1 │   (masing-masing identik)    │
│  └───┬────┘   └───┬────┘   └───┬────┘                              │
│      │             │             │                                  │
└──────┼─────────────┼─────────────┼──────────────────────────────────┘
       │             │             │
       ▼             ▼             ▼
┌─────────────────────────────────────────────────────────────────────┐
│              PER-REGION ARCHITECTURE (× 3 regions)                  │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                    API GATEWAY LAYER                          │  │
│  │  ┌─────────────────────────────────────────────────────────┐  │  │
│  │  │  Kubernetes Ingress / AWS API Gateway                   │  │  │
│  │  │  ├── Rate limiting: 10 req/user/menit                   │  │  │
│  │  │  ├── Auth: JWT validation (edge, 0 LLM cost)           │  │  │
│  │  │  ├── Request deduplication (same brief = same PRD)      │  │  │
│  │  │  └── Circuit breaker (jika LLM provider down)           │  │  │
│  │  └─────────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────┬───────────────────────────────────┘  │
│                              │                                      │
│                              ▼                                      │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                 MESSAGE QUEUE (Buffer)                        │  │
│  │                                                               │  │
│  │  ┌─────────────────────────────────────────────────────────┐  │  │
│  │  │  Apache Kafka / AWS SQS + SNS                           │  │  │
│  │  │                                                         │  │  │
│  │  │  Topics:                                                │  │  │
│  │  │  ├── prd-requests     (user submit → queue)             │  │  │
│  │  │  ├── prd-processing   (worker pick up)                  │  │  │
│  │  │  ├── prd-completed    (notify user via WebSocket)       │  │  │
│  │  │  ├── index-requests   (new repo → index queue)          │  │  │
│  │  │  └── cache-invalidate (commit → invalidate)             │  │  │
│  │  │                                                         │  │  │
│  │  │  Partitions: 100-500 per topic (parallel processing)    │  │  │
│  │  └─────────────────────────────────────────────────────────┘  │  │
│  └───────────┬───────────────────────────────┬───────────────────┘  │
│              │                               │                      │
│              ▼                               ▼                      │
│  ┌───────────────────────┐     ┌───────────────────────────────┐    │
│  │   FAST PATH (Sync)    │     │   SLOW PATH (Async Workers)   │    │
│  │                       │     │                               │    │
│  │  Cache HIT?           │     │  ┌─────────────────────────┐  │    │
│  │  → Return cached PRD  │     │  │ PRD Generator Workers   │  │    │
│  │  → Latency: <100ms    │     │  │ (auto-scale 10-500 pods)│  │    │
│  │  → 0 LLM call         │     │  │                         │  │    │
│  │                       │     │  │ Worker per partition:   │  │    │
│  │  Index search?        │     │  │ ├── Fetch context       │  │    │
│  │  → Vector lookup      │     │  │ ├── Run reasoning       │  │    │
│  │  → Latency: <50ms     │     │  │ ├── Format output       │  │    │
│  │                       │     │  │ └── Save to cache       │  │    │
│  │  Pods: 50-200         │     │  │                         │  │    │
│  │  CPU: minimal         │     │  │ Concurrency: 5-10/worker│  │    │
│  └───────────────────────┘     │  └─────────────────────────┘  │    │
│                                │                               │    │
│                                │  ┌─────────────────────────┐  │    │
│                                │  │ Indexer Workers         │  │    │
│                                │  │ (auto-scale 5-50 pods)  │  │    │
│                                │  │                         │  │    │
│                                │  │ ├── Clone repo          │  │    │
│                                │  │ ├── Chunk codebase      │  │    │
│                                │  │ ├── Embed chunks        │  │    │
│                                │  │ └── Store to Qdrant     │  │    │
│                                │  └─────────────────────────┘  │    │
│                                └───────────────────────────────┘    │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                    DATA LAYER                                 │  │
│  │                                                               │  │
│  │  ┌──────────────┐ ┌──────────────┐ ┌──────────────────────┐  │  │
│  │  │ Redis Cluster│ │ Qdrant       │ │ PostgreSQL           │  │  │
│  │  │ (KV Cache)   │ │ Cluster      │ │ (Users, PRDs,        │  │  │
│  │  │              │ │ (Vectors)    │ │  Billing, History)   │  │  │
│  │  │ 6 nodes      │ │ 3-6 nodes    │ │ Primary + 2 replicas │  │  │
│  │  │ 64 GB total  │ │ 32 GB total  │ │ 128 GB               │  │  │
│  │  │              │ │              │ │                      │  │  │
│  │  │ Read: 500k   │ │ Search: 50k  │ │ Write: 5k            │  │  │
│  │  │ ops/detik    │ │ qps          │ │ ops/detik            │  │  │
│  │  └──────────────┘ └──────────────┘ └──────────────────────┘  │  │
│  │                                                               │  │
│  │  ┌──────────────────────────────────────────────────────┐     │  │
│  │  │ Object Storage (S3 / R2)                             │     │  │
│  │  │ ├── PRD exports (PDF, MD, JSON)                      │     │  │
│  │  │ ├── Repo snapshots (untuk indexing)                  │     │  │
│  │  │ └── Embedding backups                                │     │  │
│  │  └──────────────────────────────────────────────────────┘     │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │                 LLM ROUTER LAYER                              │  │
│  │                                                               │  │
│  │  ┌──────────────────────────────────────────────────────┐     │  │
│  │  │  LiteLLM Proxy (multi-provider, load balance)        │     │  │
│  │  │                                                      │     │  │
│  │  │  Providers (failover chain):                         │     │  │
│  │  │  ├── 1. Anthropic Claude (primary, best reasoning)   │     │  │
│  │  │  ├── 2. OpenAI GPT-4o (secondary)                    │     │  │
│  │  │  ├── 3. Google Gemini (tertiary, murah)              │     │  │
│  │  │  ├── 4. Groq Llama 3.3 (fallback, super cepat)      │     │  │
│  │  │  └── 5. Together AI (emergency fallback)             │     │  │
│  │  │                                                      │     │  │
│  │  │  Routing logic:                                      │     │  │
│  │  │  ├── PRD large  → Claude/GPT-4o (quality)            │     │  │
│  │  │  ├── PRD medium → GPT-4o-mini / Gemini Flash         │     │  │
│  │  │  ├── PRD small  → Groq Llama (speed + murah)         │     │  │
│  │  │  └── PRD micro  → Groq Llama (instant)               │     │  │
│  │  │                                                      │     │  │
│  │  │  Rate limit management:                              │     │  │
│  │  │  ├── Per-provider RPM/TPM tracking                   │     │  │
│  │  │  ├── Auto-failover saat rate limit hit               │     │  │
│  │  │  └── Request queuing saat semua provider busy        │     │  │
│  │  └──────────────────────────────────────────────────────┘     │  │
│  └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 3. SCALING STRATEGY PER KOMPONEN

### 3.1 Frontend (1M concurrent users)

```
Masalah: 1M users buka halaman bersamaan
Solusi: Static + Edge, hampir 0 server load

┌──────────────────────────────────────────────┐
│  Next.js App (Static Export + ISR)           │
│                                              │
│  ├── Static pages (landing, dashboard)       │
│  │   → CDN cache, 0 server hits              │
│  │   → Served from 300+ Cloudflare PoPs      │
│  │   → Latency: <20ms globally               │
│  │                                           │
│  ├── ISR pages (PRD history, profile)        │
│  │   → Revalidate setiap 60 detik            │
│  │   → Edge cache hit rate: ~95%             │
│  │                                           │
│  └── Dynamic (editor, real-time PRD)         │
│      → WebSocket via edge function           │
│      → Regional serverless (Vercel/CF)       │
│                                              │
│  Infra: Vercel Enterprise / Cloudflare Pages │
│  Cost: ~$200-500/bulan                       │
│  Server load: ~0 (semua di edge) ✅          │
└──────────────────────────────────────────────┘
```

### 3.2 API Gateway (50K active requests/detik)

```
Masalah: 50K req/detik, harus auth + rate limit tanpa bottleneck
Solusi: Stateless gateway, horizontal scale

┌──────────────────────────────────────────────┐
│  API Gateway (Kong / AWS API GW / Envoy)     │
│                                              │
│  ├── Auto-scale: 20-100 pods                 │
│  ├── Stateless (auth via JWT, no session)    │
│  ├── Rate limit per user:                    │
│  │   ├── Free: 5 PRD/hari                    │
│  │   ├── Pro: 50 PRD/hari                    │
│  │   └── Enterprise: unlimited               │
│  ├── Request deduplication:                  │
│  │   └── hash(userId + brief) → jika sama    │
│  │       dalam 5 menit, return cached PRD    │
│  └── Circuit breaker:                        │
│      └── Jika LLM latency > 30s, return      │
│          "Queue position: #42, ETA: 2 min"   │
│                                              │
│  Latency overhead: <5ms per request ✅       │
└──────────────────────────────────────────────┘
```

### 3.3 Message Queue (Buffer untuk absorb spike)

```
Masalah: 1M users bisa submit PRD bersamaan → LLM collapse
Solusi: Queue + backpressure + priority

┌──────────────────────────────────────────────┐
│  Kafka Cluster (3 brokers, 100 partitions)   │
│                                              │
│  Topic: prd-requests                         │
│  ├── Partition key: userId (consistent hash) │
│  ├── Retention: 24 jam                       │
│  ├── Consumer groups:                        │
│  │   ├── prd-workers (500 consumers)         │
│  │   └── analytics-workers (10 consumers)    │
│  └── Backpressure:                           │
│      ├── Queue depth > 10,000 → slow down    │
│      │   acceptance rate                      │
│      ├── Queue depth > 50,000 → return       │
│      │   "High demand, try again in 5 min"    │
│      └── Priority queue:                     │
│          ├── P0: Enterprise users (instant)  │
│          ├── P1: Pro users (< 1 min)         │
│          └── P2: Free users (< 5 min)        │
│                                              │
│  Throughput: 100K+ messages/detik ✅         │
└──────────────────────────────────────────────┘
```

### 3.4 KV Cache (500K reads/detik)

```
Masalah: 500K cache reads/detik, harus <1ms latency
Solusi: Redis Cluster multi-region

┌──────────────────────────────────────────────┐
│  Redis Cluster (per region)                  │
│                                              │
│  Region ap-se-1:                             │
│  ├── 6 master nodes + 6 replicas             │
│  ├── 64 GB RAM total                         │
│  ├── 64 GB RAM total                         │
│  ├── Sharding: hash(key) → slot → node       │
│  ├── Read replicas: 2x per master            │
│  ├── Max throughput: 1M ops/detik            │
│  └── Latency: <1ms (P99)                     │
│                                              │
│  Cross-region replication:                   │
│  ├── Active-Active (Redis Enterprise)        │
│  │   atau                                    │
│  ├── Active-Passive (async replication)      │
│  └── Conflict resolution: LWW (last write)   │
│                                              │
│  Cache warming strategy:                     │
│  ├── Popular libs (Next.js, React, Prisma)   │
│  │   → Pre-cache saat deploy                 │
│  ├── Popular repos (top 1000 GitHub)         │
│  │   → Pre-index + pre-cache                 │
│  └── Cold cache → fetch + cache on first hit │
│                                              │
│  Hit rate target: >90% ✅                    │
│  (artinya 90% requests = 0 LLM call)         │
└──────────────────────────────────────────────┘
```

### 3.5 Vector DB (50K searches/detik)

```
Masalah: 50K vector searches/detik, harus <50ms
Solusi: Qdrant distributed cluster

┌──────────────────────────────────────────────┐
│  Qdrant Cluster (per region)                 │
│                                              │
│  ├── 6 nodes (3 primary + 3 replicas)        │
│  ├── 32 GB RAM per node                      │
│  ├── Collections per repo:                   │
│  │   ├── repo_abc123 (2000 chunks)           │
│  │   ├── repo_def456 (5000 chunks)           │
│  │   └── ... (100K+ repos)                   │
│  ├── Total vectors: ~500M                    │
│  ├── Quantization: int8 (hemat 4x RAM)       │
│  ├── HNSW index: ef_search=128               │
│  └── Search latency: <20ms (P99) ✅          │
│                                              │
│  Scaling strategy:                           │
│  ├── Horizontal: tambah node = tambah capacity│
│  ├── Shard: 1 collection → multiple shards   │
│  └── Replicate: read-heavy → tambah replicas │
│                                              │
│  Alternative untuk scale extreme:            │
│  ├── Milvus (billion-scale vectors)          │
│  └── Pinecone (fully managed, auto-scale)    │
└──────────────────────────────────────────────┘
```

### 3.6 LLM Router (Bottleneck Terbesar)

```
Masalah: 5,000-8,000 LLM calls/detik
         ~20 juta token/detik
         1 provider TIDAK CUKUP

Solusi: Multi-provider + smart routing + caching

┌──────────────────────────────────────────────┐
│  LiteLLM Proxy Cluster (20 pods)             │
│                                              │
│  Provider capacity (per menit):              │
│  ├── Anthropic Claude:  40K RPM, 4M TPM     │
│  ├── OpenAI GPT-4o:     10K RPM, 2M TPM     │
│  ├── Google Gemini:     60K RPM, 10M TPM    │
│  ├── Groq Llama:        30K RPM, 6M TPM     │
│  ├── Together AI:       20K RPM, 4M TPM     │
│  └── TOTAL:             160K RPM, 26M TPM   │
│                                              │
│  Routing matrix:                             │
│  ┌─────────┬──────────────────────────────┐  │
│  │ PRD Tier│ Provider Priority            │  │
│  ├─────────┼──────────────────────────────┤  │
│  │ Large   │ Claude → GPT-4o → Gemini     │  │
│  │ Medium  │ GPT-4o-mini → Gemini Flash   │  │
│  │ Small   │ Groq → Together → Gemini     │  │
│  │ Micro   │ Groq (instant, murah)        │  │
│  └─────────┴──────────────────────────────┘  │
│                                              │
│  Semantic Cache (paling penting!):           │
│  ├── Sebelum call LLM, cek:                 │
│  │   "Apakah ada PRD serupa yang sudah      │
│  │    pernah di-generate?"                  │
│  ├── Embed user brief → similarity search   │
│  │   di cache (threshold: >0.92)            │
│  ├── HIT → return cached PRD (0 LLM call!)  │
│  ├── Expected hit rate: 30-50%              │
│  └── Penghematan: ~$10,000-20,000/hari ✅   │
│                                              │
│  Cost estimation:                            │
│  ├── Tanpa semantic cache: ~$50K/hari 🔴    │
│  ├── Dengan semantic cache: ~$25K/hari 🟡   │
│  └── Dengan KV + semantic:  ~$15K/hari ✅   │
└──────────────────────────────────────────────┘
```

---

## 4. DATA FLOW: 1 Request dari User ke PRD

```
User klik "Generate PRD"
    │
    ▼ (1) CDN Edge (<20ms)
    Static page served from Cloudflare PoP
    │
    ▼ (2) API Gateway (<5ms)
    Auth JWT + Rate limit check
    │
    ▼ (3) Deduplication check (<2ms)
    hash(userId + brief) → Redis lookup
    ├── HIT → return existing PRD ✅ (total: <30ms)
    └── MISS → continue ↓
    │
    ▼ (4) Semantic Cache check (<50ms)
    Embed brief → search PRD cache
    ├── HIT (>0.92 similarity) → return cached ✅ (total: <100ms)
    └── MISS → continue ↓
    │
    ▼ (5) Enqueue to Kafka (<5ms)
    Topic: prd-requests, partition: hash(userId)
    Return to user: "Queue position: #42"
    │
    ▼ (6) WebSocket connection established
    User sees real-time progress
    │
    ▼ (7) Worker picks up from Kafka (<1s)
    ├── Phase 1: Context (parallel, 2-5s)
    │   ├── KV Cache lookup (Redis, <1ms each)
    │   ├── Vector search (Qdrant, <20ms)
    │   └── Fetch missing (LLM API, 1-3s)
    │
    ├── Phase 2: Fusion (programmatic, <100ms)
    │
    ├── Phase 3: Reasoning (LLM, 10-20s)
    │   ├── Stream tokens via WebSocket
    │   └── User sees PRD being written live
    │
    └── Phase 4: Output (LLM, 2-3s)
    │
    ▼ (8) Save result
    ├── Redis cache (KV + semantic)
    ├── PostgreSQL (PRD history)
    └── S3 (export files)
    │
    ▼ (9) Notify user via WebSocket
    "PRD ready!" → total: 15-30 detik
```

---

## 5. INFRASTRUCTURE COST ESTIMATION

### Per Region (× 3 regions)

| Komponen | Spesifikasi | Cost/Bulan |
|---|---|---|
| **Kubernetes** (EKS/GKE) | 50-200 nodes, auto-scale | $5,000-15,000 |
| **Redis Cluster** | 6 nodes × 64GB | $3,000-5,000 |
| **Qdrant Cluster** | 6 nodes × 32GB | $2,000-4,000 |
| **PostgreSQL** | 1 primary + 2 replicas, 128GB | $2,000-4,000 |
| **Kafka** | 3 brokers, 100 partitions | $1,500-3,000 |
| **S3 Storage** | ~10 TB | $250 |
| **Load Balancer** | ALB/NLB | $500 |
| **CDN** | Cloudflare Enterprise | $5,000 |
| **Monitoring** | Datadog/Grafana Cloud | $1,000-2,000 |
| **Subtotal infra** | | **$20,000-40,000** |

### LLM API Cost (Global)

| Skenario | Token/Hari | Cost/Hari | Cost/Bulan |
|---|---|---|---|
| **Tanpa caching** | 500M | $50,000 | $1.5M 🔴 |
| **KV Cache only** | 150M | $15,000 | $450K 🟡 |
| **KV + Semantic Cache** | 75M | $7,500 | $225K ✅ |
| **KV + Semantic + Smart Routing** | 40M | $4,000 | $120K ✅✅ |

### Total

| | Cost/Bulan |
|---|---|
| Infrastructure | ~$30,000-60,000 |
| LLM API | ~$120,000-225,000 |
| Team (10-15 engineers) | ~$150,000-300,000 |
| **TOTAL** | **~$300,000-585,000/bulan** |

---

## 6. KEY OPTIMIZATIONS UNTUK 1M USERS

### Optimization 1: Semantic Cache (Impact Terbesar)
```typescript
// Sebelum call LLM, cek apakah brief serupa sudah pernah di-generate
async function semanticCacheLookup(brief: string, techStack: string[]) {
  const briefEmbedding = await embed(brief);

  const cached = await qdrant.search("prd-cache", {
    vector: briefEmbedding,
    limit: 1,
    score_threshold: 0.92,  // sangat similar
    filter: {
      must: [
        { key: "techStack", match: { value: techStack.sort().join(",") } },
        { key: "age", range: { lt: 7 * 24 * 3600 } },  // max 7 hari
      ],
    },
  });

  if (cached.length > 0) {
    return cached[0].payload.prd;  // 0 LLM call! ✅
  }
  return null;
}
```

### Optimization 2: PRD Template Pre-generation
```typescript
// Untuk fitur umum (auth, payment, notification, dll)
// Pre-generate PRD template saat off-peak
// User tinggal customize → 80% lebih cepat

const COMMON_FEATURES = [
  "authentication", "payment", "notification",
  "search", "file-upload", "real-time-chat",
  "dashboard", "admin-panel", "api-gateway",
];

// Pre-generate saat malam (low traffic)
for (const feature of COMMON_FEATURES) {
  for (const stack of POPULAR_STACKS) {
    const prd = await generatePRD(feature, stack);
    await semanticCache.save(feature, stack, prd);
  }
}
```

### Optimization 3: Progressive Generation
```typescript
// Jangan generate full PRD sekaligus.
// Kirim per section → user bisa stop jika sudah cukup

async function* generatePRDStream(brief: string) {
  yield { section: "problem", content: "..." };     // 2s
  yield { section: "requirements", content: "..." }; // 5s
  yield { section: "tech", content: "..." };         // 3s

  // User bisa klik "Stop, ini sudah cukup"
  // → hemat token untuk sections yang tidak dibutuhkan
}
```

---

## 7. MONITORING & ALERTING

```
Dashboard wajib untuk 1M users:

┌─────────────────────────────────────────────┐
│  REAL-TIME METRICS                          │
│                                             │
│  📊 Traffic:     847K concurrent users      │
│  📝 PRD Queue:   2,341 pending              │
│  ⚡ Avg Latency: 12.4s (P95: 28s)          │
│  💰 Token/min:   18.2M                      │
│  💵 Cost/hour:   $312                       │
│  🎯 Cache Hit:   87.3% (target: >90%)       │
│  🔴 Error Rate:  0.12% (target: <0.1%)      │
│                                             │
│  LLM Provider Status:                       │
│  ├── Anthropic:  ✅ 40K RPM (72% utilized)  │
│  ├── OpenAI:     ✅ 10K RPM (85% utilized)  │
│  ├── Gemini:     ✅ 60K RPM (45% utilized)  │
│  ├── Groq:       ⚠️ 28K RPM (93% utilized)  │
│  └── Together:   ✅ 5K RPM (25% utilized)   │
│                                             │
│  Alerts:                                    │
│  🚨 Groq approaching rate limit → shift     │
│     traffic to Together                     │
│  🚨 Cache hit rate dropping → investigate   │
└─────────────────────────────────────────────┘
```

---

## 💡 TL;DR

> **1M concurrent users = arsitektur distributed multi-region.**
>
> **Kunci utamanya BUKAN di infra, tapi di 3 layer caching:**
> 1. **KV Cache** (Redis) → cache data external (docs, issues)
> 2. **Vector Index** (Qdrant) → search codebase, bukan full pack
> 3. **Semantic Cache** (Qdrant + embedding) → cache PRD yang serupa
>
> **Dengan 3 layer cache:**
> - 87-90% requests = **0 LLM call**
> - LLM cost turun dari $1.5M → $120K/bulan
> - Latency turun dari 30s → <100ms (cache hit)
>
> **Infra cost: ~$30-60K/bulan** (3 regions)
> **LLM cost: ~$120-225K/bulan** (dengan caching)
> **Total: ~$300-585K/bulan** (termasuk team)
>
> **Mulai dari 1 region, 1 provider, scale saat butuh.**
> Jangan build untuk 1M users di hari pertama. 🚀
