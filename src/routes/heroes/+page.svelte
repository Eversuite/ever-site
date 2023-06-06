<script lang="ts">
	import type { PageData } from './$types';
	import type { Hero } from '$lib/class/Hero';
	import { Avatar } from '@skeletonlabs/skeleton';
	import type { Ability } from '$lib/class/Ability';
	import AbilityIcon from './[heroId]/AbilityIcon.svelte';
	import { IconBoxPadding } from '@tabler/icons-svelte';
	import { goto } from '$app/navigation';

	export let data: PageData;

	let searchTerm = '';
	$: heroes = heroFilter(data?.heroData, searchTerm);
	
	let groupBy = function <TItem, K>(list: TItem[], keyGetter: (TItem) => K): Map<K, TItem[]> {
		const map = new Map();
		for (const item of list) {
			const key = keyGetter(item);
			const collection = map.get(key);
			if (!collection) {
				map.set(key, [item]);
			} else {
				collection.push(item);
			}
		}
		return map;
	};

	$: byRole = groupBy(heroes, (hero) => hero.role);

	function heroFilter(heroes: Hero[] | undefined, term: string): Hero[] {
		heroes = heroes || []; // heroes is either the defined array or an empty array

		return heroes.filter((hero) => contains(hero.name, term) || contains(hero.role, term));
	}

	function contains(source: string, term: string): boolean {
		return source.toLowerCase().indexOf(term.toLowerCase()) !== -1;
	}

	let selectedHero: Hero | undefined = undefined;
	$: selectedHero;

	async function selectHero(heroDetails: Hero) {
		if(window.innerWidth < 1050) {
			goto(`/heroes/${heroDetails.id}`);
		}
		selectedHero = undefined;
		selectedHero = heroDetails;
	}

	function abilitySlot(selectedHeroObject: Hero, slot: string): Ability | undefined {
		const fetchedAbilities = data.abilitiesData?.filter(
			(ability) => ability.source === selectedHeroObject?.id
		);

		return fetchedAbilities
			?.filter((ab) => ab.slot != undefined || ab.slot != null)
			.find((ability) => ability.slot.toUpperCase() === slot.toUpperCase());
	}
</script>

<div class="heroPageContainer">
	<input
		bind:value={searchTerm}
		type="text"
		placeholder="Filter through the heroes"
		class="mb-8 input"
	/>

	<div class="flex justify-start gap-4">
		<div class="flex flex-col heroListContainer">
			{#each Array.from(byRole.keys()) as role}
				<div class="mb-4 mr-4">
					<div class="text-left h2 font-evercore">{role.toUpperCase()}</div>
					<div class="grid max-sm:grid-cols-1 grid-cols-4 gap-3">
						{#each byRole.get(role) as hero (hero.id)}
							<div
								class="flex flex-col justify-center items-center m-2"
								on:click={() => selectHero(hero)}
							>
								<Avatar
									rounded="rounded-2xl"
									border="border-4 border-surface-300-600-token hover:!border-primary-500"
									cursor="cursor-pointer"
									src="/characters/portraits/{hero.id}-portrait.png"
									width="w-20"
								/>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
		<div class="detailsContainer">
			{#if selectedHero}
				<div class="flex flex-col items-center p-4 heroDetailsContainer">
					<div class="flex flex-row" style="transition all .2s ease-in-out">
						<div class="flex flex-col items-start">
							<h1 class="mb-2 text-7xl heroLabel" style="">{selectedHero?.name.toUpperCase()}</h1>
							<p class="mb-2 text-2xl heroDescription" style="">
								{selectedHero?.description}
							</p>
						</div>
						<img
							src={`/characters/preview/${selectedHero?.id}-preview-cropped.png`}
							class="object-scale-down max-h-[500px] max-w-[500px] heroImage"
						/>
					</div>
					<div class="flex flex-col items-center justify-center">
						<div class="flex flex flex-row flex-wrap justify-around gap-3" style="flex: 1">
							<div>
								<AbilityIcon ability={abilitySlot(selectedHero, 'P')} />
							</div>
							<div>
								<AbilityIcon ability={abilitySlot(selectedHero, 'Q')} />
							</div>
							<div>
								<AbilityIcon ability={abilitySlot(selectedHero, 'W')} />
							</div>
							<div>
								<AbilityIcon ability={abilitySlot(selectedHero, 'E')} />
							</div>
							<div>
								<AbilityIcon ability={abilitySlot(selectedHero, 'R')} />
							</div>
						</div>
						<div class="flex flex flex-row flex-wrap justify-around gap-3">
							<a href={`/heroes/${selectedHero.id}`}>
								<div class="heroRedirectButton">Learn More</div>
							</a>
						</div>
					</div>
				</div>
			{/if}
			{#if !selectedHero}
				<div class="flex flex-col items-center justify-center p-4" style="flex: 1; height: 50%;">
					<p class="mb-2 text-5xl heroDescription text-center">{'SELECT A HERO'}</p>
				</div>
			{/if}
		</div>
	</div>
</div>

<style global lang="postcss">
	.heroPageContainer {
		height: calc(100vh - 32px);
	}

	.heroListContainer {
		overflow-y: scroll;
		height: calc(100vh - 96px);

		@media (max-width: 1050px) {
			flex: 1;
		}
	}

	.heroList {
		grid-template-columns: (auto-fit, minmax(0, 1fr));
	}

	.detailsContainer {
		flex: 1;
		display: flex;
		@media (max-width: 1050px) {
			display: none;
		}
	}

	.heroDetailsContainer {
		flex: 1;
	}

	@media (max-width: 1600px) {
		img.heroImage {
			display: none;
		}
	}

	.heroLabel {
		max-width: 350px;
		font-family: 'EVERCORE';
		color: white;
	}

	.heroDescription {
		max-width: 350px;
		color: white;
	}

	.heroRedirectButton {
		background-color: #1e5e6d;
		border: 4px solid #b7d4e9;
		border-radius: 10px;
		width: 100%;
		padding: 2rem 4rem;
		margin: 1rem;
		font-size: 32px;
	}
</style>
