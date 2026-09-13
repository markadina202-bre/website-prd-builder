# POLA-PIKIR.md — Cara Berpikir Agen (Pewarisan)

> Pola yang TERBUKTI berguna. Agen berikutnya wajib pakai, boleh nambah (P-xxx).

## P-001: Grill dulu, bangun kemudian
Jangan asumsi kebutuhan user. Satu pertanyaan tajam > sepuluh paragraf asumsi.
Prinsip `grilling`: 1 pertanyaan/giliran, frontier-first, catat keputusan (ADR).

## P-002: Skill dulu sebelum kode
Masalah yang dihadapi hampir pasti sudah diselesaikan salah satu dari 23 skill.
Cari dulu (`search.py`), pakai polanya, baru tulis kode baru.

## P-003: Kecil, tajam, composable (warisan Matt Pocock)
Pecah engineering jadi primitif kecil single-purpose (1 modul = 1 skill),
lalu kombinasikan per skenario. Lawan: "modul dewa" yang mengerjakan semua.

## P-004: Enforcement > saran (warisan superpowers)
Untuk hal kritis (TDD, verifikasi, webhook signature), buat sistem yang
MENOLAK alur salah, bukan sekadar mengimbau. Contoh: PRD skor <80 →
tombol export kasih peringatan; webhook tanpa signature valid → 401.

## P-005: Bukti > klaim (verification-before-completion)
"Done" = ada bukti jalan (test hijau, screenshot, transaksi sukses),
bukan "kayaknya sudah". Tiap fase roadmap punya exit criteria yang bisa didemo.

## P-006: Predictability untuk output AI (warisan writing-for-agents)
Dokumen yang dibaca AI (PRD, prompt, skill) harus menghasilkan PROSES yang sama
tiap run. Hapus no-op, pakai leading words (frontier, fog-of-war, vertical slice),
ungkapkan kriteria selesai yang tajam.

## P-007: Pewarisan itu fitur, bukan beban
Setiap sesi berakhir dengan repo lebih pintar dari saat dimulai:
PROGRESS update, fakta baru → MEMORY, keputusan → DECISIONS, pola baru → sini.

## P-008: Indonesia-first dalam UX
Bahasa sederhana, contoh lokal (toko kelontong, PPDB, absensi),
harga rupiah, pembayaran yang orang kenal (QRIS/ShopeePay). Jangan asumsikan kartu kredit.

## P-009: Skill = infrastruktur latar belakang, BUKAN pajangan
Nama/mekanisme skill TIDAK BOLEH muncul di UI, copy produk, atau dokumen
user-facing. User hanya merasakan perilaku cerdas. Skill dibahas hanya di
repo internal (skills/, memory/, docs teknis) dan chat builder.
