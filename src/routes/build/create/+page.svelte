<script lang="ts">
	import { modalStore, type ModalSettings, type ModalComponent } from '@skeletonlabs/skeleton';
	import ShardsPicker from './ShardsPicker.svelte';
	import ModalListSelect from './ModalListSelect.svelte';
	import type { PageData } from '../$types';
	import type { Shard } from '$lib/class/Shard';
	import type { Consumable } from '$lib/class/Consumable';
	import type { Hero } from '$lib/class/Hero';
	import type { Ability } from '$lib/class/Ability';
	import { abilitySlot } from '$lib/Utility';
	import {browser} from '$app/environment'
	import { getContext } from 'svelte';
	import { goto } from '$app/navigation';
	import AbilityLoadoutIcon from './AbilityLoadoutIcon.svelte';
	import ConsumableLoadoutIcon from './ConsumableLoadoutIcon.svelte';
	import AbilityLadder from './AbilityLadder.svelte';

	export let data: PageData;
	let selectedHero: Hero = data?.selectedHero ?? undefined;
	let selectedHeroAbilities: Ability[] = data?.selectedHeroAbilities ?? [];
	let selectedShards: (Shard | null)[] = data.selectedShards ?? new Array<Shard | null>(5);
	let selectedAbilities: string[] = (data?.abilityLadder ?? new Array(15)).map(
		(ability) => ability?.slot ?? ''
	);
	let selectedConsumable: Consumable = data?.selectedConsumable ?? undefined;

	let buildTitle = data?.buildTitle ?? '';

	const borderCss =
		'border-4 rounded-2xl border-surface-300-600-token hover:!border-primary-500 cursor-pointer';

	const modalComponent: ModalComponent = {
		ref: ModalListSelect
	};

	
	const { state, stateData } = getContext("ECVAuthState")

	if(browser && !state()){
		goto("/build")
	}

	const heroModal: ModalSettings = {
		type: 'component',
		component: modalComponent,
		title: 'Select a hero',
		meta: { items: data?.heroes, path: '/characters/portraits', searchQueries: ['name', 'role'] },
		response: (hero: Hero) => (heroSelected(hero))
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

		selectedHero = hero;
		selectedHeroAbilities = abilitiesResult.data as Ability[];
	}

	function handleConsumeableClick() {
		modalStore.trigger(consumableModal);
	}


	async function handleBuildClick() {
		shareBuild(true);
	}

	async function shareBuild(accepted: boolean) {
		if (!accepted) return;
		if (buildTitle.length === 0) return; // TODO: ADD ERROR MODAL POPUP
		if (!selectedConsumable?.id) return; // TODO: ADD ERROR MODAL POPUP

		let abilityLadderIds = selectedAbilities.map((ability) => {
			return selectedHeroAbilities.find((item) => item.slot === ability)?.id;
		});

		let selectedShardsIds = selectedShards.map((shard) => shard?.id ?? '');

		let build = {
			title: buildTitle,
			hero: selectedHero.id,
			abilities: abilityLadderIds,
			consumables: selectedConsumable?.id,
			shards: selectedShardsIds,
			gameVersion: "Closed-Beta-0.1"
		};

		const sessionData = stateData()
		let authorData = {
			"author-id": sessionData.user.id,
			"author-name": sessionData.user.user_metadata.full_name
		}

		const buildURLID = `${build.gameVersion}-${buildTitle.replace(" ","-")}-${Math.floor(Math.random() * 1000000)}`
		const { data: sbData, error }  = await data.supabase.from('builds').insert([{"url-id": buildURLID, ...build, ...authorData}])
	
		if(!error && browser) {
			goto(`/build/${buildURLID}`)
		}
	}
</script>

<div class="flex flex-col flex-wrap justify-center p-8">
	<div class="b-2 text-6xl font-ardela mb-5">BUILD CREATOR</div>
	<div class="h3 font-evercore mb-3">BUILD TITLE*</div>
	<input
		bind:value={buildTitle}
		type="text"
		placeholder="Enter your build title here..."
		class="mb-8 input buildInput"
	/>
	<div>
		<div class="h3 font-evercore mb-3">HERO*</div>
		{#if selectedHero}
			<img
				on:click={handleHeroClick}
				alt="Image for {selectedHero.name}"
				class="w-48 h-48 {borderCss} self-center"
				src="/characters/portraits/{selectedHero.id}.webp"
				on:keyup={(e) => e.key === 'Enter' && handleHeroClick()}
			/>
		{:else}
			<div
				class="{borderCss} self-center w-48 h-48 flex flex-col items-center justify-center h3 font-evercore text-center"
				on:click={handleHeroClick}
				on:keyup={(e) => e.key === 'Enter' && handleHeroClick()}
			>
				CLICK TO CHOOSE A HERO
			</div>
		{/if}
	</div>
	<div class="flex flex-row justify-start content-center gap-x-12 flex-wrap">
		<ShardsPicker shards={data?.shards} bind:selectedShards />
		<div class="flex flex-col justify-start">
			<div class="h1 font-evercore mt-12">CONSUMABLE</div>
			<div
				on:click={() => handleConsumeableClick()}
				on:keyup={(e) => e.key === 'Enter' && handleConsumeableClick()}
			>
				<ConsumableLoadoutIcon consumable={selectedConsumable} />
			</div>
		</div>
	</div>
	{#if selectedHeroAbilities && selectedHeroAbilities.length > 0}
		<div class="h1 font-evercore mt-12">ABILITIES</div>
		<div class="flex swapToCol justify items-center mt-4">
			<div class={`flex swapToRow items-center m-4 gap-x-1 gap-1`}>
				<div class="w-12 h-12">
					<AbilityLoadoutIcon ability={abilitySlot(selectedHeroAbilities, 'P')} />
				</div>
				<div class="w-12 h-12">
					<AbilityLoadoutIcon ability={abilitySlot(selectedHeroAbilities, 'Q')} />
				</div>
				<div class="w-12 h-12">
					<AbilityLoadoutIcon ability={abilitySlot(selectedHeroAbilities, 'W')} />
				</div>
				<div class="w-12 h-12">
					<AbilityLoadoutIcon ability={abilitySlot(selectedHeroAbilities, 'E')} />
				</div>
				<div class="w-12 h-12">
					<AbilityLoadoutIcon ability={abilitySlot(selectedHeroAbilities, 'R')} />
				</div>
			</div>
			<AbilityLadder bind:selectedAbilities />
		</div>
	{/if}

	<button on:click={handleBuildClick} type="button" class="btn variant-filled mt-12">
		<span>Creat build</span>
	</button>
</div>

<style global lang="postcss">
	.buildInput {
		max-width: 380px;
		border-radius: 14px;
	}

	.swapToRow {
		flex-direction: column;
		@media (max-width: 940px) {
			flex-direction: row;
		}
	}

	.swapToCol {
		flex-direction: row;
		@media (max-width: 940px) {
			flex-direction: column;
		}
	}
</style>
