<script lang="ts">
	import { Avatar, ListBox, ListBoxItem, modalStore } from '@skeletonlabs/skeleton';
	import ModalListItem from './ModalListItem.svelte';
	import type { Shard } from '$lib/class/Shard';

	// Props
	/** Exposes parent props to this component. */
	export let parent: any;

	const selectedItemIndex = $modalStore[0].meta.items.findIndex(
		(item: Shard) => item.id === $modalStore[0].meta.selectedItemId
	);

	// Local
	let selectedItem =
		selectedItemIndex >= 0
			? $modalStore[0].meta.items[selectedItemIndex]
			: $modalStore[0].meta.items[0];

	// Handle Form Submission
	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response(selectedItem);
		modalStore.close();
	}

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-ardela text-center';
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
		<ListBox class="border border-surface-500 p-4 max h-[40vh] overflow-y-auto">
			{#each $modalStore[0].meta.items as item}
				<ListBoxItem bind:group={selectedItem} name={item.name} value={item}>
					<svelte:fragment slot="lead">
						<Avatar
							rounded="rounded-xl"
							border="border-2 border-surface-300-600-token"
							cursor="cursor-pointer"
							src="{$modalStore[0].meta.path}/{item.id}.webp"
							width="w-12"
						/>
					</svelte:fragment>
					{item.name}
					<svelte:fragment slot="trail">
						<ModalListItem {item} />
					</svelte:fragment>
				</ListBoxItem>
			{/each}
		</ListBox>
		<!-- prettier-ignore -->
		<footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>Select</button>
    </footer>
	</div>
{/if}
