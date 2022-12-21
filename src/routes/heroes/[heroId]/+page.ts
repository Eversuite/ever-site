import type {PageLoad} from "./$types";
import {getSupabase} from "@supabase/auth-helpers-sveltekit";
import {error} from "@sveltejs/kit";


export const load: PageLoad = async (event) => {
    const {supabaseClient} = await getSupabase(event);

    // Load the wanted character from the database.
    // May be optimised by getting the overall hero data from the parent page or a store but will do for now.
    const {data: hero} = await supabaseClient
        .from('heroes')
        .select()
        .eq("id", event.params.heroId)
        .single();

    if (hero === undefined || hero === null) {
        throw error(404, `Could not find a hero for id [${event.params.heroId}]`)
    }
    return {hero};

};