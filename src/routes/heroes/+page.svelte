<script lang="ts">
  import type { PageData } from "./$types";
  import HeroCard from "$lib/components/hero/HeroCard.svelte";
  import { Hero } from "$lib/components/hero/HeroTypes";
  import { Input } from "flowbite-svelte";

  export let data: PageData;

  let searchTerm = "";
  $: heroes = heroFilter(data?.heroData, searchTerm);

  function heroFilter(heroes: Hero[], term: string): Hero[] {
    return heroes.filter((hero) => contains(hero.name, term) || contains(hero.role, term));
  }

  function contains(source: string, term: string): boolean {
    return source.toLowerCase().indexOf(term.toLowerCase()) !== -1;
  }
</script>

<!-- ml-1 and mr-1 so it doesnt fill the entire screen on mobile-->
<Input bind:value={searchTerm} type="text" placeholder="Filter through the heroes!" class="mb-3" />

<div class="flex flex-wrap justify-center gap-3">
  {#each heroes as hero (hero.id)}
    <HeroCard {hero} />
  {/each}
</div>
