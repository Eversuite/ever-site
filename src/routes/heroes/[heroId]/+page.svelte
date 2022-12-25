<script lang="ts">
	import type { PageData } from './$types';
	import {Heading, Img, P} from 'flowbite-svelte';

	export let data: PageData;

	$: hero = data?.hero;
	$: src = `/characters/preview/${hero.id}-preview-cropped.png`;
	$: abs = data?.abilities;
</script>

<div class="flex flex-col">
	<div class="flex flex-wrap">
		<Img {src} size="w-full lg:w-1/3" class="border-2 rounded-lg" />
		<div class="flex gap-3 grow text-center flex-col">
			<Heading tag="h2">{hero.name}</Heading>
			<Heading tag="h3">{hero.role}</Heading>
			<P align="center" class="self-center max-w-md lg:max-w-2xl">{hero.description}</P>
		</div>
	</div>
</div>

<!--<div class="flex flex-wrap gap-3">
	<Img {src} size="max-w-xl" class="border-2 rounded-lg" />
	<div class="flex-wrap ">
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
</div>-->
