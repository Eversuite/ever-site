<script lang="ts">
	import { modalStore } from '@skeletonlabs/skeleton';

	export let parent: any;

	const cButton = 'fixed top-4 right-4 z-50 font-bold shadow-xl';
	const cImage = 'max-w-[80%] max-h-[90%]';
</script>

{#if $modalStore[0]}
<div class="card p-4 w-modal shadow-xl space-y-4">
	<!-- Image -->
	<img src={$modalStore[0]?.image} class={cImage} alt="Big hero skin" />
    <footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>Close</button>
    </footer>
</div>
{/if}