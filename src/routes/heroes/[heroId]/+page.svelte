<script lang="ts">
	import dayjs from 'dayjs';
	import type { PageData } from './$types';
	import AbilityIcon from './AbilityIcon.svelte';
	import { Tab } from '@skeletonlabs/skeleton';
	import TalentIcon from './TalentIcon.svelte';
	import { IconArrowBigRightFilled } from '@tabler/icons-svelte';
	import { abilitySlot } from '$lib/Utility';

	export let data: PageData | undefined;

	let tabSet = 0;
	let selectedStance = 1;

	$: hero = data?.hero;
	$: src = `/characters/skins/${hero?.id}-default.webp`;
	$: abilities = data?.abilities ?? [];
	$: talents = data?.talents ? Array.from(data.talents) : [];
	$: builds = data?.builds ?? [];
</script>

<div class="flex flex-col gap-3">
	<div class="flex flex-col xl:flex-row items-stretch gap-20 mb-12">
		<div class="flex flex-col xl:flex-row items-start gap-20">
			<div class="flex flex-col gap-3 justify-center max-w-[488px] relative">
				<div class="flex gap-7">
					<div class="basis-1/2 text-center">
						<h1 class="mb-1.5 text-left text-5xl">{hero?.name.toUpperCase()}</h1>
						<p class="text-left">{hero?.description}</p>
					</div>
					<img
						{src}
						alt="character portrait"
						class="object-scale-down max-h-[326px] max-w-[200px]"
					/>
				</div>
				<div
					class="grid justify-items-center gap-2 col-span-2 absolute left-0 right-0 top-[calc(100%+20px)]"
				>
					<img src="/svg/border.svg" alt="border" />
					<p>art credit: Author</p>
				</div>
			</div>
		</div>
		<div class="flex flex-col justify-between">
			<div class="flex flex-col items-start gap-2">
				<div class="flex items-end">
					<h2 class="text-center text-4xl mr-4">ABILITIES</h2>
					{#if hero?.stance_map}
						{#each [...Object.entries(hero?.stance_map)] as [stanceNumber, stanceName]}
							<Tab
								bind:group={selectedStance}
								name={stanceName}
								value={Number(stanceNumber)}
								class="uppercase text-gray flex"
							>
								<span
									class={selectedStance === Number(stanceNumber) ? 'text-white font-semibold' : ''}
								>
									{stanceName}
								</span>
								{#if Number(stanceNumber) < [...Object.entries(hero.stance_map)].length}
									<span class="mx-1">/</span>
								{/if}
							</Tab>
						{/each}
					{/if}
				</div>
				<div class="flex flex-wrap justify-start gap-3">
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
			<div class="flex flex-col items-start gap-2">
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
				<div class="flex items-end">
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
	<div>
		<h2 class="text-[40px] leading-[48px] uppercase mb-2">Recommended Build</h2>
		<p class="max-w-[677px]">
			These are the recommended shards to look out for when building for {hero?.name}, as determined
			by community votes, If you are already familiar with how to play {hero?.name} this is a great resource
			to quickly get a good rune selection for Patch 0.1 CB. However, if you are a new {hero?.name} player
			we highly recommend reading through some of the guides above to learn why this build is strong
			on {hero?.name}!
		</p>
	</div>
	<div>
		<h2 class="text-[40px] leading-[48px] uppercase mb-2">Best rated player builds</h2>
		<div class="flex flex-wrap gap-3">
			{#each builds as build, i}
				<div class="flex items-center gap-3 bg-dark-1 px-6 py-4 rounded-md">
					<img src={build.image} alt="" width="76" height="74" class="rounded-md" />
					<div class="flex flex-col gap-1.5">
						<p class="leading-[10px] text-[11px]">{build.title}</p>
						<p class="leading-[10px] text-[11px]">
							by <span class="text-egg-blue">{build.author}</span> updated {dayjs(
								build.updatedAt
							).format('MMM D, YYYY')}
						</p>
						<div class="flex justify-between gap-2">
							{#each build.talents as talent, i}
								<img src={talent.image} alt="" width="35" height="33" class="rounded-sm" />
							{/each}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
	<div>
		<h2 class="text-[40px] leading-[48px] uppercase mb-6">Skins</h2>
		<div class="flex flex-wrap gap-10">
			{#each { length: 4 } as _, i}
				<div class="flex flex-col gap-4 items-center">
					<img
						src="/characters/preview/berserker-tank-preview.png"
						alt=""
						width="212"
						height="340"
						class="rounded-lg"
					/>
					<p class="uppercase text-[24px] leading-[22px]">Default</p>
				</div>
			{/each}
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
