<script lang="ts">
	import type { Shard } from '$lib/class/Shard';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	export let shard: Shard;

	let shardPopup: PopupSettings = {
		// Set the event as: click | hover | hover-click | focus | focus-click
		event: 'hover',
		// Provide a matching 'data-popup' value.
		target: `${shard !== undefined ? shard.id : 'dummy'}-popup`
	};

	function resolveDescription(sh: Shard): string {
		let copy = sh.description;
		if (sh.properties) {
			for (const key of Object.keys(sh.properties)) {
				copy = copy?.replaceAll(
					'{' + key + '}',
					sh.properties[key]?.map((prop) => prop.Value).join(' | ')
				);
			}
		}
		return copy;
	}
</script>

{#if shard !== undefined}
	<!--This '#if' prevents the breaking of the entire page if no ability was found-->
	<div class="flex flex-col center-text items-center">
		<img
			use:popup={shardPopup}
			id="{shard.id}-image"
			src="/shards/{shard.id}.webp"
			alt="image for {shard.name}"
			class="w-24 h-24 border-4 rounded-lg border-surface-300-600-token hover:!border-primary-500"
		/>
		<p>{shard.name}</p>
	</div>
	<div data-popup="{shard.id}-popup" class="card p-4 z-index-50">
		<header class="card-header text-lg font-bold text-center">{shard.name}</header>
		<hr class="border-2" />
		<section class="p-4">{@html resolveDescription(shard)}</section>
		<section class="text-sm p-4 opacity-80">Available at {shard.source}</section>
	</div>
{/if}
