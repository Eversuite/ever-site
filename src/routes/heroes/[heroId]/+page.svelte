<script lang="ts">
	import type { PageData } from './$types';
	import { Card, Img } from 'flowbite-svelte';

	export let data: PageData;

	$: hero = data?.hero;
	$: src = `/characters/preview/${hero.id}-preview-cropped.png`;
	$: src2 = `/characters/preview/${hero.id}-preview.png`;
</script>

<div class="flex flex-wrap gap-3">
	<Img {src} class="border-2" />
	<Img src={src2} class="border-2" />
	<div class="flex">
		<Card>
			{hero.description}
		</Card>
	</div>
</div>
