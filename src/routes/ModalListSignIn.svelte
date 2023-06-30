<script lang="ts">
	import { modalStore } from '@skeletonlabs/skeleton';
	import { IconMail } from '@tabler/icons-svelte';

	export let parent: any;
	const supabase = $modalStore[0].meta.supabase;
	const authenticated = $modalStore[0].meta.authenticated;
	async function discordSignIn() {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'discord'
		});
	}

	async function magicLinkSignIn() {
		const { data, error } = await supabase.auth.signInWithOtp({
			email: 'cian.lawlor@gmail.com',
			options: {
				emailRedirectTo: 'http://localhost:5173/'
			}
		});
	}

	async function signOut() {
		const { error } = await supabase.auth.signOut()
		
		if($modalStore[0].response && !error){
			$modalStore[0].response("logout");
			modalStore.close();
		}
	}

	// Base Classes
	const cBase = `modalCard p-4 w-modal space-y-4 ${authenticated? "max-w-[360px!important]": ""}`;
	const cBaseStyle = 'max-height: 30vh; justify-content: space-evenly;';
	const cHeader = 'text-2xl font-ardela text-center';
</script>

{#if $modalStore[0]}
	<div class={cBase}>
		<header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
		<div style={cBaseStyle} class="flex flex-row">
			{#if !authenticated}
				<button
					class="flex flex-col items-center justify-center text-center"
					on:click={discordSignIn}
					on:keyup={(e) => e.key === 'Enter' && discordSignIn()}
				>
					<img alt="Discord signin option" src="/nav-icons/discord.svg" class="w-24" />
					<p class="text-lg font-bold text-center">Discord</p>
				</button>
				<!-- <button
					class="flex flex-col items-center justify-center text-center"
					on:click={magicLinkSignIn}
					on:keyup={(e) => e.key === 'Enter' && magicLinkSignIn()}
				>
					<IconMail size="6rem" />
					<p class="text-lg font-bold text-center">Email</p>
				</button> -->
			{:else}
				<button
					class="flex flex-col items-center justify-center text-center"
					on:click={parent.onClose}
					on:keyup={(e) => e.key === 'Enter' && parent.onClose}
				>
					<p class="text-lg font-bold text-center">No</p>
				</button>
				<button
					class="flex flex-col items-center justify-center text-center"
					on:click={signOut}
					on:keyup={(e) => e.key === 'Enter' && signOut()}
				>
					<p class="text-lg font-bold text-center">Yes</p>
				</button>
			{/if}
		</div>
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

	button :global(.modalSelected) {
		border-color: #3ab0ca !important;
		border-width: 2.5px;
	}
</style>
