<script lang="ts">
    import Time from "$ui/Time.svelte";
    import APIList from "$ui/APIList.svelte";
    import {getContext} from "svelte";
    import {Button} from "nunui";

    const circle = getContext('circle');
</script>

<a href="activity/add" class="add-button">
    <Button>+ 활동보고서 추가하기</Button>
</a>
{#if $circle._id}
    <APIList endpoint="/activity/circle/{$circle._id}" title="상태;일시|4;활동명|6;분류|2;참여인원" let:data>
        {@const href = `/activity/id/${data._id}`}
        <a {href}>대기 중</a>
        <a {href}>
            <Time from={data.date}/>
        </a>
        <a {href}>{data.title}</a>
        <a {href}>{data.classification}</a>
        <a {href}>{data.members?.length || 0}</a>
    </APIList>
{/if}