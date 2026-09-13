<script lang="ts">
	import { page } from '$app/stores';
	import { ABCD_DEFAULT } from '$lib/mock';
	import { grill } from '$lib/grill.svelte';

	$: id = $page.params.id;
	// Prefill mock dari hasil grill (nanti: to-questionnaire via server)
	const prefill: Record<string, string> = {};
	for (const line of grill.contextLines) {
		const [k, ...rest] = line.split(':');
		if (k && rest.length) prefill[k.trim()] = rest.join(':').trim();
	}

	function val(block: string, field: string): string {
		if (field === 'Persona utama') return prefill['Pengguna utama'] ?? '';
		if (field === 'Masalah') return prefill['Solusi hari ini & pain'] ?? '';
		if (field === 'KPI sukses') return prefill['Definisi sukses'] ?? '';
		if (field === 'Out-of-scope') return prefill['Out-of-scope'] ?? '';
		if (field === 'Fitur Must-have') return prefill['Fitur hari-pertama'] ?? '';
		if (field === 'Platform') return prefill['Platform'] ?? '';
		if (block === 'B' && field === 'Tujuan bisnis') return prefill['Ide'] ?? '';
		return '';
	}

	let locked = false;
	const entries = Object.entries(ABCD_DEFAULT);
</script>

<div class="mb-4 flex items-center justify-between">
	<div>
		<h1 class="text-xl font-black">📝 Form ABCD</h1>
		<p class="text-sm text-stone-500">
			{#if grill.contextLines.length > 0}
				Auto-terisi dari {grill.contextLines.length} jawaban grill-mu. Review & edit sesukamu.
			{:else}
				<span class="text-amber-700">⚠️ Grill dulu <a class="underline" href="/project/{id}/grill">di sini</a> agar form terisi otomatis.</span>
			{/if}
		</p>
	</div>
	<button
		onclick={() => (locked = !locked)}
		class="rounded-xl px-4 py-2 text-sm font-bold {locked ? 'bg-stone-200 text-stone-600' : 'bg-emerald-600 text-white'}"
	>
		{locked ? '🔒 Terkunci v1' : 'Kunci ABCD'}
	</button>
</div>

<div class="grid gap-4 md:grid-cols-2">
	{#each entries as [key, block]}
		<div class="rounded-2xl border border-stone-200 bg-white p-4">
			<div class="flex items-center justify-between">
				<p class="font-bold">{block.title}</p>
				<span class="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700">confidence 85%</span>
			</div>
			<div class="mt-3 space-y-3">
				{#each Object.keys(block.fields) as field}
					<label class="block">
						<span class="text-xs font-semibold text-stone-500">{field}</span>
						<textarea
							rows="2"
							disabled={locked}
							placeholder="—"
							class="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm outline-none focus:border-emerald-500 disabled:bg-stone-50"
						>{val(key, field)}</textarea>
					</label>
				{/each}
			</div>
			<button class="mt-2 text-xs font-bold text-emerald-700 hover:underline">🎤 grill lagi blok ini</button>
		</div>
	{/each}
</div>

<div class="mt-4 flex gap-2">
	<a href="/project/{id}/grill" class="rounded-xl bg-white px-4 py-2 text-sm font-bold ring-1 ring-stone-200">← Grill</a>
	<a href="/project/{id}/wayfinder" class="flex-1 rounded-xl bg-emerald-600 px-4 py-2 text-center text-sm font-bold text-white">Lanjut ke Wayfinder →</a>
</div>
