<script lang="ts">
	import { modalStore, type ModalSettings, type ModalComponent } from '@skeletonlabs/skeleton';
	import { IconCrown, IconSparkles, IconMoneybag } from '@tabler/icons-svelte';
	import ModalListSelect from './ModalListSelect.svelte';
	import type { PageData } from '../$types';
	import type { Shard } from '$lib/class/Shard';

	export let data: PageData;
	let selectedHero: Hero;
	let selectedShards: Shard[] = [];

	const modalComponent: ModalComponent = {
		// Pass a reference to your custom component
		ref: ModalListSelect
	};

	const heroModal: ModalSettings = {
		type: 'component',
		component: modalComponent,
		title: 'Custom List Component',
		body: 'Make your selection then press submit.',
		meta: { items: data?.heroes, path: '/characters/portraits/' },
		response: (r: Hero) => (selectedHero = r)
	};

	const shardModal: ModalSettings = {
		type: 'component',
		component: modalComponent,
		title: 'Custom List Component',
		body: 'Make your selection then press submit.',
		meta: { items: data?.shards, path: '/shards/' },
		response: (r: Shard) => addShard(r)
	};

	const consumableModal: ModalSettings = {
		type: 'component',
		component: modalComponent,
		title: 'Custom List Component',
		body: 'Make your selection then press submit.',
		meta: { items: data?.consumables, path: '/consumables/' },
		response: (r: any) => console.log('response:', r)
	};

	function handleHeroClick() {
		modalStore.trigger(heroModal);
	}

	function handleShardClick() {
		modalStore.trigger(shardModal);
	}

	function handleConsumeableClick() {
		modalStore.trigger(consumableModal);
	}

	function addShard(shard: Shard) {
		if(shard) {
			selectedShards = [...selectedShards, shard];
		}
	}
</script>

<div class="flex flex-col gap-3 items-center">
	{#if selectedHero}
	<img
	on:click={handleHeroClick}
	alt="Image for {selectedHero.name}"
	class="w-32 h-32 border-4 rounded-2xl border-surface-300-600-token hover:!border-primary-500 cursor-pointer"
	src="/characters/portraits/{selectedHero.id}.png"
/>
	{:else}
		<div class="border-4 rounded-2xl border-surface-300-600-token hover:!border-primary-500 cursor-pointer" on:click={handleHeroClick}>
			<IconCrown class="w-32 h-32" />
		</div>
	{/if}

	<div class="flex flex-row gap-x-3">
		{#each selectedShards as shard}
			{shard.name}
		{/each}
		<div class="border" on:click={handleShardClick}>
			<IconSparkles size="50" />
		</div>
	</div>
	<div class="border" on:click={handleConsumeableClick}>
		<IconMoneybag size="50" />
	</div>
</div>
