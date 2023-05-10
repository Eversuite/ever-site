import type { Shard } from '$lib/class/Shard';
import type { PageLoad } from './$types';
export const load: PageLoad = async ({ parent }) => {
	const { supabase } = await parent();

	const { data } = await supabase.from('shards').select();

	return {
		shardData: data as Shard[]
	};
};
