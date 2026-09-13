<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
	import { onMount } from 'svelte';
	import {
		SvelteFlow,
		Background,
		BackgroundVariant,
		Controls,
		MiniMap,
		addEdge,
		MarkerType,
		type Node,
		type Edge,
		type Connection
	} from '@xyflow/svelte';
	import '@xyflow/svelte/dist/style.css';
	import NodeCard from './NodeCard.svelte';
	import { grill } from '$lib/grill.svelte';

	const id = get(page).params.id;
	const nodeTypes = { card: NodeCard };

	function ctx(key: string): string {
		for (const line of grill.contextLines) {
			const [k, ...rest] = line.split(':');
			if (k.trim() === key) return rest.join(':').trim();
		}
		return '';
	}

	const persona = ctx('Pengguna utama') || 'Persona utama';
	const fitur = ctx('Fitur hari-pertama') || 'Fitur inti';
	const platform = ctx('Platform') || 'Platform';

	const DEFAULT_NODES: Node[] = [
		{ id: 'persona', type: 'card', position: { x: 0, y: 130 }, data: { title: persona, sub: 'persona', tone: 'ink' } },
		{ id: 'fitur', type: 'card', position: { x: 320, y: 40 }, data: { title: fitur, sub: 'fitur hari-pertama', tone: 'brand' } },
		{ id: 'bayar', type: 'card', position: { x: 320, y: 240 }, data: { title: 'API Pembayaran', sub: 'integrasi · midtrans', tone: 'signal' } },
		{ id: 'platform', type: 'card', position: { x: 640, y: 130 }, data: { title: platform, sub: 'target rilis', tone: 'amber' } }
	];
	const DEFAULT_EDGES: Edge[] = [
		{ id: 'e1', source: 'persona', target: 'fitur', label: 'membutuhkan' },
		{ id: 'e2', source: 'persona', target: 'bayar', label: 'membayar via' },
		{ id: 'e3', source: 'fitur', target: 'platform', label: 'berjalan di' },
		{ id: 'e4', source: 'bayar', target: 'platform', label: 'terpasang di' }
	];

	let nodes = $state<Node[]>(DEFAULT_NODES);
	let edges = $state<Edge[]>(DEFAULT_EDGES);
	let newLabel = $state('');
	let newTone = $state('brand');

	const KEY = `pb_canvas_${id}`;
	onMount(() => {
		try {
			const raw = localStorage.getItem(KEY);
			if (raw) {
				const s = JSON.parse(raw);
				if (s.nodes?.length) {
					nodes = s.nodes;
					edges = s.edges ?? [];
				}
			}
		} catch {
			// storage blocked — memory only
		}
	});
	$effect(() => {
		try {
			localStorage.setItem(KEY, JSON.stringify({ nodes, edges }));
		} catch {
			// storage blocked — memory only
		}
	});

	const defaultEdgeOptions = {
		style: 'stroke: #0b6b4f; stroke-width: 2',
		markerEnd: { type: MarkerType.ArrowClosed, color: '#0b6b4f' }
	};

	function onConnect(c: Connection) {
		edges = addEdge({ ...c, label: 'terhubung' }, edges);
	}

	function addNode() {
		const title = newLabel.trim() || 'Node baru';
		nodes = [
			...nodes,
			{
				id: `n${Date.now()}`,
				type: 'card',
				position: { x: 100 + nodes.length * 48, y: 60 + nodes.length * 36 },
				data: { title, sub: 'catatan', tone: newTone }
			}
		];
		newLabel = '';
	}

	function resetCanvas() {
		nodes = DEFAULT_NODES;
		edges = DEFAULT_EDGES;
	}
</script>

<div class="mb-4 flex flex-wrap items-end justify-between gap-3">
	<div>
		<p class="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">Canvas arsitektur</p>
		<h1 class="mt-1 font-display text-3xl font-bold tracking-tight">Peta idemu.</h1>
		<p class="mt-1 font-mono text-[11px] uppercase tracking-wider text-ink-500">Seret node · tarik garis antar titik · klik + backspace hapus</p>
	</div>
	<div class="flex flex-wrap items-center gap-2">
		<input
			bind:value={newLabel}
			onkeydown={(e) => e.key === 'Enter' && addNode()}
			placeholder="Nama node baru…"
			class="w-44 rounded-xl border border-ink-900/15 bg-white px-3 py-2 text-sm outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
		/>
		<select bind:value={newTone} class="rounded-xl border border-ink-900/15 bg-white px-2 py-2 text-sm font-semibold outline-none">
			<option value="brand">Hijau</option>
			<option value="signal">Oranye</option>
			<option value="ink">Hitam</option>
			<option value="amber">Kuning</option>
		</select>
		<button onclick={addNode} class="rounded-xl bg-ink-950 px-4 py-2 text-sm font-bold text-paper transition hover:bg-ink-900 active:scale-[.98]">+ Node</button>
		<button onclick={resetCanvas} class="rounded-xl px-3 py-2 text-sm font-semibold text-ink-500 transition hover:text-ink-950">Reset</button>
	</div>
</div>

<div class="h-[560px] overflow-hidden rounded-2xl border border-ink-900/15 bg-white">
	{#if browser}
		<SvelteFlow bind:nodes bind:edges {nodeTypes} {defaultEdgeOptions} onconnect={onConnect} fitView>
			<Controls />
			<Background variant={BackgroundVariant.Dots} />
			<MiniMap />
		</SvelteFlow>
	{:else}
		<div class="grid h-full place-items-center text-sm text-ink-500">Memuat canvas…</div>
	{/if}
</div>

<div class="mt-4 flex gap-2">
	<a href="/project/{id}/wayfinder" class="rounded-xl bg-white px-4 py-2.5 text-sm font-bold ring-1 ring-ink-900/15 transition hover:ring-ink-950">← Wayfinder</a>
	<a href="/dashboard" class="flex-1 rounded-xl bg-brand-600 px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-brand-700 active:scale-[.99]">Kembali ke Dashboard</a>
</div>
