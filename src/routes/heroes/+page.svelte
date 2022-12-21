<script lang="ts">
    import type {PageData} from "./$types";
    import HeroCard from "../../components/hero/HeroCard.svelte";

    export let data: PageData;
    
</script>

<div class="flex flex-wrap justify-center gap-3">
    {#each data.heroData as hero (hero.id)}
        <HeroCard {hero}/>
    {/each}
</div>