<script lang="ts">
	import type { PageData } from './$types';
	import AbilityIcon from './AbilityIcon.svelte';
	import { RadioGroup, RadioItem, Tab, TabGroup } from '@skeletonlabs/skeleton';
	import TalentIcon from './TalentIcon.svelte';
	import { IconArrowBigRightFilled } from '@tabler/icons-svelte';
	import { abilitySlot } from '$lib/Utility';
	import { filterAbility } from '$lib/heroes/functions';

	export let data: PageData;

	let tabSet = 0;
	let selectedStance = 1;
	console.log(`Data ${hero?.stance_map} ${selectedStance}`);
	$: hero = data?.hero;
	$: src = `/characters/preview/${hero.id}-preview-cropped.png`;
	$: abilities = filterAbility(data?.abilities, selectedStance);
	$: talentsMap = data?.talentsMap;
</script>

<div class="flex flex-col gap-3">
	<div class="flex flex-row flex-wrap gap-3 justify-center">
		<img {src} alt="character portrait" class="object-scale-down max-h-[500px] max-w-[500px]" />
		<div class="basis-1/2 text-center">
			<h1 class="mb-2 text-5xl">{hero.name.toUpperCase()}</h1>
			<p class="italic">{hero.description}</p>
		</div>
	</div>
	<h2 class="text-center text-4xl mt-8">ABILITIES</h2>
	<hr class="border" />
	{#if hero.stance_map}
		<div class="flex justify-center">
			<RadioGroup active="variant-filled-primary rounded-md" hover="hover:variant-soft-primary">
				{#each [...Object.entries(hero.stance_map)] as [stanceNumber, stanceName]}
					<RadioItem bind:group={selectedStance} name="justify" value={stanceNumber}
						>{stanceName}</RadioItem
					>
				{/each}
			</RadioGroup>
		</div>
	{/if}
	<div class="flex flex-row flex-wrap justify-around">
		<div>
			<AbilityIcon ability={abilitySlot(abilities, 'P')} />
		</div>
		<div>
			<AbilityIcon ability={abilitySlot(abilities, 'Q')} />
		</div>
		<div>
			<AbilityIcon ability={abilitySlot(abilities, 'W')} />
		</div>
		<div>
			<AbilityIcon ability={abilitySlot(abilities, 'E')} />
		</div>
		<div>
			<AbilityIcon ability={abilitySlot(abilities, 'R')} />
		</div>
	</div>
	<h2 class="mt-8 text-center text-4xl">TALENTS</h2>
	<TabGroup justify="justify-center border-b-2">
		{#each [...talentsMap] as [talentTree, talentTreeMap], i}
			<Tab bind:group={tabSet} name={talentTree.id} value={i}>{talentTree.name}</Tab>
		{/each}
	</TabGroup>
	<!-- Tab Panels --->
	{#each [...talentsMap] as [talentTree, talentTreeMap], i}
		{#if tabSet === i}
			<div class="flex flex-wrap justify-around content-center">
				{#each [...talentTreeMap] as [tier, talents], i}
					<div class="flex flex-col gap-y-3">
						{#each talents as talent}
							<TalentIcon {talent} />
						{/each}
					</div>
					{#if i < 2}
						<div class="flex flex-col justify-center">
							<IconArrowBigRightFilled size="50" />
						</div>
					{/if}
				{/each}
			</div>
		{/if}
	{/each}
</div>

<style>
	h1,
	h2 {
		font-family: 'EVERCORE';
		font-weight: 500;
		font-style: normal;
	}
</style>
