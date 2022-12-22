import { getSupabase } from '@supabase/auth-helpers-sveltekit';
import type { PageLoad } from './$types';

export const load: PageLoad = async (event) => {
	const { supabaseClient } = await getSupabase(event);

	const { data: heroData } = await supabaseClient.from('heroes').select();

    return {
		heroData
	};

};