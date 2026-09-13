<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { session, mockLogout, restoreSession } from '$lib/session.svelte';

	onMount(restoreSession);

	const PUBLIC = ['/', '/login'];
	$: if (typeof window !== 'undefined' && !PUBLIC.includes($page.url.pathname) && !session.user) {
		// skeleton guard — nanti: hooks.server.ts + Better Auth
		if (!localStorage.getItem('pb_mock_session')) goto('/login');
	}

	function logout() {
		mockLogout();
		goto('/');
	}
</script>

<nav class="border-b border-stone-200 bg-white/80 backdrop-blur">
	<div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
		<a href={session.user ? '/dashboard' : '/'} class="text-lg font-extrabold tracking-tight">
			🧭 PRD Builder <span class="ml-1 rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-700">SKELETON</span>
		</a>
		<div class="flex items-center gap-3 text-sm">
			{#if session.user}
				<span class="text-stone-500">{session.user.email}</span>
				<button onclick={logout} class="rounded-lg border border-stone-200 px-3 py-1.5 hover:bg-stone-50">Keluar</button>
			{:else}
				<a href="/login" class="rounded-lg bg-emerald-600 px-4 py-1.5 font-semibold text-white hover:bg-emerald-700">Masuk</a>
			{/if}
		</div>
	</div>
</nav>

<main class="mx-auto max-w-6xl px-4 py-8">
	<slot />
</main>

<footer class="mx-auto max-w-6xl px-4 pb-10 pt-6 text-center text-xs text-stone-400">
	Skeleton Fase 0 — SvelteKit murni · Grill → ABCD → Wayfinder → Canvas → PRD
</footer>
