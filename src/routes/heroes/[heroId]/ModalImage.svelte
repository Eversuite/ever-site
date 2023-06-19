<script lang="ts">
	import { modalStore } from '@skeletonlabs/skeleton';

	export let parent: any;

	const cButton = 'fixed top-4 right-4 z-50 font-bold shadow-xl';
</script>

{#if $modalStore[0]}
<div class="modalCard p-4 w-modal space-y-4">
	<!-- Image -->
	<img src={$modalStore[0]?.image} alt="Big hero skin" />
    <footer class="modal-footer {parent.regionFooter}">
        <button class="btn modalButton {parent.buttonNeutral}" on:click={parent.onClose}>Close</button>
    </footer>
</div>
{/if}

<style lang="postcss" >

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