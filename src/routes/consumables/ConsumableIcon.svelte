<script lang="ts">
	import type { Consumable } from '$lib/class/Consumable';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	export let consumable: Consumable;

	let consumablePopup: PopupSettings = {
		event: 'hover',
		target: `${consumable !== undefined ? consumable.id : 'dummy'}-popup`,
		placement: 'top'
	};
</script>

{#if consumable !== undefined}
	<div class="flex flex-col center-text items-center">
		<img
			use:popup={consumablePopup}
			id="{consumable.id}-image"
			src="/consumables/{consumable.id}.webp"
			alt="image for {consumable.name}"
			class="w-24 h-24 border-4 rounded-lg border-surface-300-600-token hover:!border-primary-500"
		/>
		<p>{consumable.name}</p>
	</div>
	<div data-popup="{consumable.id}-popup" class="card p-4">
		<header class="card-header text-lg font-bold text-center">{consumable.name}</header>
		<hr class="border-2" />
		<section class="p-4">{@html consumable.description}</section>
	</div>
{/if}
