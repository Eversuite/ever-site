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
	// Should probably do a "promise.all" here
	const { data: hero } = await supabaseClient
		.from('heroes')
		.select()
		.eq('id', event.params.heroId)
		.single();

	const { data: abilities } = await supabaseClient
		.from('abilities')
		.select()
		.eq('source', event.params.heroId);

	const { data: talents } = await supabaseClient
		.from('talents')
		.select()
		.eq('hero', event.params.heroId);

	const talentsMap = new Map<string, Talent[]>();
	for (let talent of talents) {
		const talentList = talentsMap.get(talent.category) || [];
		talentList.push(talent);
		talentsMap.set(talent.category, talentList);
	}
	console.log(talentsMap);

	if (hero === undefined || hero === null) {
		throw error(404, `Could not find a hero for id [${event.params.heroId}]`);
	}
	return { hero: hero as Hero, abilities: abilities as Ability[], talentsMap: talentsMap };
};
