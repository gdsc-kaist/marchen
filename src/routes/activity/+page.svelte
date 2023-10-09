<script lang="ts">
    import Head from "$lib/Head.svelte";
    import {getDataList} from "$utils/getActivityData";
    import {Table, Th, Button} from "nunui";
    import {onMount} from "svelte";
    import Time from "$ui/Time.svelte";
    import APIList from "$ui/APIList.svelte";

    const circle = "GDSC";
    let activities = [];
    let new_id = 0;

    onMount(async () => {
        activities = await getDataList();
        new_id = activities.length + 1; // 일단 길이 값으로 id 지정해둠. 실제는 hash 값 같은거 쓰는게 좋을 것 같음.
    })

</script>
<Head
        title={`동아리 활동보고서: ${circle}`}
        img="https://images.unsplash.com/photo-1622037022824-0c71d511ef3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        size="200"
></Head>

<main>
    <h1>최근 제출 목록</h1>
    <APIList endpoint="/activity" title="상태;일시|4;활동명|6;분류|2;참여인원" let:data>
        {@const href = `/activity/id/${data._id}`}
        <a {href}>대기 중</a>
        <a {href}>
            <Time from={data.date}/>
        </a>
        <a {href}>{data.title}</a>
        <a {href}>{data.classification}</a>
        <a {href}>{data.members?.length || 0}</a>
    </APIList>
</main>

<style lang="scss">
  .add-button {
    float: right;
  }
</style>