import type { PageLoad } from './$types';
import type { Hero } from '$lib/class/Hero';
import type { Shard } from '$lib/class/Shard';
import type { Consumable } from '$lib/class/Consumable';
import type { Ability } from '$lib/class/Ability';

export const load: PageLoad = async ({ params, parent }) => {
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

	const encodedBuild = await supabase.from('builds').select().eq('url-id', params.buildURL).single();

	if (encodedBuild) {
		let build = encodedBuild.data;

		const heroId = build.hero;
		const selectedHero = heroes.find((hero) => hero.id === heroId);

		const [abilitiesResult] = await Promise.all([
			supabase.from('abilities').select().eq('source', heroId)
		]);
		const selectedHeroAbilities = abilitiesResult.data as Ability[];

		const abilityLadder = build.abilities.map((id) => {
			const result = selectedHeroAbilities.find((ability) => ability.id === id);
			return result ? result : null;
		});

		const selectedConsumable = consumables.find(
			(consumable) => consumable.id === build.consumables
		);

		const selectedShards = build.shards.map((id) => shards.find((shard) => shard.id === id));

		return {
			buildTitle: build.title,
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
