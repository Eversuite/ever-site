<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '../theme.postcss';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

	//Skeleton stuff
	import { AppShell, AppBar, AppRail, AppRailTile } from '@skeletonlabs/skeleton';
	import { writable, type Writable } from 'svelte/store';
	import { page } from '$app/stores';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';

	const storeValue: Writable<number> = writable(0);
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	const heroTileUrl = '/heroes';
	const shardTileUrl = '/shards';

	//Supabase stuff
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';

	import { IconCrown, IconSparkles } from '@tabler/icons-svelte';

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
				<strong class="text-3xl uppercase header-text">Eversite</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<LightSwitch />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<AppRail selected={storeValue}>
			<AppRailTile
				tag="a"
				href={heroTileUrl}
				class={heroTileUrl === $page.url.pathname ? '!bg-primary-500' : ''}
				label="Heroes"
				value={1}
			>
				<IconCrown size="32" />
			</AppRailTile>
			<AppRailTile
				tag="a"
				href={shardTileUrl}
				class={shardTileUrl === $page.url.pathname ? '!bg-primary-500' : ''}
				label="Shards"
				value={2}
			>
				<IconSparkles size="32" />
			</AppRailTile>
		</AppRail>
	</svelte:fragment>
	<!-- Page Route Content -->
	<div class="container mx-auto my-4">
		<slot />
	</div>
</AppShell>

<style lang="postcss" global>
	@font-face {
		font-family: 'Futura PT Web Book';
		src: url('/fonts/FuturaPTWeb-Book.woff2') format('woff2'),
			url('/fonts/FuturaPTWeb-Book.woff') format('woff');
		font-weight: normal;
		font-style: normal;
		font-display: swap;
	}

	@font-face {
		font-family: 'EVERCORE';
		src: url('/fonts/EVERCORE-Medium.woff2') format('woff2'),
			url('/fonts/EVERCORE-Medium.woff') format('woff');
		font-weight: 500;
		font-style: normal;
		font-display: swap;
	}

	@font-face {
		font-family: 'Futura PT Web';
		src: url('/fonts/FuturaPTWeb-Heavy.woff2') format('woff2'),
			url('/fonts/FuturaPTWeb-Heavy.woff') format('woff');
		font-weight: 900;
		font-style: normal;
		font-display: swap;
	}

	@font-face {
		font-family: 'Futura PT Web';
		src: url('/fonts/FuturaPTWeb-MediumObl.woff2') format('woff2'),
			url('/fonts/FuturaPTWeb-MediumObl.woff') format('woff');
		font-weight: 500;
		font-style: italic;
		font-display: swap;
	}

	@font-face {
		font-family: 'ArdelaEdgeX01';
		src: url('/fonts/ArdelaEdgeX01-ExtraBold.woff2') format('woff2'),
			url('/fonts/ArdelaEdgeX01-ExtraBold.woff') format('woff');
		font-weight: bold;
		font-style: normal;
		font-display: swap;
	}

	.header-text {
		font-family: 'EVERCORE';
		font-weight: 500;
		font-style: normal;
	}

	* {
		font-family: 'Futura PT Web Book', sans-serif;
		font-weight: normal;
		font-style: normal;
	}
</style>
