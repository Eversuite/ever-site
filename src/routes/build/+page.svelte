<script lang="ts">
	import { modalStore, type ModalSettings, type ModalComponent } from '@skeletonlabs/skeleton';
	import { IconCrown, IconPlus, IconMoneybag, IconMathGreater } from '@tabler/icons-svelte';
	import ModalListSelect from './ModalListSelect.svelte';
	import type { PageData } from '../$types';
	import type { Shard } from '$lib/class/Shard';
	import type { Consumable } from '$lib/class/Consumable';
	import type { Hero } from '$lib/class/Hero';
	import type { Ability } from '$lib/class/Ability';
	import { abilitySlot } from '$lib/Utility';
	import AbilityLoadoutIcon from './AbilityLoadoutIcon.svelte';
	import ShardLoadoutIcon from './ShardLoadoutIcon.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { copyText } from 'svelte-copy';

	export let data: PageData;
	let selectedHero: Hero = data?.selectedHero ?? undefined;
	let selectedHeroAbilities: Ability[] = data?.selectedHeroAbilities ?? [];
	let abilityLadder = data?.abilityLadder ?? new Array(15).fill(null);
	let selectedConsumable: Consumable = data?.selectedConsumable ?? undefined;
	let selectedShards: Shard[] = data?.selectedShards ?? [];

	const borderCss =
		'border-4 rounded-2xl border-surface-300-600-token hover:!border-primary-500 cursor-pointer';

	const modalComponent: ModalComponent = {
		// Pass a reference to your custom component
		ref: ModalListSelect
	};

	const heroModal: ModalSettings = {
		type: 'component',
		component: modalComponent,
		title: 'Select a hero',
		meta: { items: data?.heroes, path: '/characters/portraits' },
		response: (hero: Hero) => heroSelected(hero)
	};

	let shardModal: ModalSettings = {
		type: 'component',
		component: modalComponent,
		title: 'Select a shard',
		meta: { items: data?.shards, path: '/shards' },
		response: (shard: Shard) => addShard(shard)
	};

	const consumableModal: ModalSettings = {
		type: 'component',
		component: modalComponent,
		title: 'Select a consumable',
		meta: { items: data?.consumables, path: '/consumables' },
		response: (r: Consumable) => (selectedConsumable = r)
	};

	function handleHeroClick() {
		modalStore.trigger(heroModal);
	}

	async function heroSelected(hero: Hero) {
		const [abilitiesResult] = await Promise.all([
			data.supabase.from('abilities').select().eq('source', hero.id)
		]);

		console.log(abilitiesResult);
		selectedHero = hero;
		selectedHeroAbilities = abilitiesResult.data as Ability[];
	}

	function setAbility(index: number, slot: string) {
		abilityLadder[index] = abilitySlot(selectedHeroAbilities, slot);
	}

	function handleShardClick() {
		modalStore.trigger(shardModal);
	}

	function handleConsumeableClick() {
		modalStore.trigger(consumableModal);
	}

	function addShard(shard: Shard) {
		if (shard) {
			selectedShards = [...selectedShards, shard];
		}
		shardModal.meta.items = data?.shards.filter((item) => !selectedShards.includes(item));
	}

	function removeShard(removedShard: Shard) {
		selectedShards = selectedShards.filter((shard) => shard !== removedShard);
		shardModal.meta.items = data?.shards.filter((item) => !selectedShards.includes(item));
	}

	function shareBuild() {
		let abilityLadderIds = abilityLadder.map((ability) => {
			if (ability) {
				return ability.id;
			} else {
				return null;
			}
		});
		let selectedShardsIds = selectedShards.map((shard) => shard.id);
		let build = {
			heroId: selectedHero.id,
			abilityIds: abilityLadderIds,
			consumableId: selectedConsumable.id,
			shardIds: selectedShardsIds
		};
		let jsonBuild = JSON.stringify(build);
		let encodedBuild = window.btoa(jsonBuild);

		$page.url.searchParams.set('code', encodedBuild);
		goto(`?${$page.url.searchParams.toString()}`);
		copyText($page.url.toString());
	}
</script>

<div class="flex flex-col flex-wrap justify-center p-8">
	<div>
		<div class="h3 font-evercore mb-3">HERO*</div>
		{#if selectedHero}
			<img
				on:click={handleHeroClick}
				alt="Image for {selectedHero.name}"
				class="w-48 h-48 {borderCss} self-center"
				src="/characters/portraits/{selectedHero.id}.png"
				on:keyup={(e) => e.key === 'Enter' && handleHeroClick()}
			/>
		{:else}
			<div
				class="{borderCss} self-center w-48 h-48 flex flex-col items-center justify-center h3 font-evercore text-center"
				on:click={handleHeroClick}
				on:keyup={(e) => e.key === 'Enter' && handleHeroClick()}
			>
				CLICK TO CHOOSE HERO
			</div>
		{/if}
	</div>
	<div class="flex flex-row justify-evenly content-center gap-x-12">
		<div class="flex flex-col">
			<div class="h1 font-evercore mt-12">SHARDS</div>
			<div class="flex flex-row items-center">
				{#each selectedShards as shard, index}
					<div
						on:click={() => removeShard(shard)}
						on:keyup={(e) => e.key === 'Enter' && removeShard(shard)}
					>
						<ShardLoadoutIcon {shard} />
					</div>
					{#if index !== 4}
						<IconMathGreater class="w-10 h-10" />
					{/if}
				{/each}
				{#each Array(5 - selectedShards.length) as _, index (index)}
					<div
						class="{borderCss} self-center p-3 w-24 h-24 flex flex-col items-center justify-center"
						on:click={handleShardClick}
						on:keyup={(e) => e.key === 'Enter' && handleShardClick()}
					>
						{#if index === 0}
							<IconPlus class="w-20 h-20" />
						{/if}
					</div>
					{#if selectedShards.length + index !== 4}
						<IconMathGreater class="w-10 h-10" />
					{/if}
				{/each}
			</div>
			<div class="flex flex-row flex-wrap w-[35vw] gap-4 items-center self-center" />
		</div>
		<div class="flex flex-col">
			<div class="h1 font-evercore mt-12">CONSUMABLE</div>
			{#if selectedConsumable}
				<img
					on:click={handleConsumeableClick}
					alt="Image for {selectedConsumable.name}"
					class="w-24 h-24 {borderCss} self-center"
					src="/consumables/{selectedConsumable.id}.png"
					on:keyup={(e) => e.key === 'Enter' && handleConsumeableClick()}
				/>
			{:else}
				<div
					class="{borderCss} self-center"
					on:click={handleConsumeableClick}
					on:keyup={(e) => e.key === 'Enter' && handleConsumeableClick()}
				>
					<IconMoneybag class="w-20 h-20" />
				</div>
			{/if}
		</div>
	</div>
	{#if selectedHeroAbilities && selectedHeroAbilities.length > 0}
		<div class="h1 font-evercore mt-12">ABILITIES</div>
		<div class="flex flex-row justify items-center mt-4">
			<div class="flex flex-col items-center m-4 gap-x-1 gap-1">
				<AbilityLoadoutIcon ability={abilitySlot(selectedHeroAbilities, 'P')} />

				<AbilityLoadoutIcon ability={abilitySlot(selectedHeroAbilities, 'Q')} />

				<AbilityLoadoutIcon ability={abilitySlot(selectedHeroAbilities, 'W')} />

				<AbilityLoadoutIcon ability={abilitySlot(selectedHeroAbilities, 'E')} />

				<AbilityLoadoutIcon ability={abilitySlot(selectedHeroAbilities, 'R')} />
			</div>
			<div class="flex">
				{#each abilityLadder as ability, index}
					<div class="flex flex-col items-center gap-1">
						<div class="w-12 h-12 flex flex-col items-center justify-center">
							<span style="font-weight: bold; font-size: 1.2rem;">{index + 1}</span>
						</div>
						{#each ['Q', 'W', 'E', 'R'] as slot, slotIndex}
							<div
								on:click={() => setAbility(index, slot)}
								on:keyup={(e) => e.key === 'Enter' && setAbility(index, slot)}
								class="w-12 h-12 border-2 border-surface-300-600-token hover:!border-primary-500 flex flex-col items-center justify-center"
							>
								{#if ability?.slot === slot}
									<span style="font-weight: bold; font-size: 1.2rem;" class={`ability${slot}`}>{ability.slot}</span>
								{/if}
							</div>
						{/each}
					</div>
				{/each}
			</div>
			<div />
		</div>
	{/if}

	<button on:click={shareBuild} type="button" class="btn variant-filled mt-12">
		<span>Copy shareable link</span>
	</button>
</div>

<style global lang="postcss">
	.abilityQ {
		color: #3fa6d2;
	}

	.abilityW {
		color: #d23f51;
	}

	.abilityE {
		color: #803fd2;
	}

	.abilityR {
		color: #dfaf51;
	}
</style>
