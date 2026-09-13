<script lang="ts">
	import { goto } from '$app/navigation';
	import { mockLogin } from '$lib/session.svelte';

	function login() {
		mockLogin(); // skeleton — nanti: signIn.social({ provider: 'google' })
		goto('/dashboard');
	}
</script>

<div class="mx-auto mt-10 max-w-md rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-sm">
	<div class="text-4xl">🧭</div>
	<h1 class="mt-2 text-2xl font-black">Masuk ke PRD Builder</h1>
	<p class="mt-1 text-sm text-stone-500">1-klik dengan akun Gmail-mu. Tanpa password.</p>
	<button
		onclick={login}
		class="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-3 font-bold shadow-sm hover:bg-stone-50"
	>
		<span class="grid h-5 w-5 place-items-center rounded-full bg-white font-black text-emerald-600 ring-1 ring-stone-200">G</span>
		Masuk dengan Google
	</button>
	<p class="mt-4 text-[11px] text-amber-700">⚠️ Mode skeleton: login mock, belum OAuth asli (butuh Google Client ID — Fase 0).</p>
</div>
