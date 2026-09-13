# domain-modeling — Tajamkan model domain (distilasi)

- repo: mattpocock/skills (`skills/engineering/domain-modeling`)
- url: https://github.com/mattpocock/skills
- install: `npx skills@latest add mattpocock/skills` (isi penuh di repo sumber)
- role: Disiplin AKTIF membangun glossary + keputusan domain saat merancang.

## Trigger
Istilah kabur/bertabrakan, menulis/mengubah CONTEXT.md, mencatat/mengubah ADR.

## Prinsip inti
- **Tantang glossary**: istilah user bertabrakan dengan CONTEXT.md → tegur saat itu juga ("glossary-mu bilang X, tapi maksudmu Y?").
- **Tajamkan bahasa kabur**: "akun" → Customer atau User? Usulkan istilah kanonis yang presisi.
- **Skenario konkret**: uji relasi domain dengan skenario tepi hasil karangan — paksa batas konsep jadi eksplisit.
- **Cross-check kode**: klaim user soal cara kerja vs kode aktual — jika kontradiksi, angkat ("kodemu batalkan seluruh Order, tapi katamu bisa parsial?").
- **CONTEXT.md inline**: istilah resolved → tulis SAAT ITU (jangan batch). Isinya GLOSSARY SAJA — tanpa detail implementasi, bukan spec/scratchpad.
- **ADR hemat**: hanya jika (1) sulit dibalik + (2) membingungkan tanpa konteks + (3) hasil trade-off nyata. Satu syarat hilang = skip.
- File lazy: buat hanya saat ada isi. Multi-konteks → CONTEXT-MAP.md di root.

## Pakai di proyek ini
Grill (tantang istilah user) + Canvas (node = entitas domain) + CONTEXT.md per proyek.

## Batasan
Skill ini untuk MENGUBAH model, bukan sekadar membaca glossary.
