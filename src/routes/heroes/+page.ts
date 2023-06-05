import type { PageLoad } from './$types';
import type { Hero } from '$lib/class/Hero';

export const load: PageLoad = async ({ parent }) => {
	const { supabase } = await parent();
	const { data } = await supabase.from('heroes').select().order('name');

	return {
		heroData: data as Hero[]
	};
};
