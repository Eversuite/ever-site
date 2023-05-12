<script lang="ts">
	import type { PageData } from './$types';
	import { Hero } from '$lib/class/Hero';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let data: PageData;

	let searchTerm = '';
	$: heroes = heroFilter(data?.heroData, searchTerm);

	function heroFilter(heroes: Hero[], term: string): Hero[] {
		return heroes.filter((hero) => contains(hero.name, term) || contains(hero.role, term));
	}

	function contains(source: string, term: string): boolean {
		return source.toLowerCase().indexOf(term.toLowerCase()) !== -1;
	}
</script>

<div class="flex flex-wrap justify-center gap-3">
	{#each heroes as hero (hero.id)}
		<a href="/heroes/{hero.id}">
			<img
				class="w-32 32 border-4 rounded-lg border-surface-300-600-token hover:!border-primary-500"
				src="/characters/portraits/{hero.id}-portrait.png"
				alt="Avatar image of {hero.name}"
			/>
		</a>
	{/each}
</div>
