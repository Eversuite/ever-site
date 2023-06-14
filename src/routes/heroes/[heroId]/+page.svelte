<script lang="ts">
	import type { PageData } from './$types';
	import AbilityIcon from './AbilityIcon.svelte';
	import { RadioGroup, RadioItem, Tab } from '@skeletonlabs/skeleton';
	import TalentIcon from './TalentIcon.svelte';
	import { IconArrowBigRightFilled } from '@tabler/icons-svelte';
	import { abilitySlot } from '$lib/Utility';
	import { filterAbility } from '$lib/heroes/functions';

	export let data: PageData;

	let tabSet = 0;
	let selectedStance = 1;

	$: hero = data?.hero;
	$: src = `/characters/skins/${hero.id}-default.webp`;
	$: abilities = filterAbility(data?.abilities, selectedStance);
	$: talents = data?.talents;
</script>

<div class="flex flex-col gap-3">
	<div class="flex items-start gap-20">
		<div class="flex flex-col gap-3 justify-center max-w-[488px]">
			<div class="flex gap-7">
				<div class="basis-1/2 text-center">
					<h1 class="mb-1.5 text-left text-5xl">{hero.name.toUpperCase()}</h1>
					<p class="text-left">{hero.description}</p>
				</div>
				<img {src} alt="character portrait" class="object-scale-down max-h-[326px] max-w-[200px]" />
			</div>
			<div class="grid justify-items-center gap-2 col-span-2">
				<img src="/svg/border.svg" alt="border" />
				<p>art credit: Author</p>
			</div>
		</div>
		<div class="flex flex-col justify-between">
			<div class="flex flex-col gap-2">
				<h2 class="w-full text-4xl">ABILITIES</h2>
				{#if hero.stance_map}
					<div class="flex justify-center">
						{#each [...Object.entries(hero.stance_map)] as [stanceNumber, stanceName]}
							<Tab
								bind:group={selectedStance}
								name={stanceName}
								value={Number(stanceNumber)}
								class="uppercase text-gray"
							>
								<span
									class={selectedStance === Number(stanceNumber) ? 'text-white font-semibold' : ''}
									>{stanceName}</span
								>
								{#if Number(stanceNumber) < [...Object.entries(hero.stance_map)].length}
									<span class="mx-1">/</span>
								{/if}
							</Tab>
						{/each}
					</div>
				{/if}

				<div class="flex flex-wrap justify-around gap-3">
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
			</div>
			<div class="flex flex-col gap-3">
				<div class="flex items-end">
					<h2 class="text-center text-4xl mr-4">TALENTS</h2>
					{#each talents as [talentTree, _], i}
						<Tab bind:group={tabSet} name={talentTree.id} value={i} class="uppercase text-gray">
							<span class={tabSet === i ? 'text-white font-semibold' : ''}>{talentTree.name}</span>
							{#if i < talents.length - 1}
								<span class="mx-1">/</span>
							{/if}
						</Tab>
					{/each}
				</div>
				{#each talents as [_, talentTreeMap], i}
					{#if tabSet === i}
						<div class="flex flex-wrap justify-between">
							{#each [...talentTreeMap] as [_, talents], i}
								<div class="flex flex-col gap-y-3">
									{#each talents as talent}
										<TalentIcon {talent} />
									{/each}
								</div>
								{#if i < 2}
									<div class="flex flex-col justify-center">
										<IconArrowBigRightFilled size={45} />
									</div>
								{/if}
							{/each}
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	h1,
	h2 {
		font-family: 'EVERCORE';
		font-weight: 500;
		font-style: normal;
	}
</style>
