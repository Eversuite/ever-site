<script lang="ts">
	import type { PageData } from './$types';
	import type { Shard } from '$lib/class/Shard';
	import ShardIcon from './ShardIcon.svelte';

	export let data: PageData;
	const RANDOM_SHARD_SOURCE = 'Random Drop';

	let searchTerm = '';
	$: shards = shardFilter(data?.shardData, searchTerm);

	function shardFilter(shards: Shard[] | undefined, term: string): Shard[] {
		return (shards || []).filter(
			(shard) => nameContains(shard.name, term) || sourceContains(shard, term)
		);
	}

	function nameContains(source: string, term: string): boolean {
		return source.toLowerCase().indexOf(term.toLowerCase()) !== -1;
	}

	function sourceContains(item: Shard, searchTerm: string): boolean {
		return item.source.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
	}

	function isRandomDrop(item: Shard) {
		return item.source == RANDOM_SHARD_SOURCE;
	}
</script>

<input bind:value={searchTerm} type="text" placeholder="Filter through shards" class="mb-8 input" />

<div class="flex flex-wrap justify-center gap-x-10 gap-y-8">
	{#each shards as shard (shard.id)}
		<ShardIcon {shard} />
	{/each}
</div>
