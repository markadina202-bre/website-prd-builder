<script lang="ts">
	import { goto } from '$app/navigation';
	import { MOCK_PROJECTS } from '$lib/mock';

	function createProject() {
		goto('/project/baru/grill'); // skeleton — nanti: remote function project.create
	}
</script>

<div class="flex items-end justify-between">
	<div>
		<p class="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">Dashboard</p>
		<h1 class="mt-1 font-display text-3xl font-bold tracking-tight">Proyekku</h1>
		<p class="mt-1 text-sm text-ink-500">Lanjutkan garapan atau mulai ide baru.</p>
	</div>
	<button onclick={createProject} class="rounded-xl bg-ink-950 px-4 py-2.5 font-bold text-paper transition hover:bg-ink-900 active:scale-[.98]">
		+ Proyek baru
	</button>
</div>

<div class="mt-6 grid gap-4 md:grid-cols-2">
	{#each MOCK_PROJECTS as p}
		<a href="/project/{p.id}/grill" class="group rounded-2xl border border-ink-900/10 bg-white p-5 transition hover:-translate-y-0.5 hover:border-ink-950 hover:shadow-md">
			<div class="flex items-center justify-between gap-3">
				<p class="font-display text-xl font-bold">{p.title}</p>
				<span class="shrink-0 rounded-full bg-brand-50 px-2.5 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-brand-700">{p.stage}</span>
			</div>
			<div class="mt-4 h-2 overflow-hidden rounded-full bg-ink-950/10">
				<div class="h-full rounded-full bg-brand-600 transition-all" style="width: {p.sharpness}%"></div>
			</div>
			<p class="mt-2 font-mono text-[11px] uppercase tracking-wider text-ink-500">Ketajaman {p.sharpness}% · {p.updatedAt}</p>
		</a>
	{/each}
</div>
