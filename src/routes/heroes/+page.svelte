<script lang="ts">
	import type { PageData } from './$types';
	import { Hero } from '$lib/class/Hero';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let data: PageData;

	let searchTerm = '';
	$: heroes = heroFilter(data?.heroData, searchTerm);
	let groupBy = function <TItem, K>(list: TItem[], keyGetter: (TItem) => K): Map<K, TItem[]> {
		const map = new Map();
		for (const item of list) {
			const key = keyGetter(item);
			const collection = map.get(key);
			if (!collection) {
				map.set(key, [item]);
			} else {
				collection.push(item);
			}
		}
		return map;
	};

	$: byRole = groupBy(heroes, (hero) => hero.role);

	function heroFilter(heroes: Hero[] | undefined, term: string): Hero[] {
		heroes = heroes || []; // heroes is either the defined array or an empty array

		return heroes.filter((hero) => contains(hero.name, term) || contains(hero.role, term));
	}

	function contains(source: string, term: string): boolean {
		return source.toLowerCase().indexOf(term.toLowerCase()) !== -1;
	}
</script>

<input
	bind:value={searchTerm}
	type="text"
	placeholder="Filter through the heroes"
	class="mb-3 input p-2 rounded-xl"
/>

<div class="grid max-sm:grid-cols-1 grid-cols-3 gap-3 p-2">
	{#each Array.from(byRole.keys()) as role}
		<div>
			<div class="text-center h1 font-evercore">{role.toUpperCase()}</div>
			<div class="flex justify-center flex-wrap gap-3 variant-ghost p-4 rounded">
				{#each byRole.get(role) as hero (hero.id)}
					<a href="/heroes/{hero.id}" class="text-center">
						<Avatar
							rounded="rounded-2xl"
							border="border-4 border-surface-300-600-token hover:!border-primary-500"
							cursor="cursor-pointer"
							src="/characters/portraits/{hero.id}-portrait.png"
							width="w-32"
						/>
						{hero.name}
					</a>
				{/each}
			</div>
		</div>
	{/each}
</div>