<script lang="ts">
	import type { Shard } from '$lib/class/Shard';
	import { IconPlus } from '@tabler/icons-svelte';
	import { popup } from '@skeletonlabs/skeleton';
	import type { PopupSettings } from '@skeletonlabs/skeleton';

	export let shard: Shard | null;
	export let readOnly: boolean = false;

	const popUpTargetString = `shard-popup-${Math.floor(Math.random() * 100000)}`;

	const iconCss =
		`w-20 h-20 border-4 rounded-lg border-surface-300-600-token ${readOnly ? "" : "hover:!border-primary-500"}`;
	const iconDivCss = 'flex flex-col center-text items-center';

	let shardPopup: PopupSettings = {
		event: 'hover',
		target: popUpTargetString,
		placement: 'top'
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

{#if shard}
	<div class={iconDivCss}>
		<img
			use:popup={shardPopup}
			id="{shard.id}-image"
			src="/shards/{shard.id}.webp"
			alt="image for {shard.name}"
			class={iconCss}
		/>
	</div>
	<div data-popup={popUpTargetString} class="card p-4">
		<header class="card-header text-lg font-bold text-center">{shard.name}</header>
		<hr class="border-2" />
		<section class="p-4">{@html resolveDescription(shard)}</section>
	</div>
{:else}
	<div class={iconDivCss}>
		<IconPlus class={iconCss} />
	</div>
{/if}
