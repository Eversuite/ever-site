<script lang="ts">
	import { Img, P, Popover } from 'flowbite-svelte';
	import { Ability } from "$lib/class/Ability";

	export let ability: Ability;
</script>

<div class="flex flex-col center-text items-center">
	<Img id="{ability.id}-image" src="/abilities/{ability.id}.png" size="w-32" />
	<P class="font-bold">{ability.name}</P>
</div>
<Popover class="" title={ability.name} triggeredBy="#{ability.id}-image">
	{@html ability.description}
</Popover>
