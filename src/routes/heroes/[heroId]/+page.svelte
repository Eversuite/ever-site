<script lang="ts">
	import type { PageData } from './$types';
	import { Img } from 'flowbite-svelte';

	export let data: PageData;

	$: hero = data?.hero;
	$: src = `/characters/preview/${hero.id}-preview-cropped.png`;
	$: abs = data?.abilities;
</script>

<div class="flex flex-wrap gap-3">
	<Img {src} size="max-w-xl" class="border-2 rounded-lg" />
	<div class="flex-wrap">
		<div class="border-2 rounded-lg pd-2 p-2 flex-grow">
			{hero.description}
		</div>
		<div class="flex  border-2 rounded-lg p-2 justify-between">
			{#each abs as ability}
				<div class="text-center">
					<Img src="/abilities/{ability.id}.png" class="rounded-sm border-2 border-black" />
					<div class="justify-between font-semibold">{ability.name}</div>
				</div>
			{/each}
		</div>
	</div>
</div>
