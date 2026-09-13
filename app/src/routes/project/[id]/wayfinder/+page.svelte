<script lang="ts">
	import { page } from '$app/stores';
	import { WAYFINDER_MOCK } from '$lib/mock';
	$: id = $page.params.id;

	const COLS = [
		['fog', '🌫️ Fog of War'],
		['frontier', '⚔️ Frontier'],
		['doing', '🔨 Doing'],
		['done', '✅ Done']
	];
	const TYPE_COLOR: Record<string, string> = {
		Research: 'bg-sky-100 text-sky-700',
		Prototype: 'bg-violet-100 text-violet-700',
		Grilling: 'bg-amber-100 text-amber-700',
		Task: 'bg-stone-200 text-stone-600'
	};
</script>

<h1 class="text-xl font-black">🗺️ Wayfinder</h1>
<p class="mt-1 text-sm text-stone-500">
	🎯 <b>Destination:</b> {WAYFINDER_MOCK.destination}
</p>
<p class="mt-1 text-xs text-stone-400">Versi beta: contoh board — board hidup mengikuti proyekmu segera hadir.</p>

<div class="mt-4 grid gap-3 md:grid-cols-4">
	{#each COLS as [status, label]}
		<div class="rounded-2xl bg-stone-100 p-3">
			<p class="mb-2 text-xs font-bold text-stone-500">{label}</p>
			<div class="space-y-2">
				{#each WAYFINDER_MOCK.tickets.filter((t) => t.status === status) as t}
					<div class="rounded-xl bg-white p-3 shadow-sm">
						<span class="rounded px-1.5 py-0.5 text-[10px] font-bold {TYPE_COLOR[t.type]}">{t.type} · {t.id}</span>
						<p class="mt-1 text-sm font-semibold">{t.title}</p>
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>

<div class="mt-4 flex gap-2">
	<a href="/project/{id}/abcd" class="rounded-xl bg-white px-4 py-2 text-sm font-bold ring-1 ring-stone-200">← ABCD</a>
	<a href="/project/{id}/canvas" class="flex-1 rounded-xl bg-emerald-600 px-4 py-2 text-center text-sm font-bold text-white">Lanjut ke Canvas →</a>
</div>
