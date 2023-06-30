import type { PageLoad } from './$types';
import type { Hero } from '$lib/class/Hero';
import type { Build } from '$lib/class/Build';
import type { Consumable } from '$lib/class/Consumable';

export const load: PageLoad = async ({ parent, url }) => {
	const { supabase } = await parent();
	// Load the wanted character from the database.
	const [heroesResult, shardsResult, consumablesResult, foundBuilds] = await Promise.all([
		supabase.from('heroes').select().order('name'),
		supabase.from('shards').select().order('name'),
		supabase.from('consumables').select().order('name'),
		supabase.from('builds').select()
	]);

	const heroes = heroesResult.data as Hero[];
	const consumables = consumablesResult.data as Consumable[];
	const builds = foundBuilds.data as Build[]
	// const shards = shardsResult.data as Shard[];

	return {
		heroes,
		consumables,
		builds
	};
};
