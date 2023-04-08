import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { Talent } from '$lib/class/Talent';
import type { Hero } from '$lib/class/Hero';
import type { Ability } from '$lib/class/Ability';

export const load: PageLoad = async ({ params, parent }) => {
	const { supabase } = await parent();

	// Load the wanted character from the database.
	// May be optimised by getting the overall hero data from the parent page or a store but will do for now.
	const heroesPromise = supabase.from('heroes').select().eq('id', params.heroId).single();
	const abilitiesPromise = supabase.from('abilities').select().eq('source', params.heroId);
	const talentsPromise = supabase.from('talents').select().eq('hero', params.heroId);

	const { hero, abilities, talents } = await Promise.all([
		heroesPromise,
		abilitiesPromise,
		talentsPromise
	]).then((values) => {
		const hero = values[0].data as Hero;
		const abilities = values[1].data as Ability[];
		const talents = values[2].data as Talent[];

		return { hero, abilities, talents };
	});

	//TODO: Sort trees
	let talentsMap = new Map<string, Map<number, Talent[]>>();
	for (const talent of talents) {
		let talentCatgoryTierMap = talentsMap.get(talent.category) || new Map<number, Talent[]>();
		const talentTierList = talentCatgoryTierMap.get(talent.tier) || [];
		talentTierList.push(talent);
		talentCatgoryTierMap.set(talent.tier, talentTierList);
		talentCatgoryTierMap = new Map([...talentCatgoryTierMap.entries()].sort());
		talentsMap.set(talent.category, talentCatgoryTierMap);
		talentsMap = new Map(
			[...talentsMap.entries()].sort(function (a, b) {
				if (a[0] == 'default') {
					return -1;
				}
				return String(a[0]).localeCompare(b[0]);
			})
		);
	}

	if (hero === undefined || hero === null) {
		throw error(404, `Could not find a hero for id [${params.heroId}]`);
	}
	return {
		hero: hero as Hero,
		abilities: abilities as Ability[],
		talentsMap: talentsMap
	};
};
