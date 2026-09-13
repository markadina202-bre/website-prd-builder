<section class="py-10 text-center">
	<p class="mb-3 inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
		🇮🇩 Indonesia-first · QRIS · Bahasa Indonesia
	</p>
	<h1 class="mx-auto max-w-3xl text-4xl font-black leading-tight tracking-tight md:text-5xl">
		Dari ide kabur ke <span class="text-emerald-600">PRD siap coding</span> dalam 30 menit.
	</h1>
	<p class="mx-auto mt-4 max-w-2xl text-stone-500">
		Cerita ngalor-ngidul, AI kami yang menginterogasi (grill), lalu PRD + peta canvas
		jadi sendiri. Tempel ke Cursor / Claude Code — langsung jalan.
	</p>
	<div class="mt-6 flex items-center justify-center gap-3">
		<a href="/login" class="rounded-xl bg-emerald-600 px-6 py-3 font-bold text-white hover:bg-emerald-700">
			Mulai gratis →
		</a>
		<a href="/login" class="rounded-xl border border-stone-200 bg-white px-6 py-3 font-semibold hover:bg-stone-50">
			Lihat demo grill
		</a>
	</div>
</section>

<section class="mt-6 grid gap-4 md:grid-cols-5">
	{#each [['🎤', 'Grill Chatbot', 'AI tanya 1-per-1 sampai ide tajam'], ['📝', 'Form ABCD', 'Auto-terisi 90%, tinggal review'], ['🗺️', 'Wayfinder', 'Fog-of-war jadi tiket jelas'], ['🕸️', 'Canvas n8n', 'Arsitektur visual drag-drop'], ['📄', 'PRD Final', 'Export MD/PDF/DOCX + skor']] as [emoji, title, desc], i}
		<div class="rounded-2xl border border-stone-200 bg-white p-4">
			<div class="text-2xl">{emoji}</div>
			<p class="mt-1 text-xs font-bold text-emerald-700">TAHAP {i + 1}</p>
			<p class="font-bold">{title}</p>
			<p class="mt-1 text-sm text-stone-500">{desc}</p>
		</div>
	{/each}
</section>

<section class="mt-10 grid gap-4 md:grid-cols-3">
	{#each [['Gratis', 'Rp0', ['1 proyek', '100 pesan grill/bln', 'Export Markdown']], ['Pro', 'Rp49rb/bln', ['♾️ Proyek & grill', 'Export PDF/DOCX/PPTX', 'Canvas unlimited + skor PRD']], ['Team', 'Rp199rb/bln', ['5 seat workspace', 'Realtime collab', 'Audit log + API']]] as [name, price, feats]}
		<div class="rounded-2xl border p-5 {name === 'Pro' ? 'border-emerald-500 bg-emerald-50/50 ring-1 ring-emerald-500' : 'border-stone-200 bg-white'}">
			<p class="font-bold">{name}</p>
			<p class="text-2xl font-black">{price}</p>
			<ul class="mt-3 space-y-1 text-sm text-stone-600">
				{#each feats as f}<li>✓ {f}</li>{/each}
			</ul>
			<a href="/login" class="mt-4 block rounded-xl px-4 py-2 text-center font-bold {name === 'Pro' ? 'bg-emerald-600 text-white' : 'bg-stone-100'}">Pilih {name}</a>
		</div>
	{/each}
</section>
<p class="mt-4 text-center text-xs text-stone-400">Bayar via QRIS · ShopeePay · GoPay · OVO · VA · Kartu (Midtrans) · Kartu global (Polar)</p>
