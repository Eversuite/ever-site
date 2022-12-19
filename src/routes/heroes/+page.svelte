<script lang="ts">
    import { Avatar, Card } from "flowbite-svelte";
	import type { PageData } from "./$types";

    export let data: PageData;
    
</script>

<div class="flex flex-wrap justify-center gap-3">
    {#each data.heroData as hero (hero.id)}
    <Card padding='sm'>
        <div class="flex flex-col items-center pb-4">
            <Avatar rounded size="xl" src="https://via.placeholder.com/150" />
            <h5>{ hero.name }</h5>
        </div>
    </Card>
    {/each}
</div>
