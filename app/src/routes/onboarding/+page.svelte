<script lang="ts">
	import { goto } from '$app/navigation';
	import { session, saveProfile, skipOnboarding } from '$lib/session.svelte';

	let step = $state(1);
	let name = $state(session.profile?.name ?? '');
	let role = $state(session.profile?.role ?? '');
	let idea = $state('');
	let err = $state('');

	const ROLES = ['Pemilik usaha', 'Karyawan / profesional', 'Pelajar / mahasiswa', 'Developer / maker'];
	const LETTERS = ['a', 'b', 'c', 'd'];

	function next() {
		err = '';
		if (step === 1 && !name.trim()) {
			err = 'Isi namamu dulu ya.';
			return;
		}
		if (step === 2 && !role) {
			err = 'Pilih salah satu.';
			return;
		}
		if (step < 3) step += 1;
		else finish();
	}

	function finish() {
		saveProfile({ name: name.trim(), role, idea: idea.trim() });
		if (idea.trim()) {
			session.pendingIdea = idea.trim();
			goto('/project/baru/grill');
		} else {
			goto('/dashboard');
		}
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
		<h1 class="mt-5 font-display text-3xl font-bold tracking-tight">Kamu sehari-hari sebagai apa?</h1>
		<p class="mt-1.5 text-sm text-ink-500">Biar nada tanya jawab pas dengan duniamu.</p>
		<div class="mt-5 space-y-2">
			{#each ROLES as r, i}
				{@const on = role === r}
				<button
					onclick={() => (role = r)}
					class="flex w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-left text-sm transition active:scale-[.99] {on
						? 'border-ink-950 bg-ink-950 font-bold text-paper'
						: 'border-ink-900/15 font-medium hover:border-ink-950'}"
				>
					<span class="grid h-6 w-6 shrink-0 place-items-center rounded-md border font-mono text-xs font-semibold {on ? 'border-paper/40' : 'border-ink-900/20 text-ink-500'}">{LETTERS[i]}</span>
					{r}
				</button>
			{/each}
		</div>
	{:else}
		<h1 class="mt-5 font-display text-3xl font-bold tracking-tight">Ada ide yang mau digarap?</h1>
		<p class="mt-1.5 text-sm text-ink-500">Tulis 1–2 kalimat — langsung masuk ke ruang tanya jawab. Boleh dikosongkan.</p>
		<textarea
			bind:value={idea}
			rows="4"
			placeholder="cth: aplikasi kasir untuk toko kelontong saya biar rekap otomatis"
			class="mt-5 w-full rounded-xl border border-ink-900/15 px-3.5 py-3 text-sm outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
		></textarea>
	{/if}

	{#if err}<p class="mt-3 text-sm font-semibold text-signal-600">{err}</p>{/if}

	<div class="mt-6 flex gap-2">
		{#if step > 1}
			<button onclick={() => { step -= 1; err = ''; }} class="rounded-xl px-4 py-3 text-sm font-bold text-ink-500 transition hover:text-ink-950">← Kembali</button>
		{/if}
		<button onclick={next} class="flex-1 rounded-xl bg-ink-950 px-4 py-3 text-sm font-bold text-paper transition hover:bg-ink-900 active:scale-[.99]">
			{step === 3 ? 'Mulai tanya jawab →' : 'Lanjut'}
		</button>
	</div>
</div>
