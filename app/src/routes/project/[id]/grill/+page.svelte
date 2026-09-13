<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { grill } from '$lib/grill.svelte';

	let input = '';
	let box: HTMLDivElement;
	$: id = $page.params.id;

	onMount(() => grill.start());
	$: if (grill.messages.length && box) box.scrollTop = box.scrollHeight;

	function send(text: string = input) {
		grill.answer(text);
		input = '';
	}
</script>

<div class="grid gap-4 lg:grid-cols-3">
	<!-- Chat -->
	<div class="rounded-2xl border border-stone-200 bg-white lg:col-span-2">
		<div class="border-b border-stone-100 px-4 py-3">
			<div class="flex items-center justify-between text-sm">
				<p class="font-bold">🎤 Grill Session <span class="font-normal text-stone-400">(mock engine — 8 pertanyaan)</span></p>
				<p class="font-bold text-emerald-700">Ketajaman: {grill.sharpness}%</p>
			</div>
			<div class="mt-2 h-2 overflow-hidden rounded-full bg-stone-100">
				<div class="h-full rounded-full bg-emerald-500 transition-all" style="width: {grill.sharpness}%"></div>
			</div>
		</div>

		<div bind:this={box} class="h-[380px] space-y-3 overflow-y-auto px-4 py-4">
			{#each grill.messages as m}
				<div class="flex {m.role === 'user' ? 'justify-end' : 'justify-start'}">
					<div class="max-w-[80%] rounded-2xl px-4 py-2 text-sm {m.role === 'user' ? 'bg-emerald-600 text-white' : 'bg-stone-100 text-stone-800'}">
						{m.text}
					</div>
				</div>
			{/each}
			{#if grill.thinking}
				<div class="flex justify-start"><div class="animate-pulse rounded-2xl bg-stone-100 px-4 py-2 text-sm text-stone-400">menulis…</div></div>
			{/if}
		</div>

		<div class="border-t border-stone-100 px-4 py-3">
			{#if !grill.done && grill.step?.options}
				<div class="mb-2 flex flex-wrap gap-2">
					{#each grill.step.options as o}
						<button onclick={() => send(o)} class="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200 hover:bg-emerald-100">{o}</button>
					{/each}
				</div>
			{/if}
			{#if !grill.done}
				<div class="flex gap-2">
					<input
						bind:value={input}
						onkeydown={(e) => e.key === 'Enter' && send()}
						placeholder={grill.step?.hint ?? 'Ketik jawabanmu…'}
						class="flex-1 rounded-xl border border-stone-200 px-3 py-2 text-sm outline-none focus:border-emerald-500"
					/>
					<button onclick={() => send()} class="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white">Kirim</button>
					<button onclick={() => grill.wrapUp()} class="rounded-xl bg-stone-100 px-3 py-2 text-sm text-stone-500">Wrap up</button>
				</div>
			{:else}
				<div class="flex gap-2">
					<a href="/project/{id}/abcd" class="flex-1 rounded-xl bg-emerald-600 px-4 py-2 text-center text-sm font-bold text-white">Lanjut ke Form ABCD →</a>
					<button onclick={() => grill.reset()} class="rounded-xl bg-stone-100 px-3 py-2 text-sm text-stone-500">Ulangi</button>
				</div>
			{/if}
		</div>
	</div>

	<!-- CONTEXT.md live -->
	<div class="rounded-2xl border border-stone-200 bg-stone-900 p-4 text-stone-100">
		<p class="text-xs font-bold tracking-widest text-emerald-400">CONTEXT.MD — LIVE</p>
		{#if grill.contextLines.length === 0}
			<p class="mt-3 text-sm text-stone-500">Jawab pertanyaan → konteks terbentuk di sini, baris per baris.</p>
		{:else}
			<ul class="mt-3 space-y-2 text-sm">
				{#each grill.contextLines as line}
					<li class="rounded-lg bg-stone-800 px-3 py-2 font-mono text-xs">{line}</li>
				{/each}
			</ul>
		{/if}
		<p class="mt-4 text-[11px] text-stone-500">Skill: grill-me · grilling · grill-with-docs (mock)</p>
	</div>
</div>
