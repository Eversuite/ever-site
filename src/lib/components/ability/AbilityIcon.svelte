<script lang="ts">
  import { Img, P, Popover } from 'flowbite-svelte';
  import { Ability } from '$lib/components/ability/AbilityType';

  export let ability: Ability;

  function resolveDescription(ab: Ability): string {
    let copy = ab.description

    for(const key of Object.keys(ab.properties))
    {
      copy = copy?.replaceAll("{"+key+"}", ab.properties[key]?.map(prop=> prop.Value).join(" - "))
    }
    return copy
  }

</script>

{#if ability !== undefined} <!--This '#if' prevents the breaking of the entire page if no ability was found-->
  <div class="flex flex-col center-text items-center">
    <Img id="{ability.id}-image" src="/abilities/{ability.id}.png" size="w-32 h-32" class="border border-black" />
    <P class="font-bold">{ability.name}</P>
  </div>
  <Popover class="max-w-xl" title={ability.name} triggeredBy="#{ability.id}-image">
    {@html resolveDescription(ability)}
  </Popover>
{/if}
