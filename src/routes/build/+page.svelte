<script lang="ts">
	import { Avatar, modalStore, type ModalSettings, type ModalComponent } from '@skeletonlabs/skeleton';
	import ModalListSelect from './ModalListSelect.svelte';
	import type { PageData } from '../$types';
	import type { Build } from '$lib/class/Build';
	import { goto } from '$app/navigation';
	import { getContext } from 'svelte';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { popup } from '@skeletonlabs/skeleton';

	export let data: PageData;

	const { state } = getContext('ECVAuthState');
	let selectedHeroes: string[] = [];
	let selectedMaps: string[] = [];
	let builds: Build[] = data?.builds || [];
	let searchTitle = '';

	const modalComponent: ModalComponent = {
		ref: ModalListSelect
	};

	const heroModal = (selectedHeroesArray: string[]): ModalSettings => ({
		type: 'component',
		component: modalComponent,
		title: 'Select a hero',
		meta: {
			items: data?.heroes,
			path: '/characters/portraits',
			searchQueries: ['name', 'role'],
			multiSelect: true,
			selectedItems: selectedHeroesArray
		},
		response: (heroIDS: string[]) => heroFilterSet(heroIDS)
	});

	function handleHeroFilterClick() {
		modalStore.trigger(heroModal(selectedHeroes));
	}
	
	const getConsumablePopup = (index: number): PopupSettings => {
		return {
			event: 'hover',
			target: `modal-popup-${index}`,
			placement: 'top'
		};
	};

	function handleMapSelect(id: string) {
		if(selectedMaps.includes(id)) {
			selectedMaps = selectedMaps.filter((item) => item !== id);
			mapFilterSet(selectedMaps);
			return;
		}
		selectedMaps.push(id);
		selectedMaps = selectedMaps;
		mapFilterSet(selectedMaps);
	}

	function handleItemSelect(id: string) {
		if(selectedHeroes.includes(id)) {
			selectedHeroes = selectedHeroes.filter((item) => item !== id);
			heroFilterSet(selectedHeroes);
			return;
		}
		selectedHeroes.push(id);
		selectedHeroes = selectedHeroes;
		heroFilterSet(selectedHeroes);
	}

	function mapFilterSet(arr) {
		if (!arr) return;
		if (arr.length === 0) return (builds = data?.builds);
		builds = data?.builds.filter((build) => arr.includes(build.map));
		selectedMaps = arr;
	}

	function heroFilterSet(arr) {
		if (!arr) return;
		if (arr.length === 0) return (builds = data?.builds);
		builds = data?.builds.filter((build) => arr.includes(build.hero));
		selectedHeroes = arr;
	}

	const borderCSS = 'border-2 border-surface-300-600-token cursor-pointer';
</script>

<div class="flex flex-row justify-center p-8">
	<div class="flex flex-col flex-wrap justify-center max-w-[1136px]" style="flex-grow: 1">
		<div class="flex flex-row flex-wrap p-4 gap-2 justify-between">
			<div class="b-2 text-6xl font-ardela mb-5">FIND YOUR BUILD</div>
			<button
				class="btn modalButton createButton font-ardela text-2xl"
				on:click={() => goto(`/build/create`)}
				on:keyup={(e) => e.key === 'Enter' && goto(`/build/create`)}
				disabled={!state()}
				title={!state() ? 'You must log in to create a guide' : ''}>Create</button
			>
		</div>
		<div class="flex flex-row flex-wrap p-4 gap-2 justify-start">
			<div class="flex flex-col flex-wrap p-4 gap-2 max-w-[380px]" style="flex: 1;">
				<input
					bind:value={searchTitle}
					type="text"
					placeholder="Filter by title"
					class="mb-8 input buildInput"
				/>
				<button
					class="btn modalButton buildInput mobile"
					on:click={() => handleHeroFilterClick()}
					on:keyup={(e) => e.key === 'Enter' && handleHeroFilterClick()}>Filter by hero</button
				>
				<p class="text-lg font-bold text-center font-ardela desktop">Filter by map</p>
				<div class="flex flex-col flex-wrap justify-start gap-2 desktop">
					{#each ["Kru-Mines", "Moxy-Treetops", "Frostborn-Harbour"] as item, index}
						<button
							class="flex flex-col text-center"
							style={`background-image: url('/maps/${item}.png'); background-size: 100%; border-radius: 4px; ${selectedMaps.includes(item) ? "filter: brightness(1.5);" : ""}`}
							on:click={() => handleMapSelect(item)}
							on:keyup={(e) => e.key === 'Enter' && handleMapSelect(item)}
						>
							<p class="text-lg font-bold text-center">{item.replace("-", " ")}</p>
						</button>
					{/each}
				</div>
				<p class="text-lg font-bold text-center font-ardela desktop">Filter by hero</p>
				<div class="flex flex-row flex-wrap justify-evenly gap-2 desktop">
					{#each data?.heroes as item, index}
						<button
							class="flex flex-col items-center justify-center text-center"
							use:popup={getConsumablePopup(index)}
							on:click={() => handleItemSelect(item.id)}
							on:keyup={(e) => e.key === 'Enter' && handleItemSelect(item.id)}
						>
							<Avatar
								rounded="rounded-xl"
								class={selectedHeroes.includes(item.id) ? 'modalSelected' : ''}
								border="border-2 border-surface-300-600-token"
								cursor="cursor-pointer"
								src="/characters/portraits/{item.id}.webp"
								width="w-16"
							/>
						</button>
						<div data-popup={`modal-popup-${index}`} class="card p-1">
							<p class="text-lg font-bold text-center">{item?.name}</p>
						</div>
					{/each}
				</div>
				<!-- <button class="btn modalButton buildInput">Filter by role (WIP)</button> -->
			</div>
			<div class="flex flex-col flex-wrap justify-center p-4 gap-2">
				{#each builds as build}
					<div
						class="flex flex-row buildCardContainer {borderCSS} gap-2"
						on:click={() => goto(`/build/${build['url-id']}`)}
						on:keyup={(e) => e.key === 'Enter' && goto(`/build/${build['url-id']}`)}
					>
						<img
							src="/characters/portraits/{build?.hero}.webp"
							alt="character portrait"
							class="object-scale-down max-h-[85px] max-w-[85px] {borderCSS} border-none"
						/>
						<div
							class="flex flex-row justify-between flex-wrap"
							style="flex-grow: 1; padding-right: 0.5rem; "
						>
							<div>
								<p class="text-2xl font-ardela textMobile">{build.title}</p>
								<p class="font-ardela textMobile">{build['author-name']}</p>
							</div>
							<div class="text-right buildCardDesktop">
								<p class="font-ardela">
									Created: {new Date(build.created_at).toLocaleDateString()}
								</p>
							</div>
						</div>
					</div>
				{/each}
				
			</div>
		</div>
	</div>
</div>

<style global lang="postcss">
	.buildInput {
		max-width: 380px;
		border-radius: 4px;
		height: 2.5rem;
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

	.mobile {
		@media (min-width: 1300px) {
			display: none;
		}
	}

	.desktop {
		@media (max-width: 1300px) {
			display: none;
		}
	}

	.createButton {
		height: 3.5rem;
	}

	.modalButton {
		background-color: #1e5e6d;
		border: 2px solid #b7d4e9;
		border-radius: 4px;
		color: white;
	}

	button :global(.modalSelected) {
		border-color: #3ab0ca!important;
		border-width: 2.5px;
	}

	.buildCardDesktop {
		@media (max-width: 1300px) {
			display: none;
		}
	}

	.textMobile{
		@media (max-width: 1300px) {
			overflow-wrap: break-word;
			max-width: 200px;
		}
	}
	.buildCardContainer {
		background: linear-gradient(to bottom, #0e1216 0%, #0e1216 25%, #181b1f 100%),
			linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 1));

		@media (min-width: 1300px) {
			width: 700px;
			height: 89px;
		}

		@media (max-width: 1300px) {
			width: 100%;
			min-height: 89px;
		}
	}
</style>
