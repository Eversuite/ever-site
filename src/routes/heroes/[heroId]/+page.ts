import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { Talent } from '$lib/class/Talent';
import type { Hero } from '$lib/class/Hero';
import type { Ability } from '$lib/class/Ability';
import type { TalentTree } from '$lib/class/TalentTree';

export const load: PageLoad = async ({ params, parent }) => {
	const { supabase } = await parent();

	// Load the wanted character from the database.
	// May be optimised by getting the overall hero data from the parent page or a store but will do for now.
	const heroesPromise = supabase.from('heroes').select().eq('id', params.heroId).single();
	const abilitiesPromise = supabase.from('abilities').select().eq('source', params.heroId);
	const talentsPromise = supabase.from('talents').select().eq('hero', params.heroId);
	const talentTreesPromise = supabase.from('talent_trees').select().eq('source', params.heroId);

	const { hero, abilities, talents, talentTrees } = await Promise.all([
		heroesPromise,
		abilitiesPromise,
		talentsPromise,
		talentTreesPromise
	]).then((values) => {
		const hero = values[0].data as Hero;
		const abilities = values[1].data as Ability[];
		const talents = values[2].data as Talent[];
		const talentTrees = values[3].data as TalentTree[];

		return { hero, abilities, talents, talentTrees };
	});

	//TODO: This sorting is currently messy, and reversed...
	const talentTreesMap = new Map<TalentTree, Map<number, Talent[]>>();
	for (const talentTree of talentTrees) {
		const treeTalentsMap = new Map<number, Talent[]>();
		const treeTalents = talents.filter((talent) => talent.category === talentTree.id);
		for (const treeTalent of treeTalents) {
			const tierTalents = treeTalentsMap.get(treeTalent.tier) || [];
			tierTalents.push(treeTalent);
			treeTalentsMap.set(treeTalent.tier, tierTalents);
		}
		talentTreesMap.set(talentTree, treeTalentsMap);
	}

	if (hero === undefined || hero === null) {
		throw error(404, `Could not find a hero for id [${params.heroId}]`);
	}

	return {
		hero: hero as Hero,
		abilities: abilities as Ability[],
		talentsMap: talentTreesMap
	};
};
