<script lang="ts">
	import { page } from '$app/stores';
	$: id = $page.params.id;
</script>

<h1 class="text-xl font-black">🕸️ Canvas</h1>
<p class="mt-1 text-sm text-stone-500">Pratinjau arsitektur — editor visual drag-and-drop segera hadir.</p>

<div class="mt-4 overflow-x-auto rounded-2xl border border-stone-200 bg-white p-4">
	<svg viewBox="0 0 720 300" class="mx-auto w-full max-w-3xl">
		<defs>
			<marker id="arr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
				<path d="M0,0 L8,4 L0,8" fill="none" stroke="#7d948a" stroke-width="1.5" />
			</marker>
		</defs>
		<line x1="150" y1="150" x2="300" y2="80" stroke="#7d948a" stroke-width="2" marker-end="url(#arr)" />
		<line x1="150" y1="150" x2="300" y2="220" stroke="#7d948a" stroke-width="2" marker-end="url(#arr)" />
		<line x1="460" y1="80" x2="580" y2="150" stroke="#7d948a" stroke-width="2" marker-end="url(#arr)" />
		<line x1="460" y1="220" x2="580" y2="150" stroke="#7d948a" stroke-width="2" stroke-dasharray="5 4" marker-end="url(#arr)" />
		<g font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle">
			<rect x="30" y="120" width="120" height="60" rx="12" fill="#ede9fe" stroke="#8b5cf6" stroke-width="2" />
			<text x="90" y="155" fill="#5b21b6">🟣 Persona</text>
			<rect x="300" y="50" width="160" height="60" rx="12" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" />
			<text x="380" y="85" fill="#1d4ed8">🔵 Fitur: Kasir</text>
			<rect x="300" y="190" width="160" height="60" rx="12" fill="#dbeafe" stroke="#3b82f6" stroke-width="2" />
			<text x="380" y="225" fill="#1d4ed8">🔵 Fitur: Stok</text>
			<rect x="560" y="120" width="130" height="60" rx="12" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" />
			<text x="625" y="155" fill="#92400e">🟡 API Bayar</text>
		</g>
		<text x="225" y="110" font-size="11" fill="#7d948a" font-family="sans-serif">flows-to</text>
		<text x="510" y="200" font-size="11" fill="#7d948a" font-family="sans-serif">depends-on</text>
	</svg>
</div>

<div class="mt-4 flex gap-2">
	<a href="/project/{id}/wayfinder" class="rounded-xl bg-white px-4 py-2 text-sm font-bold ring-1 ring-stone-200">← Wayfinder</a>
	<a href="/dashboard" class="flex-1 rounded-xl bg-emerald-600 px-4 py-2 text-center text-sm font-bold text-white">Kembali ke Dashboard</a>
</div>
