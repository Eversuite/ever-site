<script lang="ts">
	import { modalStore } from '@skeletonlabs/skeleton';

	export let parent: any;

	const cButton = 'fixed top-4 right-4 z-50 font-bold shadow-xl';
</script>

{#if $modalStore[0]}
<div class="card p-4 w-modal shadow-xl space-y-4">
	<!-- Image -->
	<img src={$modalStore[0]?.image} alt="Big hero skin" />
    <footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>Close</button>
    </footer>
</div>
{/if}