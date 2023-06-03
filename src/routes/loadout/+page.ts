import type { PageLoad } from './$types';
import type { Hero } from '$lib/class/Hero';
import type { Shard } from '$lib/class/Shard';
import type { Consumable } from '$lib/class/Consumable';

export const load: PageLoad = async ({ parent }) => {
	const { supabase } = await parent();

	// Load the wanted character from the database.
	const [heroesResult, shardsResult, consumablesResult] = await Promise.all([
		supabase.from('heroes').select(),
		supabase.from('shards').select(),
		supabase.from('consumables').select()
	]);

	const heroes = heroesResult.data as Hero[];
	const shards = shardsResult.data as Shard[];
	const consumables = consumablesResult.data as Consumable[];

	return {
		heroes,
		shards,
		consumables
	};
};
