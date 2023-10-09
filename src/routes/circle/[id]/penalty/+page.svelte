<script lang="ts">
    import Time from "$ui/Time.svelte";
    import APIList from "$ui/APIList.svelte";
    import {getContext} from "svelte";

    const circle = getContext('circle');
</script>

{#if $circle._id}
    <APIList endpoint="/penalty/circle/{$circle._id}" title="시각;사유|5" let:data>
        {@const href = `/penalty/id/${data._id}`}
        <a {href}>
            <Time from={data.date}/>
        </a>
        <a {href}>{data.reason}</a>
    </APIList>
{/if}