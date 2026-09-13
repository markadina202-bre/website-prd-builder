---
name: mcp-builder
description: Panduan membangun MCP server berkualitas untuk mengintegrasikan API/layanan eksternal ke agen AI. Pakai saat expose kapabilitas sebagai MCP tools.
source: https://github.com/anthropics/skills
install: npx skills add https://github.com/anthropics/skills --skill mcp-builder
---

# MCP Builder (cache distilasi)

## Trigger
User/agent butuh kapabilitas baru via Model Context Protocol: bungkus API
atau data lokal jadi tools standar MCP (resources, tools, prompts).

## Prinsip inti
- Desain tool kecil & eksplisit: 1 tool = 1 aksi, nama jelas, schema input
  ketat (JSON schema), error message yang bisa ditindaklanjuti agen.
- Pisahkan: transport (stdio/SSE) vs logika vs kredensial (env, jangan hardcode).
- Dokumentasikan tiap tool: kapan dipakai, contoh call, contoh output.
- Uji dengan client MCP sungguhan sebelum rilis; versioning saat schema berubah.

## Cara pakai di proyek ini
Fase lanjut: expose PRD Builder sebagai MCP publik — tools mis.
`get_prd`, `list_tickets`, `grill_status` — agar user bisa lanjutkan PRD
dari Claude Code/Cursor tanpa buka web.

## Referensi penuh
Install dari sumber untuk template server + best practices.
