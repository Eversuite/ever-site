<script lang="ts">
	import type { AbilitySlot } from './types';
	import type { PageData } from '../$types';

	const abilitySlots: AbilitySlot[] = ['Q', 'W', 'E', 'R'];

	let selectedAbilities: string[] = [];

	$: lastSelectedAbilityIndex = selectedAbilities.length - 1;
	$: lastSelectedAbilitySlot = selectedAbilities[lastSelectedAbilityIndex];

	function getAbilitySlotQuantity(slot: AbilitySlot): number {
		return selectedAbilities.filter((ability) => ability === slot).length;
	}

	function selectAbility(id: number, slot: AbilitySlot) {
		// remove last ability (do not need validation)
		if (slot === selectedAbilities[id] && id === lastSelectedAbilityIndex) {
			selectedAbilities = [...selectedAbilities.slice(0, lastSelectedAbilityIndex)];
			return;
		}

		const abilitySlotQuantity = getAbilitySlotQuantity(slot);

		// Abilities threshold validation
		if (abilitySlotQuantity >= 5) {
			console.warn('You cant level up ability more than 5 times');
			return;
		}

		if (
			lastSelectedAbilitySlot === slot ||
			selectedAbilities[id - 1] === slot ||
			selectedAbilities[id + 1] === slot
		) {
			console.warn('You cant level up same ability again');
			return;
		}

		// Ultimate threshold logic
		if (slot === 'R') {
			if (abilitySlotQuantity === 3) {
				console.warn('You cant level up ability more than 3 times');
			}
			if (lastSelectedAbilityIndex < 4 || id <= 4) {
				console.warn('You can level up ultimate on level 6');
				return;
			}
			if ((lastSelectedAbilityIndex < 10 || id <= 10) && abilitySlotQuantity === 1) {
				console.warn('You can level up ultimate on level 12');
				return;
			}
			if ((lastSelectedAbilityIndex < 13 || id <= 13) && abilitySlotQuantity === 2) {
				console.warn('You can level up ultimate on level 15');
				return;
			}
		}

		// Abilities adding / switching (actions after sucessful validation)
		if (id <= lastSelectedAbilityIndex) {
			selectedAbilities[id] = slot;
			return;
		}

		selectedAbilities = [...selectedAbilities, slot];
	}
</script>

<div class="flex swapToCol">
	{#each { length: 15 } as _, index}
		<div class="flex swapToRow items-center gap-1">
			<div class="w-12 h-12 flex flex-col items-center justify-center">
				<span class="font-bold text-[1.2rem]">
					{index + 1}
				</span>
			</div>
			{#each abilitySlots as slot}
				<button
					class="w-12 h-12 border-2 rouneded-[4px] border-surface-300-600-token hover:!border-primary-500 flex flex-col items-center justify-center mr-2"
					on:click={() => selectAbility(index, slot)}
					on:keyup={(e) => e.key === 'Enter' && selectAbility(index, slot)}
				>
					{#if selectedAbilities[index] === slot}
						<span style="font-weight: bold; font-size: 1.5rem;" class={`ability${slot}`}>
							{slot}
						</span>
					{/if}
				</button>
			{/each}
		</div>
	{/each}
</div>

<style global lang="postcss">
	.abilityQ {
		color: #3fa6d2;
	}

	.abilityW {
		color: #d23f51;
	}

	.abilityE {
		color: #803fd2;
	}

	.abilityR {
		color: #dfaf51;
	}

	.swapToRow {
		flex-direction: column;
		@media (max-width: 940px) {
			flex-direction: row;
		}
	}

	.swapToCol {
		flex-direction: row;
		@media (max-width: 940px) {
			flex-direction: column;
		}
	}
</style>
