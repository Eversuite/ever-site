<script lang="ts">
	import { IconMathGreater } from '@tabler/icons-svelte';
	import type { Shard } from '$lib/class/Shard';
	import ShardLoadoutIcon from './ShardLoadoutIcon.svelte';

	export let shards: Shard[];
	export let selectedShards: (Shard | null)[];


</script>

<div class="flex flex-col">
	<div class="h1 font-evercore mt-12">SHARDS</div>
	<div class="flex flex-row items-center flex-wrap">
		{#each selectedShards as shard, index}
			<div
			>
				<ShardLoadoutIcon {shard} readOnly/>
			</div>
			{#if index !== 4}
				<IconMathGreater class="w-10 h-10" />
			{/if}
		{/each}
	</div>
	<div class="flex flex-row flex-wrap w-[35vw] gap-4 items-center self-center" />
</div>

<style global lang="postcss">
</style>
