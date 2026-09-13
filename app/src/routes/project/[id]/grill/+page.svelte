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
	<div class="rounded-2xl border border-ink-900/10 bg-white lg:col-span-2">
		<div class="border-b border-ink-900/10 px-5 py-4">
			<div class="flex items-center justify-between">
				<p class="font-bold">Sesi Tanya Jawab</p>
				<p class="font-mono text-xs font-semibold uppercase tracking-wider text-brand-700">Ketajaman {grill.sharpness}%</p>
			</div>
			<div class="mt-2.5 h-2 overflow-hidden rounded-full bg-ink-950/10">
				<div class="h-full rounded-full bg-brand-600 transition-all" style="width: {grill.sharpness}%"></div>
			</div>
		</div>

		<div bind:this={box} class="h-[380px] space-y-3 overflow-y-auto px-5 py-4">
			{#each grill.messages as m}
				<div class="flex {m.role === 'user' ? 'justify-end' : 'justify-start'}">
					<div class="max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed {m.role === 'user' ? 'bg-ink-950 text-paper' : 'bg-paper text-ink-900 ring-1 ring-ink-900/10'}">
						{m.text}
					</div>
				</div>
			{/each}
			{#if grill.thinking}
				<div class="flex justify-start"><div class="animate-pulse rounded-2xl bg-paper px-4 py-2.5 text-sm text-ink-500 ring-1 ring-ink-900/10">menulis…</div></div>
			{/if}
		</div>

		<div class="border-t border-ink-900/10 px-5 py-4">
			{#if !grill.done && grill.step?.options}
				<div class="mb-3 flex flex-wrap gap-2">
					{#each grill.step.options as o}
						<button onclick={() => send(o)} class="rounded-full border border-ink-900/15 px-3.5 py-1.5 text-xs font-bold transition hover:border-ink-950 hover:bg-ink-950 hover:text-paper active:scale-[.97]">{o}</button>
					{/each}
				</div>
			{/if}
			{#if !grill.done}
				<div class="flex gap-2">
					<input
						bind:value={input}
						onkeydown={(e) => e.key === 'Enter' && send()}
						placeholder={grill.step?.hint ?? 'Ketik jawabanmu…'}
						class="flex-1 rounded-xl border border-ink-900/15 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
					/>
					<button onclick={() => send()} class="rounded-xl bg-ink-950 px-4 py-2.5 text-sm font-bold text-paper transition hover:bg-ink-900 active:scale-[.98]">Kirim</button>
					<button onclick={() => grill.wrapUp()} class="rounded-xl px-3 py-2.5 text-sm font-semibold text-ink-500 transition hover:text-ink-950">Wrap up</button>
				</div>
			{:else}
				<div class="flex gap-2">
					<a href="/project/{id}/form" class="flex-1 rounded-xl bg-brand-600 px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-brand-700 active:scale-[.99]">Lanjut ke Form →</a>
					<button onclick={() => grill.reset()} class="rounded-xl px-3 py-2.5 text-sm font-semibold text-ink-500 transition hover:text-ink-950">Ulangi</button>
				</div>
			{/if}
		</div>
	</div>

	<!-- CONTEXT.md live -->
	<div class="rounded-2xl bg-ink-950 p-5 text-paper">
		<p class="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-100">Context.md — live</p>
		{#if grill.contextLines.length === 0}
			<p class="mt-3 text-sm leading-relaxed text-paper/50">Jawab pertanyaan → konteks terbentuk di sini, baris per baris.</p>
		{:else}
			<ul class="mt-3 space-y-2 text-sm">
				{#each grill.contextLines as line}
					<li class="rounded-lg bg-white/10 px-3 py-2 font-mono text-xs leading-relaxed">{line}</li>
				{/each}
			</ul>
		{/if}
		<p class="mt-4 font-mono text-[11px] text-paper/40">Konteks tersimpan otomatis setiap jawaban.</p>
	</div>
</div>
