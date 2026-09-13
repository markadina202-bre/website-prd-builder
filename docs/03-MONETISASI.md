# 03 — MONETISASI (Auth, Paket, Pembayaran)

## Login Gmail (Better Auth + Google OAuth)
- Tombol **"Masuk dengan Google"** di landing & dashboard. 1-klik, tanpa password.
- Opsi email+password sebagai cadangan (Better Auth bawaan).
- Session aman (httpOnly cookie), profil: nama, avatar, plan, kredit.
- Nanti: organisasi/team (seat-based) untuk paket Team.

## Paket langganan

| Fitur | 🆓 Gratis | ⭐ Pro | 👥 Team |
|---|---|---|---|
| Harga | Rp0 | **Rp49rb/bln** (atau Rp490rb/thn) | **Rp199rb/bln** (5 seat) |
| Proyek aktif | 1 | ♾️ Unlimited | ♾️ + shared workspace |
| Grill chat | 100 pesan/bln | ♾️ Unlimited | ♾️ + model prioritas |
| Form | ✅ | ✅ + versioning | ✅ + komentar |
| Wayfinder | max 10 tiket | ♾️ + AFK research | ♾️ + assign member |
| Canvas | max 25 node | ♾️ + auto-layout + validasi | ♾️ + realtime collab |
| Export | Markdown (+watermark) | MD/PDF/DOCX/PPTX tanpa watermark | + API export |
| Paket AI-Coding | ✅ dasar | ✅ full (DESIGN.md + tasks) | ✅ + template tim |
| Riwayat versi | Terakhir saja | Semua versi + diff | + audit log |
| Support | Komunitas | Prioritas (WA/Discord) | Dedicated + onboarding |

**Strategi harga:** Pro = harga 2x kopi susu — impulse buy. Team = untuk
software house/agency/freelancer yang butuh PRD klien cepat.

## Pembayaran Indonesia → **Midtrans Snap** (pilihan utama)
Satu integrasi mencakup semua yang diminta user:

| Metode | Status di Midtrans | Biaya (acuan 2026) |
|---|---|---|
| **QRIS** (OVO/DANA/GoPay/ShopeePay/bank) | ✅ Native | **0,7%** (dsyarat BI) |
| **ShopeePay** (deeplink) | ✅ E-wallet langsung | ~2% |
| GoPay (native), OVO, DANA, LinkAja | ✅ | ~1,5–2% |
| Virtual Account (BCA/Mandiri/BNI/BRI) | ✅ | ~Rp4.000 flat |
| Kartu kredit/debit Visa/MC + 3DS | ✅ | 2,9% + Rp2.000 |
| Gerai retail (Indomaret/Alfamart) | ✅ | flat kecil |
| PayLater/cicilan | ✅ | bervariasi |

- **Setup & bulanan: Rp0.** Settlement T+1 ke rekening bank Indonesia.
- Alternatif jika butuh disbursement programatik (bayar seller/driver/refund otomatis):
  **Xendit** (QRIS sama 0,7%, VA lebih mahal, payout ke 450+ bank/e-wallet).
- Implementasi: Midtrans Snap.js (popup UI bawaan, PCI-safe) +
  `POST /api/webhooks/midtrans` dengan **verifikasi signature server-side**.

## Pembayaran luar negeri → **Polar** (utama), Lemon Squeezy (cadangan)
- Keduanya **Merchant-of-Record**: urus kartu global + pajak/VAT tiap negara,
  kita terima bersih. Ideal karena Stripe tidak tersedia untuk badan Indonesia.
- Produk mirror: Pro $5/bln, Team $19/bln (atau price parity).
- Checkout overlay + `POST /api/webhooks/polar` → entitlements sama seperti Midtrans.

## Logic entitlements (agar 2 gateway akur)
```
Checkout sukses (gateway mana pun)
  → webhook terverifikasi → Payment[status=settled]
  → Subscription[status=active, plan, periodEnd]
  → User.plan + kredit di-reset
  → email/WhatsApp invoice (Inngest job)
Expire/cancel/refund → downgrade otomatis ke Gratis di periodEnd
```
- **Idempotent:** dedup berdasarkan gateway ref (webhook bisa datang 2x).
- **Single source of truth:** tabel `Subscription`, bukan session/cookie.
- Paywall frontend (`useEntitlement`) hanya UX; enforcement tetap di backend
  (server guard `requirePlan('pro')` di hooks.server / remote function).

## Hook monetisasi (growth)
1. **Watermark viral:** export gratis ber-watermark → tiap PRD dishare = iklan.
2. **Skor PRD:** "PRD-mu 78. Naikkan ke 90+ dengan deep-grill (Pro)" — paywall alami.
3. **Paywall momen magis:** AFK research & export PDF terkunci tepat saat user kagum.
4. **Template galeri:** template premium (Pro) + template komunitas (UGC loop).
5. **Affiliate:** 20% komisi untuk kreator coding (pasar ngodingpakeai-style).
