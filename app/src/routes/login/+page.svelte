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
		<svg class="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
			<path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.39 3.62v3h3.87c2.26-2.09 3.57-5.17 3.57-8.81z" />
			<path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.87-3c-1.07.72-2.44 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.29v3.1A12 12 0 0 0 12 24z" />
			<path fill="#FBBC05" d="M5.27 14.28A7.2 7.2 0 0 1 4.89 12c0-.79.14-1.56.38-2.28v-3.1H1.29a12 12 0 0 0 0 10.76l3.98-3.1z" />
			<path fill="#EA4335" d="M12 4.76c1.76 0 3.34.6 4.58 1.8l3.44-3.44A11.98 11.98 0 0 0 12 0 12 12 0 0 0 1.29 6.62l3.98 3.1C6.22 6.87 8.87 4.76 12 4.76z" />
		</svg>
		Masuk dengan Google
	</button>
	{#if error}<p class="mt-3 text-xs font-semibold text-signal-600">{error}</p>{/if}
	<button onclick={loginMock} class="mt-4 font-mono text-xs uppercase tracking-widest text-ink-500 underline underline-offset-4 transition hover:text-ink-950">
		coba demo tanpa login
	</button>
	<p class="mt-5 border-t border-dashed border-ink-900/15 pt-4 text-[11px] text-ink-500">Masuk aman dengan akun Google — tanpa password.</p>
</div>
