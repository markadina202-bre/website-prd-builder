<script lang="ts">
	import { Handle, Position, type NodeProps } from '@xyflow/svelte';

	let { data, selected }: NodeProps = $props();
	const d = $derived(data as { title: string; sub?: string; tone?: string });
	const TONES: Record<string, string> = {
		brand: 'bg-brand-600',
		signal: 'bg-signal-500',
		ink: 'bg-ink-950',
		amber: 'bg-amber-500'
	};
</script>

<div
	class="w-56 rounded-xl border bg-white px-4 py-3 shadow-sm transition {selected
		? 'border-ink-950 ring-2 ring-ink-950/15'
		: 'border-ink-900/15'}"
>
	<div class="flex items-center gap-2">
		<span class="h-2.5 w-2.5 shrink-0 rounded-full {TONES[d.tone ?? 'ink']}"></span>
		<p class="truncate text-sm font-bold text-ink-900" title={d.title}>{d.title}</p>
	</div>
	{#if d.sub}
		<p class="mt-1 truncate font-mono text-[10px] uppercase tracking-wider text-ink-500" title={d.sub}>{d.sub}</p>
	{/if}
	<Handle type="target" position={Position.Left} />
	<Handle type="source" position={Position.Right} />
</div>
