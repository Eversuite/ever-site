import type { Consumable } from '$lib/class/Consumable';
import type { PageLoad } from './$types';
export const load: PageLoad = async ({ parent }) => {
	const { supabase } = await parent();

	const { data } = await supabase.from('consumables').select().order('name');

	return {
		consumableData: data as Consumable[]
	};
};
