<script lang="ts">
	import type { Shard } from '$lib/class/Shard';
	import { Avatar, ListBoxItem, modalStore, popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { IconHelpOctagon, IconQuestionMark } from '@tabler/icons-svelte';

    export let item;

    const popupHover: PopupSettings = {
	event: 'hover',
	target: `${item !== undefined ? item.id : 'dummy'}-popup`,
	placement: 'right'
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

<div class='border-2 rounded-2xl border-surface-300-600-token hover:!border-primary-500 cursor-pointer' use:popup={popupHover}>
    <IconQuestionMark class="w-6 h-6" />
</div>
<div data-popup="{item.id}-popup" class="card p-4 text-surface-100">
    {#if item.properties}
    <p>{@html resolveDescription(item)}</p>
    {:else}
    <p>{@html item.description}</p>
    {/if}
</div>