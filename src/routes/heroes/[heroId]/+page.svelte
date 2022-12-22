<script lang="ts">
    import HeroCard from "$lib/components/hero/HeroCard.svelte";

    export let data;
</script>


<div class="flex flex-wrap justify-left gap-3">
    <HeroCard hero="{data.hero}"/>
</div>

<p>Placeholder for {data.hero?.id} detail view</p>