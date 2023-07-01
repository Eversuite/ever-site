<script lang="ts">
	import ShardsPicker from './ShardsPicker.svelte';
	import type { PageData } from '../$types';
	import type { Shard } from '$lib/class/Shard';
	import type { Consumable } from '$lib/class/Consumable';
	import type { Hero } from '$lib/class/Hero';
	import type { Ability } from '$lib/class/Ability';
	import { abilitySlot } from '$lib/Utility';
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
		'border-4 rounded-2xl border-surface-300-600-token cursor-pointer';

</script>

<div class="flex flex-col flex-wrap justify-center p-8">
	<div class="b-2 text-6xl font-ardela mb-5">{buildTitle}</div>
	<div>
		<div class="h3 font-evercore mb-3">HERO*</div>
		{#if selectedHero}
			<img
				alt="Image for {selectedHero.name}"
				class="w-48 h-48 {borderCss} self-center"
				src="/characters/portraits/{selectedHero.id}.webp"
			/>
		{/if}
	</div>
	<div class="flex flex-row justify-start content-center gap-x-12 flex-wrap">
		<ShardsPicker shards={data?.shards} bind:selectedShards />
		<div class="flex flex-col justify-start">
			<div class="h1 font-evercore mt-12">CONSUMABLE</div>
			<div>
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
			<AbilityLadder bind:selectedAbilities readOnly/>
		</div>
	{/if}
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
