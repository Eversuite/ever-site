<script lang="ts">
	import type { PageData } from './$types';
	import { Img } from 'flowbite-svelte';

	export let data: PageData;

	$: hero = data?.hero;
	$: src = `/characters/preview/${hero.id}-preview.png`;
</script>

<div class="flex gap-3 ">
	<Img {src} />
	<div>
		{hero.description}
	</div>
</div>
