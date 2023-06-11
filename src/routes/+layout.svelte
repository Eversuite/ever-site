<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '../theme.postcss';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

	//Skeleton stuff
	import { AppShell, AppBar, AppRail, AppRailAnchor, Modal } from '@skeletonlabs/skeleton';
	import { writable, type Writable } from 'svelte/store';
	import { page } from '$app/stores';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';

	const storeValue: Writable<number> = writable(0);
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	const heroTileUrl = '/heroes';
	const shardTileUrl = '/shards';
	const consumableTileUrl = '/consumables';

	//Supabase stuff
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';

	import { IconCrown, IconSparkles, IconMoneybag, IconHammer } from '@tabler/icons-svelte';

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

<Modal />

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header" />
		<svelte:fragment slot="sidebarLeft">
		<AppRail selected={storeValue} width="w-60">
			<div class="sideBarContentContainer">
				<div>
					<a class="flex flex-row place-items-center p-2 bg-dark" href="/" title="Go to Homepage">
						<img alt="heroes-nav-icon" src="/logo/ECV-Logo-Transparent.png" width="60px" height="60px"/>
						<strong class="text-3xl uppercase header-text text-primary-600">Evercore Vault</strong>
					</a>
					<div class="sideBarContentAnchor">
						<AppRailAnchor
							regionLead="flex flex-row justify-start items-center"
							href={'/heroes'}
							selected={$page.url.pathname === '/heroes'}
						>
							<svelte:fragment slot="lead">
								<svg width="38" height="39" viewBox="0 0 38 39">
								<rect x="0.313232" y="0.923279" width="37.1486" height="37.1486" fill="url(#pattern0)"/>
								<defs>
								<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
								<use xlink:href="#image0_26_30" transform="scale(0.0104167)"/>
								</pattern>
								<image id="image0_26_30" width="96" height="96" xlink:href="data:image/png;base64,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"/>
								</defs>
								</svg>
								</svelte:fragment>
							<span>HEROES</span>
						</AppRailAnchor>
					</div>
					<div class="sideBarContentAnchor">
						<AppRailAnchor
							regionLead="flex justify-center"
							href={'/shards'}
							selected={$page.url.pathname === '/shards'}
						>
							<svelte:fragment slot="lead"><img alt="shards-nav-icon" src="/nav-icons/shards.svg" width="35px" height="35px"/></svelte:fragment>
							<span>SHARDS</span>
						</AppRailAnchor>
					</div>
					<div class="sideBarContentAnchor">
						<AppRailAnchor
							regionLead="flex justify-center"
							href={'/consumables'}
							selected={$page.url.pathname === '/consumables'}
						>
							<svelte:fragment slot="lead"><img alt="consumable-nav-icon" src="/nav-icons/consumables.svg" width="35px" height="35px"/></svelte:fragment>
							<span>CONSUMABLES</span>
						</AppRailAnchor>
					</div>
					<div class="sideBarContentAnchor">
						<AppRailAnchor
							regionLead="flex justify-center"
							href={'/build'}
							selected={$page.url.pathname === '/build'}
						>
						<svelte:fragment slot="lead"><IconHammer size="35" /></svelte:fragment>
						<span>Build</span>
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
