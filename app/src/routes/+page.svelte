<script lang="ts">
	interface Plan {
		name: string;
		price: string;
		per: string;
		feats: string[];
		hot: boolean;
	}
	const PLANS: Plan[] = [
		{ name: 'Gratis', price: 'Rp0', per: 'selamanya', feats: ['1 proyek', '100 pesan tanya jawab/bln', 'Export Markdown'], hot: false },
		{ name: 'Pro', price: 'Rp49rb', per: '/bln', feats: ['Proyek & tanya jawab tanpa batas', 'Export PDF/DOCX/PPTX', 'Canvas unlimited + skor PRD'], hot: true },
		{ name: 'Team', price: 'Rp199rb', per: '/bln', feats: ['5 seat workspace', 'Kolaborasi realtime', 'Audit log + API'], hot: false }
	];
	const STEPS: [string, string, string][] = [
		['01', 'Tanya Jawab', 'AI tanya 1-per-1 sampai ide tajam'],
		['02', 'Form', 'Kuesioner a/b/c + tulis, auto-terisi'],
		['03', 'Wayfinder', 'Kabut jadi tiket berurutan'],
		['04', 'Canvas', 'Arsitektur visual drag-drop'],
		['05', 'PRD Final', 'Export + skor ketajaman']
	];
</script>

<!-- Landing editorial: hero asimetris + kartu spesimen PRD, tanpa pola hero generik. -->
<section class="grid items-center gap-10 py-10 lg:grid-cols-[1.05fr_.95fr] lg:py-14">
	<div>
		<p class="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
			Untuk founder non-teknis · Indonesia
		</p>
		<h1 class="mt-4 font-display text-5xl font-black leading-[1.04] tracking-tight md:text-6xl">
			Dari ide kabur ke <em class="text-brand-700">dokumen siap coding.</em>
		</h1>
		<p class="mt-5 max-w-xl text-lg leading-relaxed text-ink-500">
			Cerita ngalor-ngidul. AI kami menginterogasi sampai tajam, lalu PRD + peta
			arsitektur jadi sendiri. Tempel ke Cursor atau Claude Code — langsung jalan.
		</p>
		<div class="mt-7 flex flex-wrap gap-3">
			<a
				href="/login"
				class="rounded-xl bg-ink-950 px-6 py-3 font-bold text-paper transition hover:bg-ink-900 active:scale-[.98]"
			>
				Mulai gratis
			</a>
			<a
				href="#cara-kerja"
				class="rounded-xl border border-ink-900/15 bg-white px-6 py-3 font-semibold transition hover:border-ink-950 active:scale-[.98]"
			>
				Lihat cara kerja
			</a>
		</div>
		<p class="mt-7 font-mono text-xs uppercase tracking-widest text-ink-500">
			5 tahap · ±30 menit · QRIS · Bahasa Indonesia
		</p>
	</div>

	<!-- Spesimen: seperti apa output yang kamu bawa pulang -->
	<div class="relative">
		<div class="rounded-2xl border border-ink-900/15 bg-white p-6 shadow-[8px_8px_0_0_#141817]">
			<div class="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-ink-500">
				<span>PRD-2026-001 · Draf</span>
				<span>v1 terkunci</span>
			</div>
			<p class="mt-3 font-display text-2xl font-bold">Kasir Toko Kelontong</p>
			<ul class="mt-4 space-y-2.5 text-sm">
				<li class="flex gap-2.5"><span class="font-bold text-brand-600">—</span> Persona: pemilik toko, gaptek, butuh super sederhana</li>
				<li class="flex gap-2.5"><span class="font-bold text-brand-600">—</span> Fitur hari-pertama: catat transaksi &lt; 1 menit</li>
				<li class="flex gap-2.5"><span class="font-bold text-brand-600">—</span> Anti-fitur: tanpa multi-cabang, tanpa stok opname</li>
				<li class="flex gap-2.5"><span class="font-bold text-brand-600">—</span> 14 acceptance criteria terukur, 0 kata “cepat & mudah”</li>
			</ul>
			<div class="mt-5 flex items-center justify-between border-t border-dashed border-ink-900/15 pt-4">
				<span class="font-mono text-xs text-ink-500">MD · PDF · DOCX</span>
				<span class="-rotate-3 rounded-md border-2 border-signal-600 px-2.5 py-1 font-mono text-sm font-semibold text-signal-600">SKOR 86</span>
			</div>
		</div>
	</div>
</section>

<section id="cara-kerja" class="mt-6 scroll-mt-24">
	<p class="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-ink-500">Cara kerja</p>
	<h2 class="mt-2 font-display text-3xl font-bold tracking-tight">Lima tahap, satu alur maju.</h2>
	<div class="mt-6 grid gap-4 md:grid-cols-5">
		{#each STEPS as [no, title, desc]}
			<div class="rounded-2xl border border-ink-900/10 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md">
				<p class="font-mono text-sm font-semibold text-signal-600">{no}</p>
				<p class="mt-2 font-bold">{title}</p>
				<p class="mt-1 text-sm leading-relaxed text-ink-500">{desc}</p>
			</div>
		{/each}
	</div>
</section>

<section class="mt-14">
	<p class="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-ink-500">Harga</p>
	<h2 class="mt-2 font-display text-3xl font-bold tracking-tight">Mulai gratis. Naik kelas kalau serius.</h2>
	<div class="mt-6 grid gap-4 md:grid-cols-3">
		{#each PLANS as plan}
			<div class="rounded-2xl border p-6 {plan.hot ? 'border-ink-950 bg-ink-950 text-paper shadow-[8px_8px_0_0_#0b6b4f]' : 'border-ink-900/10 bg-white'}">
				<div class="flex items-center justify-between">
					<p class="font-bold">{plan.name}</p>
					{#if plan.hot}<span class="rounded-full bg-signal-500 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-white">Paling laris</span>{/if}
				</div>
				<p class="mt-2"><span class="font-display text-4xl font-black">{plan.price}</span> <span class="text-sm {plan.hot ? 'text-paper/60' : 'text-ink-500'}">{plan.per}</span></p>
				<ul class="mt-4 space-y-2 text-sm {plan.hot ? 'text-paper/85' : 'text-ink-700'}">
					{#each plan.feats as f}<li class="flex gap-2.5"><span class="{plan.hot ? 'text-brand-100' : 'text-brand-600'} font-bold">✓</span> {f}</li>{/each}
				</ul>
				<a href="/login" class="mt-5 block rounded-xl px-4 py-2.5 text-center font-bold transition active:scale-[.98] {plan.hot ? 'bg-paper text-ink-950 hover:bg-white' : 'bg-ink-950 text-paper hover:bg-ink-900'}">Pilih {plan.name}</a>
			</div>
		{/each}
	</div>
	<p class="mt-4 text-center font-mono text-[11px] uppercase tracking-widest text-ink-500">
		QRIS · ShopeePay · GoPay · OVO · VA · Kartu (Midtrans) · Kartu global (Polar)
	</p>
</section>
