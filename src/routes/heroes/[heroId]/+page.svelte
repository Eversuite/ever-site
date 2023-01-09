<script lang="ts">
    import type {PageData} from './$types';
    import {Heading, Img, P, Hr, Popover} from 'flowbite-svelte';

    export let data: PageData;

    $: hero = data?.hero;
    $: src = `/characters/preview/${hero.id}-preview-cropped.png`;
    $: abilities = data?.abilities;
</script>

<div class="flex flex-col">
    <div class="flex flex-wrap">
        <Img {src} size="w-full lg:w-1/3"/>
        <div class="flex gap-y-3 grow text-center flex-col">
            <Heading tag="h1">{hero.name}</Heading>
            <Heading tag="h2">{hero.role}</Heading>
            <P align="center" class="self-center max-w-md lg:max-w-2xl">{hero.description}</P>
        </div>
    </div>
    <Hr class="my-8" height="h-px"/>
    <Heading tag="h1" class="mb-3 text-center">Abilities</Heading>
    <div class="flex text-center justify-evenly">
        {#each abilities as ability}
            <div class="flex flex-col center-text items-center">
                <Img id="{ability.id}-image" src="/abilities/{ability.id}.png" size="w-32"/>
                <P class="font-bold">{ability.slot}</P>
            </div>
            <Popover class="" title="{ability.name}" triggeredBy="#{ability.id}-image">
                {@html ability.description}
            </Popover>
        {/each}
    </div>

</div>