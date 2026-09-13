<script lang="ts">
	import { onMount } from 'svelte';

	interface Summary {
		mode: string;
		email: string;
		now: string;
		counts: { users: number; projects: number; verifications: number; sessions: number };
		users: { name: string; email: string; created_at: string }[];
		prices: { pro: number; team: number; updatedAt: string | null };
	}

	let data = $state<Summary | null>(null);
	let err = $state('');
	let pro = $state('');
	let team = $state('');
	let saved = $state('');
	let saving = $state(false);

	onMount(async () => {
		const r = await fetch('/api/admin/summary');
		if (r.status === 401) {
			err = 'Login dulu untuk membuka halaman admin.';
			return;
		}
		if (r.status === 403) {
			err = 'Akunmu bukan admin.';
			return;
		}
		if (!r.ok) {
			err = 'Gagal memuat ringkasan.';
			return;
		}
		data = await r.json();
		const j: Summary = data as Summary;
		pro = String(j.prices.pro);
		team = String(j.prices.team);
	});

	function fmtDate(s: string | null): string {
		if (!s) return '—';
		try {
			return new Date(s).toLocaleString('id-ID');
		} catch {
			return s;
		}
	}

	function rp(v: string): string {
		const n = parseInt(v, 10);
		if (!Number.isFinite(n)) return '—';
		return n % 1000 === 0 ? `Rp${n / 1000}rb` : `Rp${n.toLocaleString('id-ID')}`;
	}

	async function save() {
		saving = true;
		saved = '';
		err = '';
		const r = await fetch('/api/admin/prices', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ pro: parseInt(pro, 10), team: parseInt(team, 10) })
		});
		saving = false;
		if (!r.ok) {
			err = 'Gagal menyimpan — angka harus bulat positif.';
			return;
		}
		const j = await r.json();
		if (data) data.prices = j;
		saved = `Tersimpan ${fmtDate(j.updatedAt)} — harga di landing ikut berubah.`;
	}
</script>

<div class="mb-5 flex flex-wrap items-end justify-between gap-3">
	<div>
		<p class="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">Admin</p>
		<h1 class="mt-1 font-display text-3xl font-bold tracking-tight">Ruang mesin.</h1>
		<p class="mt-1 text-sm text-ink-500">Pantau & atur — perubahan harga langsung tampil di landing.</p>
	</div>
	<a href="/dashboard" class="rounded-xl bg-white px-4 py-2.5 text-sm font-bold ring-1 ring-ink-900/15 transition hover:ring-ink-950">← Dashboard</a>
</div>

{#if err && !data}
	<div class="rounded-2xl border border-signal-600/30 bg-signal-50 p-6 text-center">
		<p class="font-bold text-signal-600">{err}</p>
		<a href="/login" class="mt-2 inline-block text-sm font-bold text-ink-950 underline">Ke halaman masuk</a>
	</div>
{:else if !data}
	<p class="text-sm text-ink-500">Memuat…</p>
{:else}
	{#if data.mode === 'open'}
		<div class="mb-4 rounded-2xl border border-amber-500/40 bg-amber-50 p-4 text-sm">
			<p class="font-bold text-amber-700">MODE SEMENTARA: semua user yang login bisa membuka halaman ini.</p>
			<p class="mt-0.5 text-amber-700">Kunci dengan mengisi ADMIN_EMAILS di server (boleh beberapa, pisahkan koma).</p>
		</div>
	{/if}

	<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
		{#each [['Pengguna', data.counts.users], ['Proyek', data.counts.projects], ['Sesi aktif', data.counts.sessions], ['Verifikasi', data.counts.verifications]] as [label, n]}
			<div class="rounded-2xl border border-ink-900/10 bg-white p-5">
				<p class="font-mono text-[11px] font-semibold uppercase tracking-widest text-ink-500">{label}</p>
				<p class="mt-1 font-display text-4xl font-black">{n}</p>
			</div>
		{/each}
	</div>

	<div class="mt-4 grid gap-4 lg:grid-cols-2">
		<div class="rounded-2xl border border-ink-900/10 bg-white p-5">
			<p class="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-700">Harga paket</p>
			<div class="mt-3 grid gap-3 sm:grid-cols-2">
				<label class="block">
					<span class="text-sm font-bold">Pro (Rp/bln)</span>
					<input bind:value={pro} inputmode="numeric" class="mt-1.5 w-full rounded-xl border border-ink-900/15 px-3.5 py-2.5 font-mono text-sm outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20" />
					<span class="mt-1 block text-xs text-ink-500">Tampil: <b>{rp(pro)}/bln</b></span>
				</label>
				<label class="block">
					<span class="text-sm font-bold">Team (Rp/bln)</span>
					<input bind:value={team} inputmode="numeric" class="mt-1.5 w-full rounded-xl border border-ink-900/15 px-3.5 py-2.5 font-mono text-sm outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20" />
					<span class="mt-1 block text-xs text-ink-500">Tampil: <b>{rp(team)}/bln</b></span>
				</label>
			</div>
			<div class="mt-4 flex items-center gap-3">
				<button onclick={save} disabled={saving} class="rounded-xl bg-ink-950 px-5 py-2.5 text-sm font-bold text-paper transition hover:bg-ink-900 active:scale-[.98] disabled:opacity-50">
					{saving ? 'Menyimpan…' : 'Simpan harga'}
				</button>
				<span class="text-xs text-ink-500">Terakhir diubah: {fmtDate(data.prices.updatedAt)}</span>
			</div>
			{#if saved}<p class="mt-2 text-sm font-semibold text-brand-700">{saved}</p>{/if}
			{#if err}<p class="mt-2 text-sm font-semibold text-signal-600">{err}</p>{/if}
		</div>

		<div class="rounded-2xl border border-ink-900/10 bg-white p-5">
			<p class="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-700">Pengguna terbaru</p>
			{#if data.users.length === 0}
				<p class="mt-3 text-sm text-ink-500">Belum ada pengguna Google — jadilah yang pertama. 🎉</p>
			{:else}
				<ul class="mt-3 space-y-2">
					{#each data.users as u}
						<li class="flex items-center justify-between gap-2 rounded-xl bg-paper px-3.5 py-2.5 ring-1 ring-ink-900/10">
							<div class="min-w-0">
								<p class="truncate text-sm font-bold">{u.name || '(tanpa nama)'}</p>
								<p class="truncate font-mono text-[11px] text-ink-500">{u.email}</p>
							</div>
							<span class="shrink-0 font-mono text-[11px] text-ink-500">{fmtDate(u.created_at)}</span>
						</li>
					{/each}
				</ul>
			{/if}
			<p class="mt-3 font-mono text-[11px] text-ink-500">Waktu server: {fmtDate(data.now)} · Masuk sebagai {data.email}</p>
		</div>
	</div>
{/if}
