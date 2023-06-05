import type { PageLoad } from './$types';
import type { Hero } from '$lib/class/Hero';
import type { Shard } from '$lib/class/Shard';
import type { Consumable } from '$lib/class/Consumable';
import type { Ability } from '$lib/class/Ability';
import { browser } from '$app/environment'; 

export const load: PageLoad = async ({ parent, url }) => {
	const { supabase } = await parent();

	// Load the wanted character from the database.
	const [heroesResult, shardsResult, consumablesResult] = await Promise.all([
		supabase.from('heroes').select().order('name'),
		supabase.from('shards').select().order('name'),
		supabase.from('consumables').select().order('name')
	]);

	const heroes = heroesResult.data as Hero[];
	const shards = shardsResult.data as Shard[];
	const consumables = consumablesResult.data as Consumable[];
	
	const encodedLoadout = url.searchParams.get('build')
	
	if(encodedLoadout) {
		let loadout;
		if (browser) {
			loadout = JSON.parse(window.atob(encodedLoadout))
		} else {
			loadout = JSON.parse(Buffer.from(encodedLoadout, 'base64').toString('ascii'));
		}

		
		const heroId = loadout.heroId
		const selectedHero = heroes.find(hero => hero.id === heroId)

		const [abilitiesResult] = await Promise.all([
			supabase.from('abilities').select().eq('source', heroId)
		]);
		const selectedHeroAbilities = abilitiesResult.data as Ability[]

		const abilityLadder = loadout.abilityIds
		.map(id => {
			const result = selectedHeroAbilities.find(ability => ability.id === id)
			return result ? result : null
		})

		const selectedConsumable = consumables.find(consumable => consumable.id === loadout.consumableId)

		const selectedShards = loadout.shardIds.map(id => shards.find(shard => shard.id === id))

		return {
			selectedHero,
			selectedHeroAbilities,
			selectedConsumable,
			selectedShards,
			abilityLadder,
			heroes,
			shards,
			consumables
		}
	}

	return {
		heroes,
		shards,
		consumables
	};


	
};
