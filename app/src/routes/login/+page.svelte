<script lang="ts">
	import { goto } from '$app/navigation';
	import { signIn } from '$lib/auth-client';
	import { mockLogin } from '$lib/session.svelte';

	let error = '';

	async function loginGoogle() {
		error = '';
		try {
			await signIn.social({ provider: 'google', callbackURL: '/dashboard' });
		} catch {
			error = 'Login Google gagal — pastikan GOOGLE_CLIENT_ID/SECRET & DATABASE_URL terisi di server.';
		}
	}

	function loginMock() {
		mockLogin();
		goto('/dashboard');
	}
</script>

<div class="mx-auto mt-10 max-w-md rounded-2xl border border-ink-900/15 bg-white p-8 text-center shadow-[8px_8px_0_0_#141817]">
	<p class="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-700">Masuk</p>
	<h1 class="mt-2 font-display text-3xl font-bold tracking-tight">Lanjut garap idemu.</h1>
	<p class="mt-1.5 text-sm text-ink-500">1-klik dengan akun Gmail-mu. Tanpa password.</p>
	<button
		onclick={loginGoogle}
		class="mt-6 flex w-full items-center justify-center gap-2.5 rounded-xl border border-ink-900/15 bg-white px-4 py-3 font-bold transition hover:border-ink-950 active:scale-[.99]"
	>
		<span class="grid h-6 w-6 place-items-center rounded-md bg-ink-950 font-mono text-sm font-semibold text-paper">G</span>
		Masuk dengan Google
	</button>
	{#if error}<p class="mt-3 text-xs font-semibold text-signal-600">{error}</p>{/if}
	<button onclick={loginMock} class="mt-4 font-mono text-xs uppercase tracking-widest text-ink-500 underline underline-offset-4 transition hover:text-ink-950">
		coba demo tanpa login
	</button>
	<p class="mt-5 border-t border-dashed border-ink-900/15 pt-4 text-[11px] text-ink-500">Masuk aman dengan akun Google — tanpa password.</p>
</div>
