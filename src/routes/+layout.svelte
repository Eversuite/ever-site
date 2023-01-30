<script lang="ts">
	import '../app.postcss';
	import { supabase } from '$lib/supabaseClient';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import Nav from '$lib/components/nav/+Nav.svelte';

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<Nav />
<div class="container mx-auto w-11/12">
	<slot />
</div>

<style global>
	damage-sp {
		color: #ff0000;
	}

	damage-wp {
		color: #0000ff;
	}

	damage {
		color: #ff0000;
	}
	defense {
		color: #0000ff;
	}

	healing {
		color: #2fa32f;
	}
	health {
		color: #41b441;
	}

	red {
		color: #ff0000;
	}
	yellow {
		color: #47c029;
	}

	speed {
		color: #2fcc2f;
	}

	time {
		color: #ff00ff;
	}
	duration {
		color: #ff00ff;
	}
</style>
