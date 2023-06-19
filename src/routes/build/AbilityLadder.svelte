<script lang="ts">
	import type { AbilitySlot } from './types';
	import type { Ability } from '$lib/class/Ability';

	// import ModalListStrings from './ModalListStrings.svelte';

	export let selectedAbilities: string[] = [];

	const abilitySlots: AbilitySlot[] = ['Q', 'W', 'E', 'R'];

	$: heroLevel = selectedAbilities.length;
	$: lastSelectedAbilityIndex = heroLevel - 1;

	function getHeroAbilityLevelThreshold(): number {
		if (heroLevel <= 2) return 1;
		if (heroLevel <= 5) return 2;
		if (heroLevel <= 9) return 3;
		if (heroLevel <= 12) return 4;
		return 5;
	}

	function getHeroUltimateLevelThreshold(): number {
		if (heroLevel <= 6) return 1;
		if (heroLevel <= 12) return 2;
		return 3;
	}

	function getAbilityCurrentLevel(slot: AbilitySlot): number {
		return selectedAbilities.filter((ability) => ability === slot).length;
	}

	function getAbilityLevelInScope(slot: AbilitySlot, levelScope: number) {
		return selectedAbilities.slice(0, levelScope).filter((ability) => ability === slot).length;
	}

	function clickAbility(id: number, slot: AbilitySlot) {
		// Remove last ability
		if (slot === selectedAbilities[id] && id === lastSelectedAbilityIndex) {
			selectedAbilities = [...selectedAbilities.slice(0, lastSelectedAbilityIndex)];
			return;
		}
		if (id <= lastSelectedAbilityIndex) {
			// Switch ability validation
			if (slot === 'R') {
				switchUltimate(id, slot);
			} else {
				switchAbility(id, slot);
			}
		} else {
			// Select ability validation
			if (slot === 'R') {
				selectUltimate(id, slot);
			} else {
				selectAbility(id, slot);
			}
		}
	}

	function selectAbility(id: number, slot: AbilitySlot) {
		const abilityCurrentLevel = getAbilityCurrentLevel(slot);

		if (abilityCurrentLevel === 5) {
			console.warn('You cant level up ability more than 5 times');
			return;
		}
		if (heroLevel < 2 && abilityCurrentLevel === 1) {
			console.warn('You can level up this ability on level 3');
			return;
		}
		if (heroLevel < 5 && abilityCurrentLevel === 2) {
			console.warn('You can level up this ability on level 6');
			return;
		}
		if (heroLevel < 9 && abilityCurrentLevel === 3) {
			console.warn('You can level up this ability on level 10');
			return;
		}
		if (heroLevel < 12 && abilityCurrentLevel === 4) {
			console.warn('You can level up this ability on level 13');
			return;
		}

		selectedAbilities = [...selectedAbilities, slot];
	}

	function selectUltimate(id: number, slot: AbilitySlot) {
		const abilityCurrentLevel = getAbilityCurrentLevel(slot);
		if (abilityCurrentLevel === 3) {
			console.warn('You cant level up ability more than 3 times');
			return;
		}
		if (heroLevel < 5) {
			console.warn('You can level up ultimate on level 6');
			return;
		}
		if (heroLevel < 11 && abilityCurrentLevel === 1) {
			console.warn('You can level up ultimate on level 12');
			return;
		}
		if (heroLevel < 14 && abilityCurrentLevel === 2) {
			console.warn('You can level up ultimate on level 15');
			return;
		}
		selectedAbilities = [...selectedAbilities, slot];
	}

	function switchAbility(id: number, slot: AbilitySlot) {
		const heroAbilityLevelThreshold = getHeroAbilityLevelThreshold();
		const abilityCurrentLevel = getAbilityCurrentLevel(slot);

		if (abilityCurrentLevel === heroAbilityLevelThreshold) {
			console.warn('You cant level up ability on this level');
			return;
		}
		if (id < 2) {
			const selectedAbilityScope = getAbilityLevelInScope(slot, 2);
			if (selectedAbilityScope === 1) {
				console.warn('You cant level up this ability in this scope');
				return;
			}
		}
		if (id < 5) {
			const selectedAbilityScope = getAbilityLevelInScope(slot, 5);
			if (selectedAbilityScope === 2) {
				console.warn('You cant level up this ability in this scope');
				return;
			}
		}
		if (id < 9) {
			const selectedAbilityScope = getAbilityLevelInScope(slot, 9);
			if (selectedAbilityScope === 3) {
				console.warn('You cant level up this ability in this scope');
				return;
			}
		}
		if (id < 12) {
			const selectedAbilityScope = getAbilityLevelInScope(slot, 12);
			if (selectedAbilityScope === 4) {
				console.warn('You cant level up this ability in this scope');
				return;
			}
		}
		selectedAbilities[id] = slot;
	}

	function switchUltimate(id: number, slot: AbilitySlot) {
		const heroAbilityLevelThreshold = getHeroUltimateLevelThreshold();
		const abilityCurrentLevel = getAbilityCurrentLevel(slot);

		if (abilityCurrentLevel === heroAbilityLevelThreshold) {
			console.warn('You cant level up ability on this level');
			return;
		}
		if (id < 5) {
			console.warn('You cant level up ultimate in this scope');
			return;
		}
		if (id < 11) {
			const selectedAbilityScope = getAbilityLevelInScope(slot, 11);
			if (selectedAbilityScope === 1) {
				console.warn('You cant level up ultimate in this scope');
				return;
			}
		}
		if (id < 14) {
			const selectedAbilityScope = getAbilityLevelInScope(slot, 14);
			if (selectedAbilityScope === 2) {
				console.warn('You cant level up ultimate in this scope');
				return;
			}
		}
		selectedAbilities[id] = slot;
	}

	// TODO: make it free to add abilites everywhere but validate at the end ?

	// const abilityValidationModalComponent: ModalComponent = {
	// 	ref: ModalListStrings
	// };

	// async function handleBuildClick() {
	// 	let messages = validateAbilityChoice();
	// 	if (messages.length === 0) {
	// 		return shareBuild(true);
	// 	}

	// 	modalStore.trigger(abilityValidationModal(messages));
	// }

	// function abilityValidationModal(messages): ModalSettings {
	// 	return {
	// 		type: 'component',
	// 		component: abilityValidationModalComponent,
	// 		title: 'Build validation issues',
	// 		meta: { messages: messages },
	// 		response: (accepted: boolean) => shareBuild(accepted)
	// 	};
	// }
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
					on:click={() => clickAbility(index, slot)}
					on:keyup={(e) => e.key === 'Enter' && clickAbility(index, slot)}
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
