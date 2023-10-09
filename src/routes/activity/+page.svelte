<script lang="ts">
    import Head from "$lib/Head.svelte";
	import { getDataList } from "$utils/getActivityData";
    import {Table, Th, Button} from "nunui";
	import { onMount } from "svelte";

    const circle = "GDSC";
    let activities = [];
    let new_id = 0;

    onMount(async () => {
        activities = await getDataList();
        new_id = activities.length+1; // 일단 길이 값으로 id 지정해둠. 실제는 hash 값 같은거 쓰는게 좋을 것 같음.
    })

</script>
<Head
    title={`동아리 활동보고서: ${circle}`}
    img="https://images.unsplash.com/photo-1622037022824-0c71d511ef3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    size="200"
></Head>
<h1>
    {2023}년 하반기 동아리 활동보고서
</h1>
<Table>
    <tr>
       <Th>연변</Th>
       <Th width="9">활동명</Th>
       <Th width="4">공식 분류</Th>
       <Th>참여 회원수</Th>
    </tr>
    {#each activities as {id, title, classification, memberNum}, i}
        <tr>
            <td>{i+1}</td>
            <td><a href= {`activity/${id}`}>{title}</a></td>
            <td>{classification}</td>
            <td>{memberNum}</td>
        </tr>
    {/each}
</Table>

<a href={`activity/new_activity/${new_id}`} class="add-button">
    <Button>+ 활동보고서 추가하기</Button>
</a>

<style lang="scss">
    .add-button {
        float: right;
    }
</style>