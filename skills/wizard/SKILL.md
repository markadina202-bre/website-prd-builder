# wizard — Script bash pemandu prosedur manual (distilasi)

- repo: mattpocock/skills (`skills/engineering/wizard`)
- url: https://github.com/mattpocock/skills
- install: `npx skills@latest add mattpocock/skills` (isi penuh di repo sumber)
- role: Hasilkan wizard bash yang menuntun manusia lewat langkah yang HANYA bisa dilakukan manusia.

## Trigger
Provisioning infra, setup kredensial/secret CI, dashboard pihak ketiga, migrasi/cutover satu-kali.

## Prinsip inti
- Wizard: buka tiap URL, bilang persis apa diklik/dicopy, tangkap nilai, tulis ke tempatnya (`.env`, GitHub secrets), konfirmasi tiap stage, tampilkan sisa stage.
- Kerja kita HANYA scoping + authoring stages (UX template sudah jadi: progress, gate konfirmasi, buka-URL lintas-OS, input secret tersembunyi, upsert `.env` idempoten, tulis secret/var, ringkasan akhir). Jangan edit library template.
- Alur: (1) scope — baca repo dulu (jangan tanya dingin): tiap `secrets.*`/`vars.*` di CI = nilai yang harus dihasilkan; (2) peta journey tiap stage sampai konkret ("Dashboard → Developers → API keys → Reveal → copy"); jangan karang langkah yang tak pasti; (3) author — 1 stage = 1 tugas fokus; (4) verifikasi — `bash -n`, shellcheck, chmod +x, trace statis (jangan run end-to-end sendiri).
- Ephemeral default (hapus setelah jalan); commit hanya jika path setup repeatable + tautkan dari README.

## Pakai di proyek ini
INTERNAL repo saja: onboarding env/secret kontributor, migrasi satu-kali. Produk user-facing TIDAK pakai bash.

## Batasan
Jangan panggil untuk langkah yang bisa dikerjakan agen sendiri.
