<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';

	//Skeleton stuff
	import { AppShell, AppBar, AppRail, AppRailTile } from '@skeletonlabs/skeleton';
	import { writable, type Writable } from 'svelte/store';
	import { page } from '$app/stores';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';

	const storeValue: Writable<number> = writable(0);
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	const heroTileUrl = '/heroes';

	//Supabase stuff
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';

	import { IconCrown } from '@tabler/icons-svelte';
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
				<strong class="text-xl uppercase">Eversite</strong>
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
				value={0}><IconCrown size={32} /></AppRailTile
			>
			<AppRailTile label="Tile 2" value={1}>(icon)</AppRailTile>
			<AppRailTile label="Tile 3" value={2}>(icon)</AppRailTile>
		</AppRail>
	</svelte:fragment>
	<!-- Page Route Content -->
	<div class="container mx-auto my-4">
		<slot />
	</div>
</AppShell>
