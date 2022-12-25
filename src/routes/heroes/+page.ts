import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import type { PageLoad } from './$types';
import type { Hero } from '$lib/components/hero/HeroTypes';

export const load: PageLoad = async (event) => {
	const { supabaseClient } = await getSupabase(event);

	const { data } = await supabaseClient.from('heroes').select();

	return {
		heroData: data as Hero[]
	};
};
