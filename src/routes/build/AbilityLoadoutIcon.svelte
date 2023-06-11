<script lang="ts">
	import { Ability } from '$lib/class/Ability';

	export let ability: Ability;

	function resolveDescription(ab: Ability): string {
		let copy = ab.description;
		if (ab.properties) {
			for (const key of Object.keys(ab.properties)) {
				copy = copy?.replaceAll(
					'{' + key + '}',
					ab.properties[key]?.map((prop) => prop.Value).join(' | ')
				);
			}
		}
		return copy;
	}
</script>

{#if ability !== undefined}
	<!--This '#if' prevents the breaking of the entire page if no ability was found-->
	<div class="flex center-text items-center">
		<img
			draggable="false"
			id="{ability.id}-image"
			src="/abilities/{ability.id}.webp"
			alt="image for {ability.name}"
			class="w-12 h-12 border-2 rounded-lg border-surface-300-600-token hover:!border-primary-500"
		/>
	</div>
{/if}

<style>
</style>
