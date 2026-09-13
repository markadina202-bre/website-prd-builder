<script lang="ts">
	import { goto } from '$app/navigation';
	import { MOCK_PROJECTS } from '$lib/mock';

	function createProject() {
		goto('/project/baru/grill'); // skeleton — nanti: remote function project.create
	}
</script>

<div class="flex items-center justify-between">
	<div>
		<h1 class="text-2xl font-black">Proyekku</h1>
		<p class="text-sm text-stone-500">Lanjutkan grill atau mulai ide baru.</p>
	</div>
	<button onclick={createProject} class="rounded-xl bg-emerald-600 px-4 py-2 font-bold text-white hover:bg-emerald-700">
		+ Proyek Baru
	</button>
</div>

<div class="mt-6 grid gap-4 md:grid-cols-2">
	{#each MOCK_PROJECTS as p}
		<a href="/project/{p.id}/grill" class="rounded-2xl border border-stone-200 bg-white p-5 hover:border-emerald-400 hover:shadow-sm">
			<div class="flex items-center justify-between">
				<p class="font-bold">{p.title}</p>
				<span class="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">{p.stage}</span>
			</div>
			<div class="mt-3 h-2 overflow-hidden rounded-full bg-stone-100">
				<div class="h-full rounded-full bg-emerald-500" style="width: {p.sharpness}%"></div>
			</div>
			<p class="mt-1 text-xs text-stone-400">Ketajaman {p.sharpness}% · {p.updatedAt}</p>
		</a>
	{/each}
</div>
