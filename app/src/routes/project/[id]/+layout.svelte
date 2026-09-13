<script lang="ts">
	import { page } from '$app/stores';
	$: id = $page.params.id;
	const TABS = [
		['grill', '01', 'Tanya Jawab'],
		['form', '02', 'Form'],
		['wayfinder', '03', 'Wayfinder'],
		['canvas', '04', 'Canvas']
	];
</script>

<div class="mb-6 flex flex-wrap gap-2">
	{#each TABS as [slug, no, label]}
		<a
			href="/project/{id}/{slug}"
			class="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition active:scale-[.98] {$page.url.pathname.endsWith(slug) ? 'bg-ink-950 text-paper' : 'bg-white text-ink-700 ring-1 ring-ink-900/15 hover:ring-ink-950'}"
		><span class="font-mono text-[11px] font-semibold {$page.url.pathname.endsWith(slug) ? 'text-brand-100' : 'text-signal-600'}">{no}</span>{label}</a>
	{/each}
</div>

<slot />
