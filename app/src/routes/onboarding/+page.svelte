<script lang="ts">
	import { goto } from '$app/navigation';
	import { session, saveProfile, skipOnboarding } from '$lib/session.svelte';

	let step = $state(1);
	let name = $state(session.profile?.name ?? '');
	let experience = $state(session.profile?.experience ?? '');
	let goals = $state<string[]>(session.profile?.goals ?? []);
	let err = $state('');

	const EXPERIENCES = [
		{ t: 'Pemula', d: 'Belum pernah atau baru mulai ngoding' },
		{ t: 'Menengah', d: 'Udah bisa bikin project sendiri' },
		{ t: 'Ahli', d: 'Pengalaman production & tim' }
	];
	const GOALS = [
		'Bikin app pakai AI',
		'Belajar konsep dasar coding',
		'Paham cara pakai AI tools',
		'Bikin rencana project yang jelas',
		'Dapat mentoring langsung'
	];

	function toggleGoal(g: string) {
		goals = goals.includes(g) ? goals.filter((x) => x !== g) : [...goals, g];
	}

	function next() {
		err = '';
		if (step === 1 && !name.trim()) {
			err = 'Isi namamu dulu ya.';
			return;
		}
		if (step === 2 && !experience) {
			err = 'Pilih salah satu.';
			return;
		}
		if (step < 3) step += 1;
		else finish();
	}

	function finish() {
		if (goals.length === 0) {
			err = 'Pilih minimal satu.';
			return;
		}
		saveProfile({ name: name.trim(), experience, goals });
		goto('/dashboard');
	}

	function skip() {
		skipOnboarding();
		goto('/dashboard');
	}
</script>

<div class="mx-auto mt-6 max-w-lg rounded-2xl border border-ink-900/15 bg-white p-8 shadow-[8px_8px_0_0_#141817]">
	<div class="flex items-center justify-between">
		<p class="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-700">Langkah {step} dari 3</p>
		<button onclick={skip} class="font-mono text-[11px] uppercase tracking-widest text-ink-500 underline underline-offset-4 transition hover:text-ink-950">
			Lewati onboarding
		</button>
	</div>
	<div class="mt-3 h-1.5 overflow-hidden rounded-full bg-ink-950/10">
		<div class="h-full rounded-full bg-brand-600 transition-all" style="width: {(step / 3) * 100}%"></div>
	</div>

	{#if step === 1}
		<h1 class="mt-5 font-display text-3xl font-bold tracking-tight">Selamat Datang!</h1>
		<p class="mt-1.5 text-sm text-ink-500">Kenalan dulu yuk, biar kami bisa bantu lebih baik.</p>
		<label class="mt-5 block">
			<span class="text-sm font-bold">Nama kamu</span>
			<input
				bind:value={name}
				onkeydown={(e) => e.key === 'Enter' && next()}
				placeholder="cth: Budi Santoso"
				autocomplete="name"
				class="mt-2 w-full rounded-xl border border-ink-900/15 px-3.5 py-3 text-sm outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
			/>
		</label>
	{:else if step === 2}
		<h1 class="mt-5 font-display text-3xl font-bold tracking-tight">Pengalaman Ngoding Kamu</h1>
		<p class="mt-1.5 text-sm text-ink-500">Pilih yang paling sesuai sama kondisi kamu sekarang.</p>
		<div class="mt-5 space-y-2">
			{#each EXPERIENCES as e}
				{@const on = experience === e.t}
				<button
					onclick={() => (experience = e.t)}
					class="w-full rounded-xl border px-4 py-3.5 text-left transition active:scale-[.99] {on
						? 'border-ink-950 bg-ink-950 text-paper'
						: 'border-ink-900/15 hover:border-ink-950'}"
				>
					<p class="text-sm font-bold">{e.t}</p>
					<p class="mt-0.5 text-xs {on ? 'text-paper/70' : 'text-ink-500'}">{e.d}</p>
				</button>
			{/each}
		</div>
	{:else}
		<h1 class="mt-5 font-display text-3xl font-bold tracking-tight">Apa yang Kamu Harapkan?</h1>
		<p class="mt-1.5 text-sm text-ink-500">Pilih satu atau lebih yang sesuai sama tujuanmu.</p>
		<div class="mt-5 flex flex-wrap gap-2">
			{#each GOALS as g}
				{@const on = goals.includes(g)}
				<button
					onclick={() => toggleGoal(g)}
					class="rounded-full border px-4 py-2.5 text-sm font-bold transition active:scale-[.97] {on
						? 'border-ink-950 bg-ink-950 text-paper'
						: 'border-ink-900/15 hover:border-ink-950'}"
				>
					{on ? '✓ ' : ''}{g}
				</button>
			{/each}
		</div>
	{/if}

	{#if err}<p class="mt-3 text-sm font-semibold text-signal-600">{err}</p>{/if}

	<div class="mt-6 flex gap-2">
		{#if step > 1}
			<button onclick={() => { step -= 1; err = ''; }} class="rounded-xl px-4 py-3 text-sm font-bold text-ink-500 transition hover:text-ink-950">← Kembali</button>
		{/if}
		<button onclick={next} class="flex-1 rounded-xl bg-ink-950 px-4 py-3 text-sm font-bold text-paper transition hover:bg-ink-900 active:scale-[.99]">
			{step === 3 ? 'Mulai Sekarang' : 'Lanjut'}
		</button>
	</div>
</div>
