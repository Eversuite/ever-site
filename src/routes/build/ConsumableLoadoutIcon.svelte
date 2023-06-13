<script lang="ts">
	import type { Consumable } from '$lib/class/Consumable';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	export let consumable: Consumable;

    const iconCss="w-20 h-20 border-4 rounded-lg border-surface-300-600-token hover:!border-primary-500"
	const iconDivCss="flex flex-col center-text items-center"

	let consumablePopup: PopupSettings = {
		// Set the event as: click | hover | hover-click | focus | focus-click
		event: 'hover',
		// Provide a matching 'data-popup' value.
		target: `${consumable !== undefined ? consumable.id : 'dummy'}-popup`
	};

</script>

{#if consumable}
	<!--This '#if' prevents the breaking of the entire page if no ability was found-->
	<div class="{iconDivCss}">
		<img
            use:popup={consumablePopup}
			id="{consumable.id}-image"
			src="/consumables/{consumable.id}.webp"
			alt="image for {consumable.name}"
			class="{iconCss}"
		/>
	</div>
	<div data-popup="{consumable.id}-popup" class="card p-4">
		<header class="card-header text-lg font-bold text-center">{consumable.name}</header>
		<hr class="border-2" />
		<section class="p-4">{@html consumable.description}</section>
	</div>
{:else}
<div class="{iconDivCss}">
    <img class="{iconCss}" alt="consumable-nav-icon" src="/nav-icons/consumables.svg"/>
</div>
{/if}
