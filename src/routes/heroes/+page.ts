import type { PageLoad } from './$types';
import type { Hero } from '$lib/class/Hero';
import type { Ability } from '$lib/class/Ability';

export const load: PageLoad = async ({ parent }) => {
	const { supabase } = await parent();
	const { data } = await supabase.from('heroes').select();
	const { data: abilitiesData } = await supabase.from('abilities').select();

	return {
		heroData: data as Hero[],
		abilitiesData: abilitiesData as Ability[]
	};
};
