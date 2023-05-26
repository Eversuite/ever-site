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
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<a class="flex flex-row place-items-center" href="/" title="Go to Homepage">
					<strong class="text-3xl uppercase header-text text-primary-600">Evercore Vault</strong>
				</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<AppRail selected={storeValue}>
			<AppRailAnchor
				regionLead="flex justify-center"
				href={'/heroes'}
				selected={$page.url.pathname === '/heroes'}
			>
				<svelte:fragment slot="lead"><IconCrown size="35" /></svelte:fragment>
				<span>Heroes</span>
			</AppRailAnchor>
			<AppRailAnchor
				regionLead="flex justify-center"
				href={'/shards'}
				selected={$page.url.pathname === '/shards'}
			>
				<svelte:fragment slot="lead"><IconSparkles size="35" /></svelte:fragment>
				<span>Shards</span>
			</AppRailAnchor>
			<AppRailAnchor
				regionLead="flex justify-center"
				href={'/consumables'}
				selected={$page.url.pathname === '/consumables'}
			>
				<svelte:fragment slot="lead"><IconMoneybag size="35" /></svelte:fragment>
				<span>Consumables</span>
			</AppRailAnchor>
		</AppRail>
	</svelte:fragment>
	<!-- Page Route Content -->
	<div class="container mx-auto my-4">
		<slot />
	</div>
	<svelte:fragment slot="pageFooter">
		<div class="card p-4 text-center text-sm">
			<p class="opacity-50">
				Evercore Vault is an unofficial fansite created by fans for fans and is not affiliated with
				or endorsed by Vela Games. All trademarks, copyrights, and other intellectual property
				related to Evercore Heroes belong to their respective owners. No copyright infringement is
				intended.
			</p>
		</div>
	</svelte:fragment>
</AppShell>

<style global lang="postcss">
	.header-text {
		font-family: 'EVERCORE';
		font-weight: 500;
		font-style: normal;
	}
</style>
