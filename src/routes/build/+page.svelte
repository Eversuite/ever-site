<script lang="ts">
	import { modalStore, type ModalSettings, type ModalComponent } from '@skeletonlabs/skeleton';
	import ModalListSelect from './ModalListSelect.svelte';
	import type { PageData } from '../$types';
	import type { Build } from '$lib/class/Build';
	import type { Hero } from '$lib/class/Hero';
	import { goto } from '$app/navigation';
	import {browser} from '$app/environment'
	import { getContext } from 'svelte';

	export let data: PageData;

	const { state } = getContext("ECVAuthState")

	let selectedHeroes : string[] = [];
	let builds: Build[] = data?.builds || [];
	let searchTitle = '';

	const modalComponent: ModalComponent = {
		ref: ModalListSelect
	};

	const heroModal = (selectedHeroesArray : string[]): ModalSettings => ({
		type: 'component',
		component: modalComponent,
		title: 'Select a hero',
		meta: { items: data?.heroes, path: '/characters/portraits', searchQueries: ['name', 'role'], multiSelect: true, selectedItems: selectedHeroesArray},
		response: (heroIDS: string[]) => heroFilterSet(heroIDS)
	});

	function handleHeroFilterClick() {
		modalStore.trigger(heroModal(selectedHeroes));
	}

	function heroFilterSet(arr) {
		if(!arr) return;
		if (arr.length === 0) return builds = data?.builds;
		builds = data?.builds.filter((build) => arr.includes(build.hero));
		selectedHeroes = arr;
	}

	const borderCSS =
		'border-2 rounded-2xl border-surface-300-600-token cursor-pointer';
</script>

<div class="flex flex-col flex-wrap justify-center p-8">
	<div class="flex flex-row flex-wrap p-4 gap-2 justify-between">
		<div class="b-2 text-6xl font-ardela mb-5">FIND YOUR BUILD</div>
		<button class="btn modalButton createButton font-ardela text-2xl"
			on:click={() => goto(`/build/create`)}
			on:keyup={(e) => e.key === 'Enter' && goto(`/build/create`)}
			disabled={!state()}
			title={!state() ? "You must log in to create a guide" : ""}
		>Create</button>
	</div>
	<div class="flex flex-row flex-wrap p-4 gap-2">
		<input
			bind:value={searchTitle}
			type="text"
			placeholder="Filter by title"
			class="mb-8 input buildInput"
		/>
		<button class="btn modalButton buildInput"
			on:click={() => handleHeroFilterClick()}
			on:keyup={(e) => e.key === 'Enter' && handleHeroFilterClick()}
		>Filter by hero</button>
		<!-- <button class="btn modalButton buildInput">Filter by role (WIP)</button> -->
	</div>
	<div class="flex flex-row flex-wrap justify-center p-4 gap-2">
		{#each builds as build}
			<div class="flex flex-row flex-wrap p-2 buildCardContainer {borderCSS} w-[480px] gap-2"
				on:click={() => goto(`/build/${build["url-id"]}`)}
				on:keyup={(e) => e.key === 'Enter' && goto(`/build/${build["url-id"]}`)}
			>
				<img
					src="/characters/portraits/{build?.hero}.webp"
					alt="character portrait"
					class="object-scale-down max-h-[120px] max-w-[120px] {borderCSS} border-none"
				/>
				<div>
					<p class="text-3xl font-ardela">{build.title}</p>
					<p class="text-1xl font-ardela">{build["author-name"]}</p>
					<img
						src="/consumables/{build.consumables}.webp"
						alt="character portrait"
						class="object-scale-down max-h-[48px] max-w-[48px] {borderCSS} border-none"
					/>
				</div>
			</div>
		{/each}
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

	.createButton {
		height: 3.5rem;
	}

	.modalButton {
		background-color: #1e5e6d;
		border: 2px solid #b7d4e9;
		border-radius: 4px;
		color: white;
	}

	.buildCardContainer {
		background: linear-gradient(to bottom, #0e1216 0%, #0e1216 25%, #181b1f 100%),
			linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 1));
		height: 140px;
	}
</style>
