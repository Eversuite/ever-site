import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

    kit: {
        adapter: adapter({
            routes: {
                include: ['/*'],
                exclude: ['/abilities/*', '/characters/*', '/consumables/*', '/shards/*', '/talents/*']
            }
        })
    }
};

export default config;
