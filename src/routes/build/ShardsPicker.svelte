<script lang="ts">
	import { modalStore, type ModalSettings, type ModalComponent } from '@skeletonlabs/skeleton';
	import { IconMathGreater } from '@tabler/icons-svelte';
	import ModalListSelect from './ModalListSelect.svelte';
	import type { Shard } from '$lib/class/Shard';
	import ShardLoadoutIcon from './ShardLoadoutIcon.svelte';

	export let shards: Shard[];

	let selectedShards: (Shard | null)[] = new Array<Shard | null>(5);

	const modalComponent: ModalComponent = {
		// Pass a reference to your custom component
		ref: ModalListSelect
	};

	function shardModal(index: number): ModalSettings {
		return {
			type: 'component',
			component: modalComponent,
			title: 'Select a shard',
			meta: { items: shards, selectedShardId: selectedShards[index]?.id, path: '/shards' },
			response: (shard: Shard) => addShard(shard, index)
		};
	}

	function addShard(shard: Shard, index: number) {
		const previousShardIndex = selectedShards.findIndex((item) => item?.id === shard.id);

		selectedShards[index] = shard;

		if (previousShardIndex >= 0 && index !== previousShardIndex) {
			selectedShards[previousShardIndex] = null;
		}

		shardModal(index).meta.items = shards.filter((item) => !selectedShards.includes(item));
	}

	function handleShardClick(index: number) {
		modalStore.trigger(shardModal(index));
	}
</script>

<div class="flex flex-col">
	<div class="h1 font-evercore mt-12">SHARDS</div>
	<div class="flex flex-row items-center flex-wrap">
		{#each selectedShards as shard, index}
			<div
				on:click={() => handleShardClick(index)}
				on:keyup={(e) => e.key === 'Enter' && handleShardClick(index)}
			>
				<ShardLoadoutIcon {shard} />
			</div>
			{#if index !== 4}
				<IconMathGreater class="w-10 h-10" />
			{/if}
		{/each}
	</div>
	<div class="flex flex-row flex-wrap w-[35vw] gap-4 items-center self-center" />
</div>

<style global lang="postcss">
</style>
