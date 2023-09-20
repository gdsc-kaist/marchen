<script lang="ts">
    import APIList from "$ui/APIList.svelte";
    import {Input} from "nunui";
    import CircleCard from "$lib/CircleCard.svelte";
    import Grid from "$ui/Grid.svelte";
    import show from "$utils/search";
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();

    export let selected: any = null;
    export let form = false, search = false;
    let query = '', _s: any;

    $: if (_s !== selected) {
        _s = selected;
        dispatch('select', selected);
    }
</script>

{#if search}
    <div style="margin-bottom: 2rem">
        <Input placeholder="검색" bind:value={query}/>
    </div>
{/if}

<div style="width: 100%;">
    <Grid list>
        <APIList url="/circle" custom let:data let:i line="1">
            {#if show(data, query, 'name;description')}
                <CircleCard id={data._id} link={!form} active={selected === data._id}
                            on:click={() => selected = data._id}/>
            {/if}
        </APIList>
    </Grid>
</div>