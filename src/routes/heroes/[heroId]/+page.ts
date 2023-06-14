import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { Talent } from '$lib/class/Talent';
import type { Hero } from '$lib/class/Hero';
import type { Ability } from '$lib/class/Ability';
import type { TalentTree } from '$lib/class/TalentTree';

export const load: PageLoad = async ({ params, parent }) => {
	const { supabase } = await parent();

	// Load the wanted character from the database.
	const [heroesResult, abilitiesResult, talentsResult, talentTreesResult] = await Promise.all([
		supabase.from('heroes').select().eq('id', params.heroId).single(),
		supabase.from('abilities').select().eq('source', params.heroId),
		supabase.from('talents').select().eq('hero', params.heroId),
		supabase.from('talent_trees').select().eq('source', params.heroId)
	]);

	if (heroesResult.error) throw error(404, `Could not find a hero for id [${params.heroId}]`);

	const hero = heroesResult.data as Hero;
	const abilities = abilitiesResult.data as Ability[];
	const talents = talentsResult.data as Talent[];
	const talentTrees = talentTreesResult.data as TalentTree[];

	// Sort talentTrees with "Default" first, then alphabetically
	talentTrees.sort((a, b) => {
		if (a.name === 'Default') return -1;
		if (b.name === 'Default') return 1;
		return a.name.localeCompare(b.name);
	});

	const talentTreesMap = new Map<TalentTree, Map<number, Talent[]>>();

	for (const talentTree of talentTrees) {
		const treeTalentsMap = new Map<number, Talent[]>();
		const treeTalents = talents.filter((talent) => talent.category === talentTree.id);

		for (const treeTalent of treeTalents) {
			const tierTalents = treeTalentsMap.get(treeTalent.tier) || [];
			tierTalents.push(treeTalent);
			tierTalents.sort((a, b) => a.name - b.name); // sort tierTalents by id
			treeTalentsMap.set(treeTalent.tier, tierTalents);
		}

		// Sort treeTalentsMap by tier
		const sortedTreeTalentsMap = new Map([...treeTalentsMap.entries()].sort((a, b) => a[0] - b[0]));
		talentTreesMap.set(talentTree, sortedTreeTalentsMap);
	}

	return {
		hero,
		abilities,
		talents: Array.from(talentTreesMap)
	};
};
