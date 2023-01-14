import type { PageLoad } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error } from '@sveltejs/kit';
import type { Talent } from '$lib/class/Talent';
import type { Hero } from '$lib/class/Hero';
import type { Ability } from '$lib/class/Ability';

export const load: PageLoad = async (event) => {
	const { supabaseClient } = await getSupabase(event);

	// Load the wanted character from the database.
	// May be optimised by getting the overall hero data from the parent page or a store but will do for now.
	const heroesPromise = supabaseClient.from('heroes').select().eq('id', event.params.heroId).single();
	const abilitiesPromise = supabaseClient.from('abilities').select().eq('source', event.params.heroId);
	const talentsPromise = supabaseClient.from('talents').select().eq('hero', event.params.heroId);

	const { hero, abilities, talents } = await Promise.all([heroesPromise, abilitiesPromise, talentsPromise]).then(
		(values) => {
			const hero = values[0].data as Hero;
			const abilities = values[1].data as Ability[];
			const talents = values[2].data as Talent[];

			return { hero, abilities, talents };
		}
	);

	const talentsMap = new Map<string, Map<number, Talent[]>>();
	for (const talent of talents) {
		const talentCatgoryTierMap = talentsMap.get(talent.category) || new Map<number, Talent[]>();
		const talentTierList = talentCatgoryTierMap.get(talent.tier) || [];
		talentTierList.push(talent);
		talentCatgoryTierMap.set(talent.tier, talentTierList);
		talentsMap.set(talent.category, talentCatgoryTierMap);
	}

	if (hero === undefined || hero === null) {
		throw error(404, `Could not find a hero for id [${event.params.heroId}]`);
	}
	return {
		hero: hero as Hero,
		abilities: abilities as Ability[],
		talentsMap: talentsMap
	};
};
