<script lang="ts">
	import { modalStore, type ModalSettings, type ModalComponent } from '@skeletonlabs/skeleton';
	import { IconCrown, IconSparkles, IconMoneybag, IconMathGreater } from '@tabler/icons-svelte';
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

	export let data: PageData;
	let selectedHero: Hero = data?.selectedHero ?? undefined;
	let selectedHeroAbilities: Ability[] = data?.selectedHeroAbilities ?? [];
	let abilityLadder = data?.abilityLadder ?? new Array(15).fill(null);
	let selectedConsumable:Consumable = data?.selectedConsumable ?? undefined;
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
		title: 'Custom List Component',
		body: 'Make your selection then press submit.',
		meta: { items: data?.heroes, path: '/characters/portraits/' },
		response: (hero: Hero) => heroSelected(hero)
	};

	let shardModal: ModalSettings = {
		type: 'component',
		component: modalComponent,
		title: 'Custom List Component',
		body: 'Make your selection then press submit.',
		meta: { items: data?.shards, path: '/shards/' },
		response: (shard: Shard) => addShard(shard)
	};

	const consumableModal: ModalSettings = {
		type: 'component',
		component: modalComponent,
		title: 'Custom List Component',
		body: 'Make your selection then press submit.',
		meta: { items: data?.consumables, path: '/consumables/' },
		response: (r: Consumable) => (selectedConsumable = r)
	};

	function handleHeroClick() {
		modalStore.trigger(heroModal);
	}

	async function heroSelected(hero: Hero) {
		console.log("hero selehced: " + hero)
		const [abilitiesResult, talentsResult, talentTreesResult] = await Promise.all([
			data.supabase.from('abilities').select().eq('source', hero.id),
			data.supabase.from('talents').select().eq('hero', hero.id),
			data.supabase.from('talent_trees').select().eq('source', hero.id)
		]);

		selectedHero = hero;
		selectedHeroAbilities = abilitiesResult.data as Ability[];
	}

	function addAbility(slot: string) {
		const nullIndex: number = abilityLadder.findIndex((element) => element === null);
		abilityLadder[nullIndex] = abilitySlot(selectedHeroAbilities, slot);
	}

	function removeAbility(index: number) {
		abilityLadder[index] = null;
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
		let loadout = {
			heroId: selectedHero.id,
			abilityIds: abilityLadderIds,
			consumableId: selectedConsumable.id,
			shardIds: selectedShardsIds
		};
		let jsonLoadout = JSON.stringify(loadout);
		let encoded = window.btoa(jsonLoadout);

		$page.url.searchParams.set('build', encoded);
		goto(`?${$page.url.searchParams.toString()}`);
	}
</script>

<div class="flex flex-col gap-3 items-center">
	{#if selectedHero}
		<img
			on:click={handleHeroClick}
			alt="Image for {selectedHero.name}"
			class="w-32 h-32 {borderCss}"
			src="/characters/portraits/{selectedHero.id}.png"
			on:keyup={(e) => e.key === 'Enter' && handleHeroClick()}
		/>
	{:else}
		<div
			class={borderCss}
			on:click={handleHeroClick}
			on:keyup={(e) => e.key === 'Enter' && handleHeroClick()}
		>
			<IconCrown class="w-32 h-32" />
		</div>
	{/if}

	{#if selectedHeroAbilities && selectedHeroAbilities.length > 0}
		<div class="flex flex-col items-center">
			<div class="flex mb-4">
				<div
					on:click={() => addAbility('Q')}
					on:keyup={(e) => e.key === 'Enter' && addAbility('Q')}
				>
					<AbilityLoadoutIcon ability={abilitySlot(selectedHeroAbilities, 'Q')} />
				</div>
				<div
					on:click={() => addAbility('W')}
					on:keyup={(e) => e.key === 'Enter' && addAbility('W')}
				>
					<AbilityLoadoutIcon
						on:click={() => addAbility('W')}
						ability={abilitySlot(selectedHeroAbilities, 'W')}
					/>
				</div>
				<div
					on:click={() => addAbility('E')}
					on:keyup={(e) => e.key === 'Enter' && addAbility('E')}
				>
					<AbilityLoadoutIcon
						on:click={() => addAbility('E')}
						ability={abilitySlot(selectedHeroAbilities, 'E')}
					/>
				</div>
				<div
					on:click={() => addAbility('R')}
					on:keyup={(e) => e.key === 'Enter' && addAbility('R')}
				>
					<AbilityLoadoutIcon
						on:click={() => addAbility('R')}
						ability={abilitySlot(selectedHeroAbilities, 'R')}
					/>
				</div>
			</div>
			<div class="flex">
				{#each abilityLadder as ability, index}
					<div class="flex flex-col items-center">
						{#if ability}
							<span>{index + 1}</span>
							<img
								on:click={() => removeAbility(index)}
								on:keyup={(e) => e.key === 'Enter' && removeAbility(ability)}
								id="{ability.id}-image"
								src="/abilities/{ability.id}.png"
								alt="image for {ability.name}"
								class="w-12 h-12 border-2 border-surface-300-600-token hover:!border-primary-500"
							/>
							<span>{ability.slot}</span>
						{:else}
							<span>{index + 1}</span>
							<div
								class="w-12 h-12 border-2 border-surface-300-600-token hover:!border-primary-500 cursor-pointer mb-6"
							/>
						{/if}
					</div>
				{/each}
			</div>
			<div />
		</div>
	{/if}

	<div class="flex flex-row gap-x-3 items-center">
		{#each selectedShards as shard}
			<div on:click={() => removeShard(shard)}>
				<ShardLoadoutIcon {shard} />
			</div>
			<IconMathGreater class="w-10 h-10" />
		{/each}
		<div
			class={borderCss}
			on:click={handleShardClick}
			on:keyup={(e) => e.key === 'Enter' && handleShardClick()}
		>
			<IconSparkles class="w-32 h-32" />
		</div>
	</div>
	{#if selectedConsumable}
		<img
			on:click={handleConsumeableClick}
			alt="Image for {selectedConsumable.name}"
			class="w-32 h-32 {borderCss}"
			src="/consumables/{selectedConsumable.id}.png"
			on:keyup={(e) => e.key === 'Enter' && handleConsumeableClick()}
		/>
	{:else}
		<div
			class={borderCss}
			on:click={handleConsumeableClick}
			on:keyup={(e) => e.key === 'Enter' && handleConsumeableClick()}
		>
			<IconMoneybag class="w-32 h-32" />
		</div>
	{/if}
	<button on:click={shareBuild} type="button" class="btn variant-filled">
		<span>Share</span>
	</button>
</div>
