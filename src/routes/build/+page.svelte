<script lang="ts">
	import { modalStore, type ModalSettings, type ModalComponent } from '@skeletonlabs/skeleton';
	import ShardsPicker from './ShardsPicker.svelte';
	import ModalListSelect from './ModalListSelect.svelte';
	import ModalListStrings from './ModalListStrings.svelte';
	import type { PageData } from '../$types';
	import type { Shard } from '$lib/class/Shard';
	import type { Consumable } from '$lib/class/Consumable';
	import type { Hero } from '$lib/class/Hero';
	import type { Ability } from '$lib/class/Ability';
	import { abilitySlot } from '$lib/Utility';
	import AbilityLoadoutIcon from './AbilityLoadoutIcon.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { copyText } from 'svelte-copy';
	import ConsumableLoadoutIcon from './ConsumableLoadoutIcon.svelte';

	export let data: PageData;
	let selectedHero: Hero = data?.selectedHero ?? undefined;
	let selectedHeroAbilities: Ability[] = data?.selectedHeroAbilities ?? [];
	let abilityLadder = data?.abilityLadder ?? new Array(15).fill(null);
	let selectedConsumable: Consumable = data?.selectedConsumable ?? undefined;

	let buildTitle = data?.buildTitle ?? '';

	const borderCss =
		'border-4 rounded-2xl border-surface-300-600-token hover:!border-primary-500 cursor-pointer';

	const modalComponent: ModalComponent = {
		// Pass a reference to your custom component
		ref: ModalListSelect
	};

	const abilityValidationModalComponent: ModalComponent = {
		ref: ModalListStrings
	};

	const heroModal: ModalSettings = {
		type: 'component',
		component: modalComponent,
		title: 'Select a hero',
		meta: { items: data?.heroes, path: '/characters/portraits', searchQueries: ["name", "role"] },
		response: (hero: Hero) => heroSelected(hero)
	};

	function abilityValidationModal(messages): ModalSettings {
		return {
			type: 'component',
			component: abilityValidationModalComponent,
			title: 'Build validation issues',
			meta: { messages: messages },
			response: (accepted: boolean) => shareBuild(accepted)
		};
	}

	const consumableModal: ModalSettings = {
		type: 'component',
		component: modalComponent,
		title: 'Select a consumable',
		meta: { items: data?.consumables, path: '/consumables' },
		response: (r: Consumable) => (selectedConsumable = r)
	};

	const maxAbilityFrom1To2 = 1;
	const maxAbilityFrom3To5 = 2;
	const maxAbilityFrom6To9 = 3;
	const maxAbilityFrom10To12 = 4;
	const maxAbilityFrom13To15 = 5;
	const slotButtons = ['Q', 'W', 'E', 'R'];

	const validationMessageFormat = (message: string, slot: string, checkPoint: number) => {
		return { message, name: `${checkPoint}-${slot}` };
	};

	function validateAbilityChoice() {
		const abilityCount = [0, 0, 0, 0];
		const validityMessages = [];

		for (var i = 0; i < 15; i++) {
			if (abilityLadder[i]) {
				abilityCount[slotButtons.indexOf(abilityLadder[i].slot)]++;
			}

			if (i === 1) {
				abilityCount.forEach((count, index) => {
					if (count > maxAbilityFrom1To2) {
						validityMessages.push(
							validationMessageFormat(
								`You have more ${slotButtons[index]}s than possible at level 2 (${maxAbilityFrom1To2}).`,
								slotButtons[index],
								i
							)
						);
					}
				});
			} else if (i === 4) {
				abilityCount.forEach((count, index) => {
					if (count > maxAbilityFrom3To5) {
						validityMessages.push(
							validationMessageFormat(
								`You have more ${slotButtons[index]}s than possible at level 5 (${maxAbilityFrom3To5}).`,
								slotButtons[index],
								i
							)
						);
					}
				});

				if (abilityCount[3] >= 1) {
					validityMessages.push(
						validationMessageFormat(`You have more Rs than possible before level 6 (1).`, 'R', i)
					);
				}
			} else if (i === 8) {
				abilityCount.forEach((count, index) => {
					if (count > maxAbilityFrom6To9) {
						validityMessages.push(
							validationMessageFormat(
								`You have more ${slotButtons[index]}s than possible at level 9 (${maxAbilityFrom6To9}).`,
								slotButtons[index],
								i
							)
						);
					}
				});
			} else if (i === 11) {
				abilityCount.forEach((count, index) => {
					if (count > maxAbilityFrom10To12) {
						validityMessages.push(
							validationMessageFormat(
								`You have more ${slotButtons[index]}s than possible at level 12 (${maxAbilityFrom10To12}).`,
								slotButtons[index],
								i
							)
						);
					}
				});

				if (abilityCount[3] > 2) {
					console.log(abilityCount[3]);
					validityMessages.push(
						validationMessageFormat(`You have more Rs than possible before level 12 (2).`, 'R', i)
					);
				}
			} else if (i === 14) {
				abilityCount.forEach((count, index) => {
					if (count > maxAbilityFrom13To15) {
						validityMessages.push(
							validationMessageFormat(
								`You have more ${slotButtons[index]}s than possible at level 15 (${maxAbilityFrom13To15}).`,
								slotButtons[index],
								i
							)
						);
					}
				});
				if (abilityCount[3] > 3) {
					validityMessages.push(
						validationMessageFormat(`You have more Rs than possible at level 15 (3).`, 'R', i)
					);
				}
			}
		}

		return validityMessages;
	}

	function handleHeroClick() {
		modalStore.trigger(heroModal);
	}

	async function heroSelected(hero: Hero) {
		const [abilitiesResult] = await Promise.all([
			data.supabase.from('abilities').select().eq('source', hero.id)
		]);

		selectedHero = hero;
		selectedHeroAbilities = abilitiesResult.data as Ability[];
	}

	function setAbility(index: number, slot: string) {
		let ability = abilitySlot(selectedHeroAbilities, slot);
		if (ability.slot == 'R' && !canSkillUltimate(index)) {
			return;
		}
		abilityLadder[index] = ability;
	}

	function canSkillUltimate(index: number): boolean {
		let arr = abilityLadder.slice(0, index);
		let ultimates = 0;

		for (let ult of arr) {
			if (ult?.slot === 'R') {
				ultimates += 1;
			}
		}

		if (index >= 14) {
			return ultimates < 3;
		}

		if (index >= 11) {
			return ultimates < 2;
		}

		if (index >= 5) {
			return ultimates < 1;
		}
	}

	function handleConsumeableClick() {
		modalStore.trigger(consumableModal);
	}

	async function handleBuildClick() {
		let messages = validateAbilityChoice();
		if (messages.length === 0) {
			return shareBuild(true);
		}

		modalStore.trigger(abilityValidationModal(messages));
	}

	function shareBuild(accepted: boolean) {
		if (!accepted) return;

		let abilityLadderIds = abilityLadder.map((ability) => {
			if (ability) {
				return ability.id;
			} else {
				return null;
			}
		});
		// TODO: combine data from components (store or context maybe ?)
		// let selectedShardsIds = selectedShards.map((shard) => shard.id);
		let build = {
			buildTitle: buildTitle,
			heroId: selectedHero.id,
			abilityIds: abilityLadderIds,
			consumableId: selectedConsumable?.id
		};
		let jsonBuild = JSON.stringify(build);
		let encodedBuild = window.btoa(jsonBuild);

		$page.url.searchParams.set('code', encodedBuild);
		goto(`?${$page.url.searchParams.toString()}`);
		copyText($page.url.toString());
		validateAbilityChoice();
	}
</script>

<div class="flex flex-col flex-wrap justify-center p-8">
	<div class="b-2 text-6xl font-ardela mb-5">BUILD CREATOR</div>
	<!-- <div style="max-width: 850px;">
			Placeholder for future versions.
		</div> -->
	<div class="h3 font-evercore mb-3">BUILD TITLE*</div>
	<input
		bind:value={buildTitle}
		type="text"
		placeholder="Enter your build title here..."
		class="mb-8 input buildInput"
	/>
	<div>
		<div class="h3 font-evercore mb-3">HERO*</div>
		{#if selectedHero}
			<img
				on:click={handleHeroClick}
				alt="Image for {selectedHero.name}"
				class="w-48 h-48 {borderCss} self-center"
				src="/characters/portraits/{selectedHero.id}.webp"
				on:keyup={(e) => e.key === 'Enter' && handleHeroClick()}
			/>
		{:else}
			<div
				class="{borderCss} self-center w-48 h-48 flex flex-col items-center justify-center h3 font-evercore text-center"
				on:click={handleHeroClick}
				on:keyup={(e) => e.key === 'Enter' && handleHeroClick()}
			>
				CLICK TO CHOOSE A HERO
			</div>
		{/if}
	</div>
	<div class="flex flex-row justify-start content-center gap-x-12 flex-wrap">
		<ShardsPicker shards={data?.shards} />
		<div class="flex flex-col justify-start">
			<div class="h1 font-evercore mt-12">CONSUMABLE</div>
			<div
				on:click={() => handleConsumeableClick()}
				on:keyup={(e) => e.key === 'Enter' && handleConsumeableClick()}
			>
				<ConsumableLoadoutIcon consumable={selectedConsumable} />
			</div>
		</div>
	</div>
	{#if selectedHeroAbilities && selectedHeroAbilities.length > 0}
		<div class="h1 font-evercore mt-12">ABILITIES</div>
		<div class="flex swapToCol justify items-center mt-4">
			<div class={`flex swapToRow items-center m-4 gap-x-1 gap-1`}>
				<div class="w-12 h-12">
					<AbilityLoadoutIcon ability={abilitySlot(selectedHeroAbilities, 'P')} />
				</div>
				<div class="w-12 h-12">
					<AbilityLoadoutIcon ability={abilitySlot(selectedHeroAbilities, 'Q')} />
				</div>
				<div class="w-12 h-12">
					<AbilityLoadoutIcon ability={abilitySlot(selectedHeroAbilities, 'W')} />
				</div>
				<div class="w-12 h-12">
					<AbilityLoadoutIcon ability={abilitySlot(selectedHeroAbilities, 'E')} />
				</div>
				<div class="w-12 h-12">
					<AbilityLoadoutIcon ability={abilitySlot(selectedHeroAbilities, 'R')} />
				</div>
			</div>
			<div class="flex swapToCol">
				{#each abilityLadder as ability, index}
					<div class="flex swapToRow items-center gap-1">
						<div class="w-12 h-12 flex flex-col items-center justify-center">
							<span style="font-weight: bold; font-size: 1.2rem;">{index + 1}</span>
						</div>
						{#each ['Q', 'W', 'E', 'R'] as slot, slotIndex}
							<div
								on:click={() => setAbility(index, slot)}
								on:keyup={(e) => e.key === 'Enter' && setAbility(index, slot)}
								style="border-radius: 4px;"
								class="w-12 h-12 border-2 border-surface-300-600-token hover:!border-primary-500 flex flex-col items-center justify-center mr-2"
							>
								{#if ability?.slot === slot}
									<span style="font-weight: bold; font-size: 1.5rem;" class={`ability${slot}`}
										>{ability.slot}</span
									>
								{/if}
							</div>
						{/each}
					</div>
				{/each}
			</div>
			<div />
		</div>
	{/if}

	<button on:click={handleBuildClick} type="button" class="btn variant-filled mt-12">
		<span>Copy shareable link</span>
	</button>
</div>

<style global lang="postcss">
	.buildInput {
		max-width: 380px;
		border-radius: 14px;
	}

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
