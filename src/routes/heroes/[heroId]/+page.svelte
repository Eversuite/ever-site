<script lang="ts">
	import type { PageData } from './$types';
	import type { Ability } from '../../../lib/class/Ability';
	import AbilityIcon from './AbilityIcon.svelte';
	import { Tab, TabGroup } from "@skeletonlabs/skeleton";

	export let data: PageData;

	let tabSet

	$: hero = data?.hero;
	$: src = `/characters/preview/${hero.id}-preview-cropped.png`;
	$: abilities = data?.abilities;
	$: talentsMap = data?.talentsMap;

	function abilitySlot(abilities: Ability[], slot: string): Ability {
		return (
			abilities
				// We want to ignore every ability where the slot is unknown.
				.filter((ab) => ab.slot != undefined || ab.slot != null)
				.find((ability) => ability.slot.toUpperCase() === slot.toUpperCase())
		);
	}
</script>

<div class="flex flex-col gap-3">
	<div class="flex flex-row flex-wrap gap-3 justify-center">
		<img {src} alt="character portrait" class="object-scale-down max-h-[700px] max-w-[700px]" />
		<div class="basis-1/2 text-center">
			<h3 class="mb-2">{hero.name}</h3>
			<p class="italic">{hero.description}</p>
		</div>
	</div>
	<hr class="border-t-2" />
	<h2 class="text-center">Abilities</h2>
	<div class="flex flex-row flex-wrap justify-around">
		<div><AbilityIcon ability={abilitySlot(abilities, 'P')} /></div>
		<div><AbilityIcon ability={abilitySlot(abilities, 'Q')} /></div>
		<div><AbilityIcon ability={abilitySlot(abilities, 'W')} /></div>
		<div><AbilityIcon ability={abilitySlot(abilities, 'E')} /></div>
		<div><AbilityIcon ability={abilitySlot(abilities, 'R')} /></div>
	</div>
	<hr class="border-t-2" />
	<h2 class="text-center">Talents</h2>
	<div class="flex flex-row flex-wrap justify-around" >
		<TabGroup>
			{#each [...talentsMap] as [talentTree, talentTreeMap]}
				<Tab bind:group={tabSet} name={talentTree.id} value={talentTree.id}>{talentTree.name}</Tab>
			{/each}
			<!-- Tab Panels --->
			<svelte:fragment slot="panel">
				{#if tabSet === 0}
					(tab panel 1 contents)
				{:else if tabSet === 1}
					(tab panel 2 contents)
				{:else if tabSet === 2}
					(tab panel 3 contents)
				{/if}
			</svelte:fragment>
		</TabGroup>
	</div>
</div>
