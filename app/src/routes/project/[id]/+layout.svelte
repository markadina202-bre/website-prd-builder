<script lang="ts">
	import { page } from '$app/stores';
	$: id = $page.params.id;
	const TABS = [
		['grill', '🎤 Grill'],
		['abcd', '📝 ABCD'],
		['wayfinder', '🗺️ Wayfinder'],
		['canvas', '🕸️ Canvas']
	];
</script>

<div class="mb-6 flex flex-wrap gap-2">
	{#each TABS as [slug, label]}
		<a
			href="/project/{id}/{slug}"
			class="rounded-xl px-4 py-2 text-sm font-bold {$page.url.pathname.endsWith(slug) ? 'bg-emerald-600 text-white' : 'bg-white text-stone-600 ring-1 ring-stone-200 hover:bg-stone-50'}"
		>{label}</a>
	{/each}
</div>

<slot />
