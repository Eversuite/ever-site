<script lang="ts">
	import type { Talent } from '$lib/class/Talent';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	export let talent: Talent;

	let talentPopup: PopupSettings = {
		event: 'hover',
		target: `${talent !== undefined ? talent.id : 'dummy'}-popup`,
		placement: 'top'
	};
</script>

{#if talent !== undefined}
	<div class="flex flex-col center-text items-center">
		<img
			use:popup={talentPopup}
			id="{talent.id}-image"
			src="/talents/{talent.id}.webp"
			alt="image for {talent.name}"
			class="w-[82px] h-[82px] border-4 rounded-lg border-surface-300-600-token hover:!border-primary-500"
		/>
	</div>
	<div data-popup="{talent.id}-popup" class="card p-4">
		<header class="card-header text-lg font-bold text-center">{talent.name}</header>
		<hr class="border" />
		<section class="p-4">{@html talent.description}</section>
	</div>
{/if}
