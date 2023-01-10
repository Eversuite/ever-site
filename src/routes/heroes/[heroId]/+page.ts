import type { PageLoad } from './$types';
import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import { error } from '@sveltejs/kit';
import type { Hero } from '$lib/components/hero/HeroTypes';
import type { Ability } from '$lib/components/ability/AbilityType';

export const load: PageLoad = async (event) => {
	const { supabaseClient } = await getSupabase(event);

	// Load the wanted character from the database.
	// May be optimised by getting the overall hero data from the parent page or a store but will do for now.
	const { data: hero } = await supabaseClient
		.from('heroes')
		.select()
		.eq('id', event.params.heroId)
		.single();

	const { data: abilities } = await supabaseClient
		.from('abilities')
		.select()
		.eq('source', event.params.heroId);

	if (hero === undefined || hero === null) {
		throw error(404, `Could not find a hero for id [${event.params.heroId}]`);
	}
	return { hero: hero as Hero, abilities: abilities as Ability[] };
};
