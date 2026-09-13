# 05 — Referensi Tools PRD Lain (Riset Kompetitor)

> **Tanggal riset:** 2026-09-13 (web research, ringkasan cuplikan resmi tiap tools).
> **Status:** REFERENSI — pola bagus diadopsi ke roadmap, diferensiasi dijaga.
> **Konteks kita:** Indonesia-first, founder non-teknis, output siap AI-coding (Cursor/Claude Code).

## 1. Peta tools

| Tool | URL | Positioning | Input → Output | Harga |
|---|---|---|---|---|
| ChatPRD | chatprd.ai | Platform AI #1 untuk PM (4.5★) | Prompt/catatan → PRD + user stories + spec + GTM brief | Freemium → Team/Enterprise |
| UX Pilot | uxpilot.ai | PRD + desain UI sekaligus | Deskripsi → PRD + layar UI hi-fi → Figma/HTML | 7 halaman gratis |
| River Editor | rivereditor.com | PRD lengkap 10 menit | Fitur → PRD + estimasi effort + risiko | Free tool (funnel produk) |
| WriteMyPRD | via Olvy / The Product Folks | Panduan interaktif + template | Info top-level → PRD via GPT + template PM | Gratis (komunitas) |
| RapidNative | rapidnative.com | Generator gratis terstruktur | Form → PRD + milestone | Gratis |
| Userdoc | userdoc.fyi | Requirements + kolaborasi AI | (disebut di direktori; belum dibedah dalam) | — |

## 2. Bedah singkat

### ChatPRD (pesaing terberat)
- Generate PRD, one-pager, user stories dari prompt; **custom template** sesuai standar tim.
- **Gap analysis + deteksi edge case otomatis**; review dokumen bak CPO (tantang asumsi).
- Export 1-klik: **Linear, Notion, Confluence, Google Docs**, Slack; **integrasi MCP** (IDE + AI desktop); generate **prototipe** dari PRD via AI coding tools; 12+ integrasi.
- Team: shared project spaces + konteks + history, custom AI personas, access control enterprise.

### UX Pilot (arjunya visual)
- PRD + **layar UI yang digenerate dari requirement**; iterasi via follow-up prompt (spec + layar berubah bareng); export Figma/HTML.

### River Editor (kelengkapan dokumen)
- Struktur: exec summary + **estimasi effort**, problem, user stories + AC, **P0/P1/P2**, non-functional (perf/security/scalability), KPI, dependensi teknis, timeline + **risk assessment**. Alur: describe → AI tulis 5–8 mnt → review → share.

### WriteMyPRD (komunitas)
- GPT + **step-by-step guide** (Razorpay), template PM (Lenny's), akses via Slack. Pelajaran: konten edukasi = akuisisi.

### RapidNative (SEO tool gratis)
- Struktur baku + **MoSCoW prioritization** + edukasi PRD-vs-BRD. Pelajaran: tool gratis = pintu masuk funnel.

## 3. Pola yang kita adopsi

| Pola | Sumber | Masuk ke | Status |
|---|---|---|---|
| Prioritas P0/P1/P2 + MoSCoW | River, RapidNative | Wayfinder (prioritas tiket) + PRD requirements | Roadmap Fase 3/5 |
| Estimasi effort di exec summary | River | Template PRD (Fase 5) | Roadmap |
| Risk assessment + timeline milestone | River | Template PRD (Fase 5) | Roadmap |
| Gap analysis + deteksi edge case otomatis | ChatPRD | Review PRD Final (pasangan pm-copilot stress-test) | Roadmap Fase 5 |
| Export Linear/Notion/GDocs (+Jira) | ChatPRD | Export Fase 5 (di atas MD/PDF/DOCX) | Roadmap Fase 6 |
| PRD → layar UI / prototipe | UX Pilot, ChatPRD | Calon Fase 6 (didukung skill prototype) | Ide |
| Custom template per tim | ChatPRD | Tier Team | Roadmap Fase 6+ |
| Expose sebagai MCP | ChatPRD | Opsi lanjut (sudah di skill mcp-builder) | Ide |
| Free tool + konten edukasi sebagai funnel | WriteMyPRD, RapidNative | Go-to-market (kalkulator/gratisan + panduan Indonesia) | Roadmap GTM |
| Alur interaktif terpandu | WriteMyPRD | Validasi pendekatan grill+form kita (kita lebih dalam: interogasi, bukan form) | Sudah ✅ |

## 4. Diferensiasi kita (mengapa menang di segmen sendiri)

1. **Interogasi, bukan 1-prompt**: kompetitor menulis dari deskripsi; kita mengasah ide kabur via tanya jawab + kuesioner. Segmen non-teknis butuh ini.
2. **Indonesia-first**: Bahasa Indonesia, QRIS/e-wallet/VA, harga rupiah, contoh lokal. Tak satu pun kompetitor di atas melakukan ini.
3. **Canvas arsitektur visual** (Svelte Flow): peta entitas → jembatan ke implementasi. Kompetitor berhenti di dokumen.
4. **Skor ketajaman + gate mutu**: PRD dinilai terukur sebelum export (fb: ChatPRD review, tapi kita jadikan angka + gate).
5. **Output siap AI-coding**: paket tempel ke Cursor/Claude Code (CONTEXT.md + tiket vertical + MCP-ready). Kompetitor berhenti di handoff manusia.

## 5. Yang TIDAK kita tiru

- Perang fitur enterprise umum (Confluence, audit kompleks) sebelum PMF lokal.
- Generate UI hi-fi otomatis sebelum PRD-nya solid (urutan: dokumen benar dulu, visual kemudian).
- Harga dolar + kartu-kredit-only (ditolak segmen kita).
