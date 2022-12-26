import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';
import importAssets from 'svelte-preprocess-import-assets';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		preprocess({
			postcss: true
		}),
		importAssets()
	],

	kit: {
		adapter: adapter()
	}
};

export default config;
