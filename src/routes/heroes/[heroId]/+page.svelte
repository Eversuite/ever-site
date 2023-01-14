<script lang="ts">
	import type { PageData } from './$types';
	import { Heading, Img, P, Hr } from 'flowbite-svelte';
	import AbilityIcon from '$lib/components/ability/AbilityIcon.svelte';
	import { Ability } from '$lib/components/ability/AbilityType';

  export let data: PageData;

  $: hero = data?.hero;
  $: src = `/characters/preview/${hero.id}-preview-cropped.png`;
  $: abilities = data?.abilities;
  $: talentsMap = data?.talentsMap;

  function abilitySlot(abilities: Ability[], slot: string): Ability {
    return abilities
      // We want to ignore every ability where the slot is unknown.
      .filter(ab => ab.slot != undefined || ab.slot != null)
      .find((ability) => ability.slot.toUpperCase() === slot.toUpperCase());
  }
</script>

<div class="flex flex-col">
  <div class="flex flex-wrap">
    <Img {src} size="w-full lg:w-1/3" />
    <div class="flex gap-y-3 grow text-center flex-col">
      <Heading tag="h1">{hero.name}</Heading>
      <Heading tag="h2">{hero.role}</Heading>
      <P align="center" class="self-center max-w-md lg:max-w-2xl">{hero.description}</P>
    </div>
  </div>
  <Hr class="my-8" height="h-px" />
  <Heading tag="h1" class="mb-3 text-center">Abilities</Heading>
  <div class="flex text-center justify-evenly">
    <AbilityIcon ability={abilitySlot(abilities, 'P')} />
    <AbilityIcon ability={abilitySlot(abilities, 'Q')} />
    <AbilityIcon ability={abilitySlot(abilities, 'W')} />
    <AbilityIcon ability={abilitySlot(abilities, 'E')} />
    <AbilityIcon ability={abilitySlot(abilities, 'R')} />
  </div>
  <div>
    <Heading tag="h1" class="mb-3 text-center">Talents</Heading>
    {#each [...talentsMap] as [category, talents]}
      <Heading tag="h2" class="mb-3 text-center">{category}</Heading>
      <div class="flex flex-wrap justify-evenly">
        {#each talents as talent}
          <p>{talent.name}</p>
        {/each}
      </div>
    {/each}
  </div>
</div>