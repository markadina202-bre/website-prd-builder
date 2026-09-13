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

<div class="mx-auto mt-10 max-w-md rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-sm">
	<div class="text-4xl">🧭</div>
	<h1 class="mt-2 text-2xl font-black">Masuk ke PRD Builder</h1>
	<p class="mt-1 text-sm text-stone-500">1-klik dengan akun Gmail-mu. Tanpa password.</p>
	<button
		onclick={loginGoogle}
		class="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-3 font-bold shadow-sm hover:bg-stone-50"
	>
		<span class="grid h-5 w-5 place-items-center rounded-full bg-white font-black text-emerald-600 ring-1 ring-stone-200">G</span>
		Masuk dengan Google
	</button>
	{#if error}<p class="mt-3 text-xs text-red-600">{error}</p>{/if}
	<button onclick={loginMock} class="mt-3 text-xs text-stone-400 underline hover:text-stone-600">
		coba demo tanpa login
	</button>
	<p class="mt-4 text-[11px] text-stone-400">Masuk aman dengan akun Google — tanpa password.</p>
</div>
