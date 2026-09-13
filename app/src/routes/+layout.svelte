<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { session, mockLogout, restoreSession, hasMockSession } from '$lib/session.svelte';
	import { useSession, signOut } from '$lib/auth-client';

	const realSession = useSession();
	onMount(restoreSession);

	$: email = $realSession?.data?.user?.email ?? session.user?.email ?? null;

	const PUBLIC = ['/', '/login'];
	// Skeleton guard — nanti: hooks.server.ts + requireSession (server-side)
	$: if (
		browser &&
		!PUBLIC.includes($page.url.pathname) &&
		!$realSession?.isPending &&
		!email &&
		!hasMockSession()
	) {
		goto('/login');
	}

	// Onboarding: sudah login tapi belum kenalan → /onboarding (kecuali di sana / di login)
	$: if (
		browser &&
		email &&
		!$realSession?.isPending &&
		!session.onboarded &&
		$page.url.pathname !== '/onboarding' &&
		$page.url.pathname !== '/login'
	) {
		goto('/onboarding');
	}

	function logout() {
		signOut();
		mockLogout();
		goto('/');
	}
</script>

<nav class="border-b border-ink-900/10 bg-paper/85 backdrop-blur">
	<div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
		<a href={email ? '/dashboard' : '/'} class="flex items-center gap-2.5">
			<span class="grid h-7 w-7 place-items-center rounded-md bg-ink-950 font-mono text-sm font-semibold text-paper">P</span>
			<span class="text-lg font-extrabold tracking-tight">PRD Builder</span>
			<span class="rounded border border-ink-900/15 px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-ink-500">Beta</span>
		</a>
		<div class="flex items-center gap-3 text-sm">
			{#if email}
				<a href="/admin" class="font-mono text-xs uppercase tracking-widest text-ink-500 transition hover:text-ink-950">Admin</a>
				<span class="hidden font-mono text-xs text-ink-500 sm:inline">{email}</span>
				<button onclick={logout} class="rounded-lg border border-ink-900/15 bg-white px-3 py-1.5 font-semibold transition hover:bg-ink-950 hover:text-paper active:scale-[.98]">Keluar</button>
			{:else}
				<a href="/login" class="rounded-lg bg-ink-950 px-4 py-1.5 font-semibold text-paper transition hover:bg-ink-900 active:scale-[.98]">Masuk</a>
			{/if}
		</div>
	</div>
</nav>

<main class="mx-auto max-w-6xl px-4 py-8">
	<slot />
</main>

<footer class="mx-auto max-w-6xl px-4 pb-10 pt-6">
	<p class="border-t border-ink-900/10 pt-4 text-center font-mono text-[11px] uppercase tracking-widest text-ink-500">
		PRD Builder · Tanya jawab → Form → Wayfinder → Canvas → Dokumen siap coding
	</p>
</footer>
