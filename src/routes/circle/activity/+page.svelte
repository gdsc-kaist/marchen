<script lang="ts">
    import Head from "$lib/Head.svelte";
    import {Table, Th, Button} from "nunui";

    const activities = [
        { title: '활동보고서 이름', classification: '합치하는 외부 활동' , member: 5 },
        { title: '활동보고서 이름', classification: '합치하는 외부 활동' , member: 5 },
        { title: '활동보고서 이름', classification: '합치하는 외부 활동' , member: 5 },
        { title: '활동보고서 이름', classification: '합치하는 외부 활동' , member: 5 },
        { title: '활동보고서 이름', classification: '합치하는 외부 활동' , member: 5 },
    ]
</script>
<Head
    title="동아리 활동보고서: 동아리명" 
    img="https://images.unsplash.com/photo-1518095695691-352141ca6c0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3027&q=80"
    size="200"
></Head>
<Table>
    <tr>
       <Th>연변</Th>
       <Th width="9">활동명</Th>
       <Th width="4">공식 분류</Th>
       <Th>참여 회원수</Th>
    </tr>
    {#each activities as {title, classification, member}, i}
        <tr>
            <td>{i+1}</td>
            <td><a href= {`activity/${i}`}>{title}</a></td>
            <td>{classification}</td>
            <td>{member}</td>
        </tr>
    {/each}
</Table>

<a href="activity/input">
    <Button>+ 활동보고서 추가하기</Button>
</a>