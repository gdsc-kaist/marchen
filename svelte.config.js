import adapter from '@sveltejs/adapter-cloudflare';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: preprocess(),

    kit: {
        adapter: adapter(),
        alias: {
            $lib: './src/lib',
            $ui: './src/lib/ui',
            $utils: './src/utils',
            $stores: './src/stores',
        }
    }
};

export default config;
