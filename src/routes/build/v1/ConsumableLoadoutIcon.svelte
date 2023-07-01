<script lang="ts">
	import type { Consumable } from '$lib/class/Consumable';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	export let consumable: Consumable;
	export let readOnly: boolean = false;

	const iconCss =
		`w-20 h-20 border-4 rounded-lg border-surface-300-600-token ${readOnly ? "" : "hover:!border-primary-500"}`;
	const iconDivCss = 'flex flex-col center-text items-center';

	const popUpTargetString = `consumable-popup-${Math.floor(Math.random() * 100000)}`;

	let consumablePopup: PopupSettings = {
		event: 'hover',
		target: popUpTargetString,
		placement: 'top'
	};
</script>

{#if consumable}
	<div class={iconDivCss}>
		<img
			use:popup={consumablePopup}
			id="{consumable.id}-image"
			src="/consumables/{consumable.id}.webp"
			alt="image for {consumable.name}"
			class={iconCss}
		/>
	</div>
	<div data-popup={popUpTargetString} class="card p-4">
		<header class="card-header text-lg font-bold text-center">{consumable.name}</header>
		<hr class="border-2" />
		<section class="p-4">{@html consumable.description}</section>
	</div>
{:else}
	<div class={iconDivCss}>
		<img class={iconCss} alt="consumable-nav-icon" src="/nav-icons/consumables.svg" />
	</div>
{/if}
