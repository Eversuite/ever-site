<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '../theme.postcss';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

	//Skeleton stuff
	import { AppShell, AppBar, AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
	import { writable, type Writable } from 'svelte/store';
	import { page } from '$app/stores';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';

	const storeValue: Writable<number> = writable(0);
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	//Supabase stuff
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';

	import { IconCrown, IconSparkles, IconMoneybag } from '@tabler/icons-svelte';

	export let data: LayoutData;

	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => subscription.unsubscribe();
	});
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header" />
		<svelte:fragment slot="sidebarLeft">
		<AppRail selected={storeValue} width="w-60">
			<div class="sideBarContentContainer">
				<div>
					<a class="flex flex-row place-items-center p-2 bg-dark" href="/" title="Go to Homepage">
						<strong class="text-3xl uppercase header-text text-primary-600">Evercore Vault</strong>
					</a>
					<div class="sideBarContentAnchor">
						<AppRailAnchor
							regionLead="flex flex-row justify-start items-center"
							href={'/heroes'}
							selected={$page.url.pathname === '/heroes'}
						>
							<svelte:fragment slot="lead"><IconCrown size="35" /></svelte:fragment>
							<span>HEROES</span>
						</AppRailAnchor>
					</div>
					<div class="sideBarContentAnchor">
						<AppRailAnchor
							regionLead="flex justify-center"
							href={'/shards'}
							selected={$page.url.pathname === '/shards'}
						>
							<svelte:fragment slot="lead"><IconSparkles size="35" /></svelte:fragment>
							<span>SHARDS</span>
						</AppRailAnchor>
					</div>
					<div class="sideBarContentAnchor">
						<AppRailAnchor
							regionLead="flex justify-center"
							href={'/consumables'}
							selected={$page.url.pathname === '/consumables'}
						>
							<svelte:fragment slot="lead"><IconMoneybag size="35" /></svelte:fragment>
							<span>CONSUMABLES</span>
						</AppRailAnchor>
					</div>
				</div>
				<div class="p-4 text-center text-sm disclosure bg-dark">
					<p class="opacity-50">
						Evercore Vault is an unofficial fansite created by fans for fans and is not affiliated
						with or endorsed by Vela Games. All trademarks, copyrights, and other intellectual
						property related to Evercore Heroes belong to their respective owners. No copyright
						infringement is intended.
					</p>
				</div>
			</div>
		</AppRail>
	</svelte:fragment>
	<!-- Page Route Content -->
		<div class="mainContentContainer">
			<slot />
		</div>
	<svelte:fragment slot="pageFooter" />
</AppShell>

<style global lang="postcss">
	.header-text {
		font-family: 'EVERCORE';
		font-weight: 500;
		font-style: normal;
		transition: ease-in-out 0.2s all;
		@media (max-width: 1175px) {
			display: none;
		}
	}

	:global(.app-rail) {
		transition: ease-in-out 0.2s all;
		@media (max-width: 1175px) {
			width: 67px;
		}
	}

	.sideBarContentContainer {
		overflow-x: hidden;
		overflow-y: hidden;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
		background: linear-gradient(to bottom, #0e1216 0%, #0e1216 25%, #181b1f 100%),
			linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 1));
	}

	.sideBarContentAnchor {
		transition: ease-in-out 0.2s all;
		@media (max-width: 1175px) {
			width: 67px;
		}
		:global(.app-rail-wrapper) {
			aspect-ratio: inherit;
			padding: 1rem;

			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: flex-start;

			@media (max-width: 1175px) {
				width: 67px;
			}
		}

		:global(.app-rail-label) {
			font-family: 'EVERCORE';
			font-size: 1rem;
			padding-left: 1rem;

			@media (max-width: 1175px) {
				display: none;
			}
		}
	}

	.bg-dark {
		background-color: #080a0d;
	}

	.disclosure {
		transition: ease-in-out 0.2s all;
		margin-top: auto;

		@media (max-width: 1175px) {
			display: none;
		}
	}

	.mainContentContainer {
		margin: 0;
		width: 100%;
		min-height: 100vh;
		padding: 1rem;
		background: linear-gradient(to bottom, #171b21 0%, #171b21 25%, #0f1114 100%),
			linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 1));
	}
</style>
