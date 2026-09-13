# 01 — ALUR (User Journey + Logic Tiap Tahap)

## Peta alur lengkap

```
[LANDING] ──▶ [LOGIN GMAIL] ──▶ [DASHBOARD: daftar proyek]
                                      │ [+ Proyek Baru]
                                      ▼
                    ┌─────────────────────────────────┐
                    │ TAHAP 1 — GRILL CHATBOT         │  skill: grill-me,
                    │ "Ceritakan idemu sebebasnya"    │  grilling, ask-matt,
                    │ AI tanya 1-per-1 (±10-20 Q)     │  grill-with-docs
                    └───────────────┬─────────────────┘
                                    ▼ CONTEXT.md terbentuk
                    ┌─────────────────────────────────┐
                    │ TAHAP 2 — FORM ABCD             │  skill: to-questionnaire,
                    │ Auto-terisi, user review/edit   │  domain-modeling,
                    │ A Audience, B Business,         │  wait-what
                    │ C Capabilities, D Details       │
                    └───────────────┬─────────────────┘
                                    ▼ struktur terkunci
                    ┌─────────────────────────────────┐
                    │ TAHAP 3 — WAYFINDER             │  skill: wayfinder,
                    │ Fog-of-war → Destination +      │  research, prototype,
                    │ Tickets (R/P/G/T) + Frontier    │  grilling
                    └───────────────┬─────────────────┘
                                    ▼ peta tuntas (no fog)
                    ┌─────────────────────────────────┐
                    │ TAHAP 4 — CANVAS ala n8n        │  skill: codebase-design,
                    │ Node modul/fitur, edge alur,    │  domain-modeling,
                    │ klik node = grill lanjutan      │  to-tickets, triage
                    └───────────────┬─────────────────┘
                                    ▼ graph terkunci
                    ┌─────────────────────────────────┐
                    │ TAHAP 5 — PRD FINAL             │  skill: to-spec,
                    │ Preview + quality gate (skor)   │  writing-for-agents,
                    │ Export MD/PDF/DOCX/PPTX         │  diagnosing-bugs,
                    │ [Salin ke AI Coding]            │  code-review, tdd
                    └─────────────────────────────────┘
```

User boleh **lompat/mundur** antar tahap. Tiap tahap menyimpan state
(`handoff`) sehingga sesi bisa disambung ("lanjutkan proyek Toko Online").

---

## TAHAP 1 — Grill Chatbot (pintu masuk)
**Tujuan:** ubah ide kabur → CONTEXT.md (bahasa ubiquitous + keputusan).

**Logic (mesin `grilling`):**
1. User kirim ide bebas (1-3 kalimat cukup). Router `ask-matt` memilih mode:
   ide baru → `grill-me`; ada konteks proyek → `grill-with-docs`.
2. AI membangun **decision tree** diam-diam, lalu menanya-caranya:
   - **SATU pertanyaan per giliran**, tunggu jawaban (dilarang borongan).
   - Urutan = **frontier-first**: hanya tanya yang prasyaratnya sudah terjawab.
   - Tiap jawaban → update CONTEXT.md + ADR (keputusan tercatat!).
3. Sinyal selesai: tidak ada cabang terbuka ATAU user ketik "cukup / wrap up".
4. Anti-gagal: `wait-what` mendeteksi jawaban ambigu ("terserah", "yang bagus aja")
   → AI memaksa pilih via opsi konkret (wizard-style).

**Contoh tukar pesan:**
> AI: "Siapa SATU pengguna utama yang paling menderita kalau aplikasi ini tidak ada?"
> User: "Pemilik toko kelontong."
> AI: "Saat ini dia mencatat stok pakai apa, dan bagian mana yang paling bikin nangis?"

**Hook produk:** progress bar "Ketajaman ide: 42% → 87%", streak pertanyaan,
tombol "Ke jutkan saya" (wrap up kapan pun). Panel samping live-preview CONTEXT.md.

## TAHAP 2 — Form ABCD (strukturisasi)
**Tujuan:** kunci struktur PRD dalam 4 blok. **Auto-prefilled** dari hasil grill,
user tinggal review/edit (bukan isi dari nol!).

| Blok | Nama | Isi | Skill |
|---|---|---|---|
| **A** | **Audience** | Persona, peran, stakeholder, user journey singkat | domain-modeling |
| **B** | **Business & Problem** | Latar, masalah, tujuan, KPI sukses, out-of-scope | to-questionnaire |
| **C** | **Capabilities** | Fitur inti (user stories), prioritas MoSCoW | triage |
| **D** | **Details & Constraints** | Tech preference, timeline, budget, acceptance criteria, risiko | tdd (AC), wait-what |

**Logic:**
1. `to-questionnaire` mengubah CONTEXT.md → field form (+ confidence per field).
2. Field confidence rendah (<70%) ditandai kuning → tombol "grill lagi" per field
   (mini-grill 2-3 pertanyaan, tidak keluar halaman).
3. Validasi `diagnosing-bugs`: kontradiksi antar-blok (mis. C minta realtime tapi
   D budget 0) → warning inline + saran resolusi.
4. Tombol "Kunci ABCD" → snapshot versi (v1, v2, ...) untuk diff nanti.

**Hook produk:** "90% sudah terisi otomatis" + skor kelengkapan per blok.

## TAHAP 3 — Wayfinder (peta perjalanan)
**Tujuan:** untuk ide BESAR, petakan dulu sebelum nulis spec. Fog-of-war → jelas.
**Jika grill tahap 1 menemukan "no fog" (ide kecil), tahap ini di-skip otomatis**
dengan pesan "Perjalananmu pendek, langsung ke canvas!".

**Logic (mesin `wayfinder`):**
1. Bootstrap: AI grill user untuk menemukan **DESTINATION**
   (mis. "Spec modul pembayaran terkunci").
2. AI memecah ketidaktahuan jadi **tickets** 4 tipe:
   - 🔬 **Research** (AFK — AI kerjakan sendiri: baca docs/riset)
   - 🧪 **Prototype** (HITL — AI buatkan artefak kasar untuk direaksi user)
   - 🎤 **Grilling** (HITL — butuh keputusan user, mini-grill)
   - ✅ **Task** (kerja manual/AFK)
3. Tampilan: **papan Kanban** (Backlog → Frontier → Doing → Done) + panel
   "Fog of War" (daftar unknown yang belum jadi tiket).
4. Aturan main: kerjakan dari **FRONTIER** (tiket terbuka, tak terblokir, belum
   diklaim). Selesaikan tiket → fog "lulus" jadi tiket baru atau hilang.
5. Selesai saat: tidak ada tiket tersisa → auto-handoff ke canvas.

**Hook produk:** gamifikasi fog-of-war ("3 kabut tersisa"), tiket Research yang
"tiba-tiba selesai sendiri" (AFK jobs) terasa magis.

## TAHAP 4 — Canvas ala n8n (arsitektur visual)
**Tujuan:** PRD jadi graph visual yang bisa dimanipulasi. Built with Svelte Flow (@xyflow/svelte).

**Jenis node (palet kiri):**
| Node | Warna | Isi |
|---|---|---|
| 🟣 Persona | ungu | 1 persona dari blok A |
| 🔵 Feature | biru | 1 fitur dari blok C (+ AC ringkas) |
| 🟢 Page/Screen | hijau | layar UI |
| 🟡 API | kuning | endpoint |
| 🟠 DB Entity | oranye | tabel/entitas |
| 🔴 Decision | merah | keputusan/percabangan |
| ⚪ Ticket | abu | tiket wayfinder yang lolos |

**Jenis edge:** `flows-to` (alur), `depends-on` (dependensi), `implements` (realisasi),
`blocks` (blokir — merah).

**Logic:**
1. Canvas **auto-generate** dari ABCD+wayfinder via `codebase-design`:
   tiap fitur → node Feature; seam (batas modul) → edge; modul diuji
   "deletion test" (kalau modul dihapus, apa yang rusak? kalau tidak jelas → shallow → digabung).
2. Interaksi: drag, hubungkan edge, klik node → panel kanan (detail + AC +
   tombol "🎤 grill node ini" untuk memperdalam node itu saja).
3. `triage` otomatis: ubah warna border node (Merah=Must, Kuning=Should, dst).
4. Validasi graph: node yatim (tanpa edge), cycle dependensi, AC kosong → panel "issues".
5. Tombol "Kunci Canvas" → freeze → lanjut ke PRD.

**Hook produk:** kepuasan visual ("peta aplikasiku!"), minimap, auto-layout rapi
1-klik, share link read-only ("lihat arsitektur ideku").

## TAHAP 5 — PRD Final (dokumen siap-coding)
**Tujuan:** satu artefak yang bisa ditempel ke AI coding dan langsung jalan.

**Logic:**
1. `to-spec` merender PRD dari CONTEXT.md + ABCD + wayfinder + canvas.
   Struktur baku: Ringkasan → Persona → Goals/KPI → Scope (in/out) →
   User Stories + AC → Arsitektur modul → API/DB → Non-functional →
   Risiko → Milestones → Appendix (ADR).
2. `writing-for-agents` mengoptimasi: predictable, hapus no-op, tiap story =
   vertical slice + AC testable (siap-TDD).
3. **Quality gate** (`code-review` + `diagnosing-bugs`): skor 0-100 +
   daftar temuan ("Story #7 tidak punya AC", "B & D kontradiksi soal timeline").
   PRD < 80 → tombol export menyarankan "perbaiki dulu" (tetap bisa export).
4. Export: **Markdown** (gratis), **PDF/DOCX/PPTX** (Pro) via skill pdf/docx/pptx.
5. Tombol pamungkas: **[📋 Salin paket AI-Coding]** → copy DESIGN.md + tasks
   terformat + prompt bootstrap ("paste ini sebagai pesan pertama di Cursor").

**Hook produk:** skor PRD (machismo: "PRD-ku 94!"), watermark "Made with PRD Builder"
di paket gratis (viral loop), template galeri komunitas.

---

## State & pewarisan antar-sesi (skill `handoff`)
Tiap proyek menyimpan: `CONTEXT.md`, ADR list, ABCD versions, wayfinder board,
canvas graph JSON, PRD versions. Buka proyek lama → AI baca handoff →
"Terakhir kita sampai canvas, 2 node belum ada AC. Lanjut?" — tanpa interogasi ulang.
