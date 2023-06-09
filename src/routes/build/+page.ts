import type { PageLoad } from './$types';
import type { Hero } from '$lib/class/Hero';
import type { Shard } from '$lib/class/Shard';
import type { Consumable } from '$lib/class/Consumable';
import type { Ability } from '$lib/class/Ability';
// import { Buffer } from 'buffer';
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

	const encodedBuild = url.searchParams.get('code');

	if (encodedBuild) {
		let build;
		if (browser) {
			build = JSON.parse(window.atob(encodedBuild));
		} else {
			build = JSON.parse(Buffer.from(encodedBuild, 'base64').toString('ascii'));
		}

		const heroId = build.heroId;
		const selectedHero = heroes.find((hero) => hero.id === heroId);

		const [abilitiesResult] = await Promise.all([
			supabase.from('abilities').select().eq('source', heroId)
		]);
		const selectedHeroAbilities = abilitiesResult.data as Ability[];

		const abilityLadder = build.abilityIds.map((id) => {
			const result = selectedHeroAbilities.find((ability) => ability.id === id);
			return result ? result : null;
		});

		const selectedConsumable = consumables.find(
			(consumable) => consumable.id === build.consumableId
		);

		const selectedShards = build.shardIds.map((id) => shards.find((shard) => shard.id === id));

		return {
			buildTitle: build.buildTitle,
			selectedHero,
			selectedHeroAbilities,
			selectedConsumable,
			selectedShards,
			abilityLadder,
			heroes,
			shards,
			consumables
		};
	}

	return {
		heroes,
		shards,
		consumables
	};
};
