# DOKUMEN KONSEP PRODUK — Website PRD Builder

| | |
|---|---|
| Dokumen | Konsep Produk (Product Concept) |
| Versi | 2.0 (standar perusahaan) |
| Tanggal | 13 September 2026 |
| Status | Disetujui — fondasi Fase 0 |
| Dokumen terkait | 01-ALUR · 02-ARSITEKTUR · 03-MONETISASI · 04-ROADMAP |

---

## 1. Ringkasan Eksekutif

Website PRD Builder adalah platform SaaS yang mengubah ide aplikasi yang masih
kabur menjadi Dokumen Product Requirements (PRD) yang tajam, lengkap, dan siap
dieksekusi — baik oleh programmer manusia maupun AI coding assistant (Cursor,
Claude Code, dan sejenisnya) — dalam waktu kurang dari 60 menit.

Berbeda dengan chatbot AI umum yang menjawab sekali lalu selesai, produk ini
memandu pengguna melalui alur terstruktur: tanya jawab terpandu, formulir
terstruktur, pemetaan rencana kerja, visualisasi arsitektur berbasis kanvas,
dan penyusunan dokumen final yang lolos kendali mutu otomatis.

Pasar sasaran utama adalah Indonesia: individu non-teknis dengan ide aplikasi,
freelancer, software house kecil, dan tim produk yang membutuhkan PRD berkualitas
konsultan dalam waktu singkat dan biaya rendah.

## 2. Latar Belakang

Tiga pergeseran pasar melandasi produk ini:

1. **AI coding menjadi arus utama.** Menulis kode semakin murah; yang mahal
   adalah menentukan *apa* yang harus dibangun. Kualitas output AI coding
   ditentukan langsung oleh kualitas spesifikasinya.
2. **Kesenjangan spesifikasi.** Mayoritas pemilik ide (UMKM, freelancer,
   founder non-teknis) tidak mampu menulis PRD. PRD hasil tembakan-tunggal
   chatbot AI penuh asumsi, kontradiksi, dan kriteria penerimaan yang kabur —
   menyebabkan pembangunan salah arah dan biaya berulang.
3. **Bukti permintaan lokal.** Komunitas dan produk sejenis di Indonesia yang
   menggabungkan AI dengan alur terstruktur menunjukkan daya tarik kuat,
   namun belum ada yang fokus pada PRD builder visual berbahasa Indonesia
   dengan alur tanya jawab terpandu.

## 3. Rumusan Masalah

| ID | Masalah | Dampak bila tidak diselesaikan |
|---|---|---|
| M-1 | Blank-page syndrome: pengguna tidak tahu memulai PRD dari mana | Ide tidak pernah terdokumentasi; peluang hilang |
| M-2 | PRD mentah dari AI sekali-tembak: asumsi, scope creep, kriteria kabur | AI coding salah jalan; token, waktu, dan biaya terbuang |
| M-3 | Konteks tersebar: ide di chat, keputusan di kepala, tanpa artefak tunggal | Revisi berulang; pengetahuan hilang antar-sesi |
| M-4 | Kesenjangan handoff: PRD untuk manusia tidak cocok untuk AI coding | AI coding bertanya ulang / menebak; hasil tidak konsisten |

## 4. Tujuan Produk

1. **Tujuan utama:** setiap pengguna yang menyelesaikan alur memperoleh PRD
   yang dapat dieksekusi AI coding tanpa klarifikasi ulang (diukur: skor mutu
   PRD dan tingkat keberhasilan handoff).
2. **Tujuan pengalaman:** pengguna non-teknis dapat menyelesaikan alur inti
   tanpa pelatihan (diukur: tingkat penyelesaian alur dan waktu tempuh).
3. **Tujuan bisnis:** mencapai unit ekonomi positif melalui langganan freemium
   dengan pembayaran lokal dan internasional (diukur: konversi gratis-ke-bayar
   dan retensi — lihat dokumen 03-MONETISASI).

## 5. Target Pengguna

| Segmen | Profil | Kebutuhan utama |
|---|---|---|
| S-1 Founder/individu non-teknis | Punya ide aplikasi, nol kemampuan spec | Dipandu dari nol sampai PRD jadi |
| S-2 Freelancer & software house kecil | Butuh PRD cepat untuk klien | Kecepatan, template, ekspor profesional |
| S-3 Tim produk & analis | Butuh konsistensi dan kolaborasi | Versioning, review, kolaborasi tim |
| S-4 Komunitas AI coding | PRD sebagai input Cursor/Claude Code | Paket handoff siap-tempel |

Bahasa produk: Indonesia. Harga: Rupiah. Pembayaran: metode yang dikenal pasar
lokal (QRIS, e-wallet, virtual account) ditambah kartu internasional.

## 6. Proposisi Nilai

> "Ceritakan idemu dengan bahasa sehari-hari. Sistem yang mengajukan pertanyaan
> tajam, menyusun strukturnya, memetakan rencananya, dan menerbitkan PRD
> setara analis profesional — siap ditempel ke AI coding."

Tiga janji inti:

1. **Kepastian kelengkapan** — sistem tidak membiarkan keputusan menggantung;
   setiap lubang ditandai dan diselesaikan sebelum dokumen final.
2. **Nol mulai dari kosong** — setiap tahap terisi otomatis dari tahap
   sebelumnya; pengguna me-review dan menyunting, bukan mengarang.
3. **Siap eksekusi** — keluaran diformat agar dapat langsung dikerjakan AI
   coding maupun tim pengembang, lengkap dengan kriteria penerimaan teruji.

## 7. Diferensiasi Kompetitif

| Dimensi | Chatbot AI umum | Template PRD / konsultan | PRD Builder |
|---|---|---|---|
| Panduan tanya jawab | Sekali jawab, tanpa struktur | Manual / mahal | Terpandu satu-pertanyaan-per-langkah sampai tuntas |
| Struktur keluaran | Teks bebas | Statis | Formulir 4 blok + versioning |
| Perencanaan kerja besar | Tidak ada | Manual | Peta kerja dengan tiket bertipe dan prioritas |
| Visualisasi arsitektur | Tidak ada | Diagram manual | Kanvas node interaktif |
| Kendali mutu | Tidak ada | Subjektif | Skor mutu + daftar temuan otomatis |
| Handoff AI coding | Tidak dirancang | Tidak dirancang | Paket siap-tempel terformat |
| Lokalisai Indonesia | Parsial | Ya (konsultan) | Penuh: bahasa, harga, pembayaran |

## 8. Konsep Solusi

Alur produk terdiri dari lima tahap berurutan (detail di dokumen 01-ALUR).
Pengguna dapat berpindah tahap secara fleksibel; seluruh status tersimpan dan
dapat dilanjutkan kapan pun.

**Tahap 1 — Tanya Jawab Terpandu.** Pengguna menceritakan ide secara bebas.
Sistem mengajukan pertanyaan secara satu-per-satu mengikuti ketergantungan
keputusan, mencatat setiap jawaban sebagai konteks dan keputusan terekam.
Pengguna dapat mengakhiri kapan pun.

**Tahap 2 — Formulir Terstruktur (ABCD).** Empat blok — Audience (pengguna),
Business & Problem (latar dan tujuan), Capabilities (fitur), Details &
Constraints (batasan) — terisi otomatis dari hasil tahap 1 untuk di-review
dan disunting. Kolom yang kurang meyakinkan ditandai untuk pendalaman.

**Tahap 3 — Pemetaan Rencana Kerja.** Untuk gagasan besar, sistem memetakan
ketidakjelasan menjadi daftar kerja bertipe (riset, purwarupa, keputusan,
tugas) dengan urutan prioritas eksplisit. Gagasan kecil melewati tahap ini
secara otomatis.

**Tahap 4 — Kanvas Arsitektur.** Struktur divisualkan sebagai graf node
interaktif (persona, fitur, layar, API, data, keputusan) yang dapat diatur
dan dihubungkan. Setiap simpul menyimpan detail dan kriteria penerimaannya.
Sistem memvalidasi kelengkapan dan konsistensi graf.

**Tahap 5 — Dokumen Final & Handoff.** Sistem menyusun PRD baku berversi,
menilainya dengan kendali mutu otomatis (skor + temuan), dan menyediakan
ekspor multi-format serta paket handoff siap-tempel untuk AI coding.

*Catatan implementasi (internal): kelima tahap dijalankan oleh mesin AI
internal perusahaan yang menerapkan praktik tanya jawab terpandu, pemodelan
domain, dan penulisan spesifikasi yang disiplin. Detail arsitektur di dokumen
02-ARSITEKTUR. Istilah dan mekanisme internal tidak ditampilkan ke pengguna.*

## 9. Model Bisnis

Freemium SaaS tiga tingkat — Gratis, Pro (Rp49.000/bulan), Team
(Rp199.000/bulan) — dengan batasan penggunaan yang dirancang sebagai
paywall alami (proyek, volume tanya jawab, ekspor lanjutan, kolaborasi).
Pembayaran domestik melalui QRIS, e-wallet, virtual account, kartu, dan
gerai retail; pembayaran internasional melalui kartu global. Rincian lengkap
di dokumen 03-MONETISASI.

## 10. Metrik Keberhasilan

| Metrik | Definisi | Target awal |
|---|---|---|
| Tingkat penyelesaian alur | % proyek yang mencapai dokumen final | ≥ 40% |
| Waktu ide-ke-PRD | Median durasi proyek baru ke dokumen v1 | ≤ 60 menit |
| Skor mutu PRD | Median skor kendali mutu dokumen v1 | ≥ 80/100 |
| Keberhasilan handoff | % paket handoff yang berjalan tanpa klarifikasi ulang (survei) | ≥ 70% |
| Konversi berbayar | % pengguna aktif menjadi Pro/Team dalam 30 hari | ≥ 3% |
| Retensi proyek | % pengguna kembali mengerjakan proyek dalam 30 hari | ≥ 25% |

## 11. Risiko dan Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Kualitas keluaran AI tidak konsisten | PRD cacat; kepercayaan turun | Kendali mutu otomatis + ambang skor; manusia me-review sebelum final |
| Biaya API model bahasa | Margin tergerus | Batas kuota per paket; pemilihan model per tugas; cache konteks |
| Ketergantungan penyedia model/pembayaran | Gangguan layanan | Abstraksi multi-penyedia; dua gateway pembayaran |
| Kompetitor meniru cepat | Tekanan harga | Kecepatan eksekusi; galeri template komunitas; data alur sebagai parit |
| Regulasi data & privasi | Kepatuhan | Data milik pengguna; hapus permanen; tanpa penyimpanan rahasia |

## 12. Prinsip Operasional Internal

1. Mekanisme dan istilah internal (termasuk mesin AI) tidak ditampilkan ke
   pengguna; yang terlihat hanya perilaku produk yang cerdas dan konsisten.
2. Setiap keputusan produk tercatat dan dapat dilacak (versioning artefak).
3. Mutu di atas kecepatan rilis: tidak ada dokumen final tanpa lolos kendali mutu.
4. Indonesia-utama dalam bahasa, contoh, harga, dan pembayaran.
