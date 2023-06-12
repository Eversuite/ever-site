<script lang="ts">
	import type { PageData } from './$types';
	import type { Shard } from '$lib/class/Shard';
	import ShardIcon from './ShardIcon.svelte';

	export let data: PageData;

	let searchTerm = '';
	$: shards = shardFilter(data?.shardData, searchTerm);

	function shardFilter(shards: Shard[] | undefined, term: string): Shard[] {
		return (shards || []).filter((shard) => contains(shard.name, term));
	}

	function contains(source: string, term: string): boolean {
		return source.toLowerCase().indexOf(term.toLowerCase()) !== -1;
	}
</script>

<input bind:value={searchTerm} type="text" placeholder="Filter through shards" class="mb-8 input" />

<div class="flex flex-wrap justify-center gap-x-10 gap-y-8">
	{#each shards as shard (shard.id)}
		<ShardIcon {shard} />
	{/each}
</div>
