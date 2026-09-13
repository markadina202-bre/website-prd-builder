<script lang="ts">
	import { page } from '$app/stores';
	import { WAYFINDER_MOCK } from '$lib/mock';
	$: id = $page.params.id;

	const COLS = [
		['fog', 'Fog'],
		['frontier', 'Frontier'],
		['doing', 'Doing'],
		['done', 'Done']
	];
	const TYPE_DOT: Record<string, string> = {
		Research: 'bg-brand-600',
		Prototype: 'bg-signal-500',
		Grilling: 'bg-amber-500',
		Task: 'bg-ink-300'
	};
</script>

<div class="rounded-2xl border border-ink-900/10 bg-white p-5">
	<p class="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-700">Wayfinder · Destinasi</p>
	<p class="mt-1.5 font-display text-xl font-bold">{WAYFINDER_MOCK.destination}</p>
	<p class="mt-1 font-mono text-[11px] uppercase tracking-wider text-ink-500">Beta: contoh board — board hidup mengikuti proyekmu segera hadir.</p>
</div>

<div class="mt-4 grid gap-3 md:grid-cols-4">
	{#each COLS as [status, label]}
		{@const items = WAYFINDER_MOCK.tickets.filter((t) => t.status === status)}
		<div class="rounded-2xl bg-ink-950/[0.045] p-3">
			<p class="mb-2.5 flex items-center justify-between px-1 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-500">
				{label} <span class="rounded-full bg-white px-2 py-0.5 ring-1 ring-ink-900/10">{items.length}</span>
			</p>
			<div class="space-y-2">
				{#each items as t}
					<div class="rounded-xl border border-ink-900/10 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow">
						<p class="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-500">
							<span class="h-2 w-2 rounded-full {TYPE_DOT[t.type]}"></span>{t.type} · {t.id}
						</p>
						<p class="mt-1.5 text-sm font-semibold leading-snug">{t.title}</p>
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>

<div class="mt-4 flex gap-2">
	<a href="/project/{id}/form" class="rounded-xl bg-white px-4 py-2.5 text-sm font-bold ring-1 ring-ink-900/15 transition hover:ring-ink-950">← Form</a>
	<a href="/project/{id}/canvas" class="flex-1 rounded-xl bg-brand-600 px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-brand-700 active:scale-[.99]">Lanjut ke Canvas →</a>
</div>
