<script lang="ts">
	import { Talent } from '$lib/class/Talent';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	export let talent: Talent;

	let talentPopup: PopupSettings = {
		// Set the event as: click | hover | hover-click | focus | focus-click
		event: 'hover',
		// Provide a matching 'data-popup' value.
		target: `${talent !== undefined ? talent.id : 'dummy'}-popup`,
		placement: 'left'
	};
</script>

{#if talent !== undefined}
	<div class="flex flex-col center-text items-center">
		<img
			use:popup={talentPopup}
			id="{talent.id}-image"
			src="/talents/{talent.id}.png"
			alt="image for {talent.name}"
			class="w-24 h-24 border-4 rounded-lg border-surface-300-600-token hover:!border-primary-500"
		/>
	</div>
	<div data-popup="{talent.id}-popup" class="card p-4">
		<header class="card-header text-lg font-bold text-center">{talent.name}</header>
		<hr class="!border-t-2" />
		<section class="p-4">{@html talent.description}</section>
	</div>
{/if}
