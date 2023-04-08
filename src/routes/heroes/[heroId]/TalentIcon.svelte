<script lang="ts">
	import { Img, Popover } from 'flowbite-svelte';
	import { Talent } from '$lib/class/Talent';

	export let talent: Talent;
</script>

{#if talent !== undefined}
	<Img
		id="{talent.id}-image"
		src="/talents/{talent.id}.png"
		size="w-16 h-16"
		class="rounded-md border-black"
	/>
	<Popover class="max-w-xl" title={talent.name} triggeredBy="#{talent.id}-image">
		{@html talent.description}
	</Popover>
{/if}
