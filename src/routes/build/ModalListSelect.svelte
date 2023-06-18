<script lang="ts">
	import { Avatar, ListBox, ListBoxItem, modalStore } from '@skeletonlabs/skeleton';
	import ModalListItem from './ModalListItem.svelte';
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { popup } from '@skeletonlabs/skeleton';
	// Props
	/** Exposes parent props to this component. */
	export let parent: any;

	let searchTerm = '';
	$: items = itemFilter(searchTerm);
	const searchQueries = $modalStore[0].meta.searchQueries;
	function itemFilter(term: string): any[] {
		return ($modalStore[0].meta.items || []).filter((item) => !searchQueries || searchQueries.length === 0 || searchQueries.some((query:string) => item[query] && contains(item[query], term)));
	}

	function contains(source: string, term: string): boolean {
		return source.toLowerCase().indexOf(term.toLowerCase()) !== -1;
	}

	// Local
	let selectedItem = $modalStore[0].meta.items[0];

	// Handle Form Submission
	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response(selectedItem);
		modalStore.close();
	}

	const getConsumablePopup = (index: number): PopupSettings => {
		return {
			event: 'hover',
			target: `modal-popup-${index}`,
			placement: 'top'
		};
	};

	// Base Classes
	const cBase = 'modalCard p-4 w-modal space-y-4';
	const cBaseStyle = 'max-height: 40vh; overflow-y: scroll;';
	const cHeader = 'text-2xl font-ardela text-center';
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
		{#if searchQueries && searchQueries.length > 0}
			<input bind:value={searchTerm} type="text" placeholder="Filter" class="mb-8 input" />
		{/if}
		<div style={cBaseStyle}>
			{#if items}
				<ListBox class="flex flex-row flex-wrap justify-evenly">
					{#each items as item, index}
						<div use:popup={getConsumablePopup(index)}>
							<ListBoxItem bind:group={selectedItem} name={item.name} value={item}>
								<div
									class="flex flex-col items-center justify-center text-center"
									use:popup={getConsumablePopup(index)}
								>
									<Avatar
										rounded="rounded-xl"
										border="border-2 border-surface-300-600-token"
										cursor="cursor-pointer"
										src="{$modalStore[0].meta.path}/{item.id}.webp"
										width="w-12"
									/>
								</div>
							</ListBoxItem>
							<div data-popup={`modal-popup-${index}`} class="card p-1">
								<p class="text-lg font-bold text-center">{item?.name}</p>
							</div>
						</div>
					{/each}
				</ListBox>
			{/if}
		</div>
		<!-- prettier-ignore -->
		<footer class="modal-footer flex flex-row justify-center gap-2 {parent.regionFooter}">
        <button class="btn modalButton {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <button class="btn modalButton {parent.buttonPositive}" on:click={onFormSubmit}>Select</button>
    </footer>
	</div>
{/if}

<style>
	.modalCard {
		background: linear-gradient(to bottom, #0e1216 0%, #0e1216 25%, #181b1f 100%),
			linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 1));
	}

	.modalButton {
		background-color: #1e5e6d;
		border: 2px solid #b7d4e9;
		border-radius: 4px;
		color: white;
	}
</style>
