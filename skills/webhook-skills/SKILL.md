---
name: webhook-skills
description: Terima webhook provider dengan benar: verifikasi signature, idempotency, retry, audit. KRITIS untuk webhook pembayaran Midtrans/Polar.
source: https://hookdeck.com
install: npx skills add hookdeck/webhook-skills
---

# Webhook Skills (cache distilasi)

## Trigger
Membangun/memperbaiki endpoint webhook apa pun, terutama pembayaran.

## Prinsip inti (TIDAK BISA DITAWAR)
1. **Verifikasi signature server-side** (secret per provider). Tanpa
   signature valid → 401. Jangan percaya body mentah.
2. **Idempotent**: dedup pakai gateway ref/event-id (webhook bisa datang 2x+).
   Double-credit langganan = bug fatal.
3. **Fast ACK + async**: respons 200 cepat, kerja berat di job queue (Inngest)
   dengan retry backoff. Provider akan retry jika timeout.
4. **Audit log**: simpan tiap event (ref, tipe, payload ringkas, hasil).
5. Tangani SEMUA status: settlement/capture/expire/cancel/refund/chargeback —
   tiap status punya transisi Subscription yang benar.

## Cara pakai di proyek ini
`POST /api/webhooks/midtrans` + `POST /api/webhooks/polar` → update Payment
+ Subscription + entitlements + invoice. Wajib: test signature palsu (401),
test event ganda (1x efek), test expire (downgrade terjadwal).

## Referensi penuh
Koleksi Hookdeck per-provider + pola di atas.
