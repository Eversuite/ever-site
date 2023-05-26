<script lang="ts">
	import type { PageData } from './$types';
	import type { Consumable } from '$lib/class/Consumable';
	import ConsumableIcon from './ConsumableIcon.svelte';

	export let data: PageData;

	let searchTerm = '';
	$: consumables = consumableFilter(data?.consumableData, searchTerm);

	function consumableFilter(consumables: Consumable[], term: string): Consumable[] {
		return consumables.filter((consumable) => contains(consumable.name, term));
	}

	function contains(source: string, term: string): boolean {
		return source.toLowerCase().indexOf(term.toLowerCase()) !== -1;
	}
</script>

<input
	bind:value={searchTerm}
	type="text"
	placeholder="Filter through consumables"
	class="mb-8 input"
/>

<div class="flex flex-wrap justify-center gap-x-10 gap-y-8">
	{#each consumables as consumable (consumable.id)}
		<ConsumableIcon {consumable} />
	{/each}
</div>
<script lang="ts">
	import type { PageData } from './$types';
	import type { Consumable } from '$lib/class/Consumable';
	import ConsumableIcon from './ConsumableIcon.svelte';

	export let data: PageData;

	let searchTerm = '';
	$: consumables = consumableFilter(data?.consumableData, searchTerm);

	function consumableFilter(consumables: Consumable[] | undefined, term: string): Consumable[] {
		return (consumables || []).filter((consumable) => contains(consumable.name, term));
	}

	function contains(source: string, term: string): boolean {
		return source.toLowerCase().indexOf(term.toLowerCase()) !== -1;
	}
</script>

<input
	bind:value={searchTerm}
	type="text"
	placeholder="Filter through consumables"
	class="mb-8 input"
/>

<div class="flex flex-wrap justify-center gap-x-10 gap-y-8">
	{#each consumables as consumable (consumable.id)}
		<ConsumableIcon {consumable} />
	{/each}
</div>
