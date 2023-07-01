<script lang="ts">
	import type { Ability } from '$lib/class/Ability';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	export let ability: Ability;
	export let readOnly: boolean = false;
	
	let abilityPopup: PopupSettings = {
		event: 'hover',
		target: `${ability?.id ?? 'dummy'}-popup`,
		placement: 'right'
	};

	function resolveDescription(ab: Ability): string {
		let copy = ab.description;
		if (ab.properties) {
			for (const key of Object.keys(ab.properties)) {
				copy = copy?.replaceAll(
					'{' + key + '}',
					ab.properties[key]?.map((prop) => prop.Value).join(' | ')
				);
			}
		}
		return copy;
	}
</script>

{#if ability !== undefined}
	<div class="flex center-text items-center">
		<img
			use:popup={abilityPopup}
			draggable="false"
			id="{ability.id}-image"
			src="/abilities/{ability.id}.webp"
			alt="image for {ability.name}"
			class={`w-12 h-12 border-2 rounded-lg border-surface-300-600-token ${readOnly ? "" : "hover:!border-primary-500"}`}
		/>
	</div>
	<div data-popup="{ability.id}-popup" class="card p-4">
		<header class="card-header text-lg font-bold text-center">{ability.name}</header>
		<hr class="border-2" />
		<section class="p-4">{@html resolveDescription(ability)}</section>
	</div>
{/if}

<style>
</style>
