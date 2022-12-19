<script lang="ts">
    import { Avatar, Card, Heading } from "flowbite-svelte";
	import type { PageData } from "./$types";

    export let data: PageData;
    
</script>

<div class="flex flex-wrap justify-center gap-3">
    {#each data.heroData as hero (hero.id)}
    <Card padding="none">
        <div class="flex flex-col items-center pb-4">
            <Avatar rounded size="xl" src="./character-portraits/{hero.id}-portrait.png" />
            <h5 class="text-base font-semibold">{ hero.name }</h5>
            <h6 class="text-xs">{ hero.role }</h6>
        </div>
    </Card>
    {/each}
</div>
