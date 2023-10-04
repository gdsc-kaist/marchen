<script lang="ts" context="module">
    import {browser} from '$app/environment';

    const cache: any = {};

    if (browser) {
        window.addEventListener('authRefresh', () => {
            for (const key in cache) {
                delete cache[key];
            }
        });
        window.addEventListener('clear', ({detail}: any) => {
            for (const [type, id] of detail) {
                cache[type].delete(id + '@');
            }
        });
    }
</script>

<script lang="ts">
    import {createEventDispatcher, onMount, setContext, tick} from "svelte";
    import {writable} from "svelte/store";
    import api from "$utils/api";

    export let type: string = Object.keys($$restProps)[0], defaultValue = {};

    const dispatch = createEventDispatcher();
    const object = writable(<any>defaultValue);

    export let id: number = $$restProps[type], endpoint = '', local = true,
        load = true, loaded = false, mounted = false;
    let ts = Date.now(), c = 0, getc = () => c, inc = () => ++c;

    local && setContext(type, object);
    $: _endpoint = endpoint || `/${type}/${id}`;

    $: if (browser && id && load && mounted) tick().then(async () => {
        inc();
        let _c = getc();
        void ts;
        object.set({loading: true});
        if (!cache[type]) cache[type] = new Map<number, Promise<any>>();
        if (cache[type].has(id)) {
            loaded = false;
            cache[type].get(id).then(async (r: any) => {
                dispatch('load', r);
                await tick();
                await tick();
                if (_c === getc()) object.set(r);
                await tick();
                await tick();
                loaded = true;
            });
        } else {
            loaded = false;
            cache[type].set(id, new Promise(resolve => {
                api(_endpoint).then(async (r: any) => {
                    dispatch('load', r);
                    r.loaded = true;
                    await tick();
                    await tick();
                    if (_c === getc()) object.set(r);
                    await tick();
                    await tick();
                    loaded = true;
                    resolve(r);
                }).catch(async (error) => {
                    const e = {error};
                    dispatch('load', e);
                    await tick();
                    await tick();
                    if (_c === getc()) object.set(e);
                    await tick();
                    await tick();
                    loaded = true;
                    resolve(e);
                })
            }));
        }
    });

    onMount(() => {
        const refresh = () => ts++;
        mounted = true;
        window.addEventListener('authRefresh', refresh);
        window.addEventListener('clear', refresh);
        return () => {
            window.removeEventListener('authRefresh', refresh);
            window.removeEventListener('clear', refresh);
        }
    })
</script>

{#key id}
    <slot data={$object} {loaded}/>
{/key}