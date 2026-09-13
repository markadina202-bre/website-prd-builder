<script lang="ts">
	import { get } from 'svelte/store';
	import { page } from '$app/stores';
	import { FORM_SECTIONS, type FormQuestion } from '$lib/mock';
	import { grill } from '$lib/grill.svelte';

	const id = get(page).params.id;

	// Prefill dari hasil tanya jawab (kunci = label baris CONTEXT.md).
	const prefill: Record<string, string> = {};
	for (const line of grill.contextLines) {
		const [k, ...rest] = line.split(':');
		if (k && rest.length) prefill[k.trim()] = rest.join(':').trim();
	}

	type Pick = 'a' | 'b' | 'c' | 'd' | '';
	interface Ans {
		pick: Pick;
		text: string;
	}
	const LETTERS = ['a', 'b', 'c'];

	function matchOption(opt: string, v: string): boolean {
		const words = opt.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 3);
		const low = v.toLowerCase();
		return words.some((w) => low.includes(w));
	}

	function initial(q: FormQuestion): Ans {
		const v = q.prefillKey ? (prefill[q.prefillKey] ?? '') : '';
		if (!v) return { pick: '', text: '' };
		const i = q.options.findIndex((o) => matchOption(o, v));
		if (i >= 0) return { pick: LETTERS[i] as Pick, text: '' };
		return { pick: 'd', text: v };
	}

	const ALL = FORM_SECTIONS.flatMap((s) => s.questions);
	let answers = $state<Record<string, Ans>>(Object.fromEntries(ALL.map((q) => [q.id, initial(q)])));
	let locked = $state(false);

	function valueOf(q: FormQuestion): string {
		const a = answers[q.id];
		if (a.pick === 'd') return a.text.trim();
		if (a.pick) return q.options[LETTERS.indexOf(a.pick)];
		return '';
	}

	let answered = $derived(ALL.filter((q) => valueOf(q) !== '').length);
	let pct = $derived(Math.round((answered / ALL.length) * 100));
</script>

<div class="mb-6 rounded-2xl border border-ink-900/10 bg-white p-5">
	<div class="flex flex-wrap items-start justify-between gap-3">
		<div>
			<p class="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-700">Tahap 02 · Form</p>
			<h1 class="mt-1 font-display text-3xl font-bold tracking-tight">Pertegas idemu, soal per soal.</h1>
			<p class="mt-1.5 max-w-2xl text-sm text-ink-500">
				{#if grill.contextLines.length > 0}
					{answered} dari {ALL.length} soal sudah terisi dari jawaban tanya jawabmu. Pilih a/b/c, atau tulis sendiri di d.
				{:else}
					Pilih a/b/c, atau tulis sendiri di d. <a class="font-bold text-brand-700 underline" href="/project/{id}/grill">Tanya jawab dulu</a> agar form terisi otomatis.
				{/if}
			</p>
		</div>
		<button
			onclick={() => (locked = !locked)}
			class="rounded-xl px-4 py-2.5 text-sm font-bold transition active:scale-[.98] {locked
				? 'bg-ink-950/[0.06] text-ink-700'
				: 'bg-ink-950 text-paper hover:bg-ink-900'}"
		>
			{locked ? 'Buka kunci & edit' : 'Kunci Form v1'}
		</button>
	</div>
	<div class="mt-4 flex items-center gap-3">
		<div class="h-2 flex-1 overflow-hidden rounded-full bg-ink-950/10">
			<div class="h-full rounded-full bg-brand-600 transition-all" style="width: {pct}%"></div>
		</div>
		<span class="font-mono text-xs font-semibold text-ink-500">{answered}/{ALL.length} · {pct}%</span>
	</div>
</div>

{#if locked}
	<!-- Ringkasan terkunci -->
	<div class="grid gap-4 md:grid-cols-2">
		{#each FORM_SECTIONS as s}
			<div class="rounded-2xl border border-ink-900/10 bg-white p-5">
				<div class="flex items-center gap-3">
					<span class="grid h-10 w-10 place-items-center rounded-xl bg-ink-950 font-display text-xl font-black text-paper">{s.code}</span>
					<div>
						<p class="font-bold">{s.title}</p>
						<p class="text-xs text-ink-500">{s.desc}</p>
					</div>
				</div>
				<dl class="mt-4 space-y-3">
					{#each s.questions as q}
						<div class="rounded-xl bg-paper px-3.5 py-2.5 ring-1 ring-ink-900/10">
							<dt class="font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-500">{q.answerKey}</dt>
							<dd class="mt-0.5 text-sm font-semibold">{valueOf(q) || '— belum diisi —'}</dd>
						</div>
					{/each}
				</dl>
			</div>
		{/each}
	</div>
{:else}
	<!-- Kuesioner -->
	<div class="space-y-8">
		{#each FORM_SECTIONS as s}
			<section>
				<div class="flex items-center gap-3">
					<span class="grid h-10 w-10 place-items-center rounded-xl bg-ink-950 font-display text-xl font-black text-paper">{s.code}</span>
					<div>
						<h2 class="font-display text-xl font-bold">{s.title}</h2>
						<p class="text-xs text-ink-500">{s.desc}</p>
					</div>
				</div>
				<div class="mt-3 space-y-3">
					{#each s.questions as q, qi}
						<div class="rounded-2xl border border-ink-900/10 bg-white p-5">
							<p class="text-sm font-bold leading-relaxed"><span class="mr-2 font-mono text-xs font-semibold text-signal-600">{q.id}</span>{q.text}</p>
							<p class="mt-1 font-mono text-[11px] text-ink-500">Kenapa ditanya: {q.why}</p>
							<div class="mt-3 space-y-2">
								{#each q.options as opt, oi}
									{@const letter = LETTERS[oi] as Pick}
									{@const on = answers[q.id].pick === letter}
									<button
										onclick={() => (answers[q.id].pick = letter)}
										class="flex w-full items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left text-sm transition active:scale-[.99] {on
											? 'border-ink-950 bg-ink-950 font-bold text-paper'
											: 'border-ink-900/15 bg-white font-medium hover:border-ink-950'}"
									>
										<span class="grid h-6 w-6 shrink-0 place-items-center rounded-md border font-mono text-xs font-semibold {on ? 'border-paper/40' : 'border-ink-900/20 text-ink-500'}">{letter}</span>
										{opt}
									</button>
								{/each}
								<button
									onclick={() => (answers[q.id].pick = 'd')}
									class="flex w-full items-center gap-3 rounded-xl border border-dashed px-3.5 py-2.5 text-left text-sm transition active:scale-[.99] {answers[q.id].pick === 'd'
										? 'border-brand-600 bg-brand-50 font-bold text-brand-700'
										: 'border-ink-900/20 font-medium text-ink-500 hover:border-brand-600 hover:text-brand-700'}"
								>
									<span class="grid h-6 w-6 shrink-0 place-items-center rounded-md border font-mono text-xs font-semibold {answers[q.id].pick === 'd' ? 'border-brand-600' : 'border-ink-900/20'}">d</span>
									Tulis sendiri…
								</button>
								{#if answers[q.id].pick === 'd'}
									<textarea
										bind:value={answers[q.id].text}
										rows="3"
										placeholder="Tulis jawabanmu dengan kata-katamu sendiri…"
										class="w-full rounded-xl border border-brand-600 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-brand-600/25"
									></textarea>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			</section>
		{/each}
	</div>
{/if}

<div class="mt-6 flex gap-2">
	<a href="/project/{id}/grill" class="rounded-xl bg-white px-4 py-2.5 text-sm font-bold ring-1 ring-ink-900/15 transition hover:ring-ink-950">← Tanya Jawab</a>
	<a href="/project/{id}/wayfinder" class="flex-1 rounded-xl bg-brand-600 px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-brand-700 active:scale-[.99]">Lanjut ke Wayfinder →</a>
</div>
