<script lang="ts">
    import {Avatar, Card} from "flowbite-svelte";

    export let hero: any;
</script>


<Card padding="none" href="/heroes/{hero.id}">
    <div class="flex flex-col items-center pb-4">
        <Avatar rounded size="xl" src="/character-portraits/{hero.id}-portrait.png" />
        <h5 class="text-base font-semibold">{ hero.name }</h5>
        <h6 class="text-xs">{ hero.role }</h6>
    </div>
</Card>