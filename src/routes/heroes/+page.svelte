<script lang="ts">
	import type { PageData } from './$types';
	import { Hero } from '$lib/class/Hero';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let data: PageData;

	let searchTerm = '';
	$: heroes = heroFilter(data?.heroData, searchTerm);
	let groupBy = function <TItem, K>(list: TItem[], keyGetter: (TItem) => K): Map<K, TItem[]> {
		const map = new Map();
		list.forEach((item) => {
			const key = keyGetter(item);
			const collection = map.get(key);
			if (!collection) {
				map.set(key, [item]);
			} else {
				collection.push(item);
			}
		});
		return map;
	};

	$: byRole = groupBy(heroes, (hero) => hero.role);
	$: roles = Array.from(byRole.keys());

	function heroFilter(heroes: Hero[] | undefined, term: string): Hero[] {
		heroes = heroes || []; // heroes is either the defined array or an empty array

		return heroes.filter((hero) => contains(hero.name, term) || contains(hero.role, term));
	}

	function contains(source: string, term: string): boolean {
		return source.toLowerCase().indexOf(term.toLowerCase()) !== -1;
	}
</script>

<div class="grid grid-cols-{roles.length} gap-3">
	{#each roles as role}
		<div class="text-center h1">{role}</div>
	{/each}

	{#each roles as role}
		<div class="flex flex-wrap justify-center gap-3 p-4 variant-ghost rounded">
			{#each byRole.get(role) as hero (hero.id)}
				<a href="/heroes/{hero.id}" class="text-center">
					<Avatar
						border="border-4 border-surface-300-600-token hover:!border-primary-500"
						cursor="cursor-pointer"
						src="/characters/portraits/{hero.id}-portrait.png"
						width="w-32"
					/>{hero.name}
				</a>
			{/each}
		</div>
	{/each}
</div>