<script lang="ts">
    import Head from "$lib/Head.svelte";
    import DataCard from "$ui/DataCard.svelte";
    import Grid from "$ui/Grid.svelte";
    import Provider from "$lib/Provider.svelte";
    import TipTap from "$lib/TipTap.svelte";
    import AccountCard from "$lib/AccountCard.svelte";
    import {getContext} from "svelte";

    const circle = getContext("circle");
</script>


<main>
    <Grid col="4">
        <DataCard icon="group" title="이름" href="/circle/{$circle._id}" data={$circle.name}/>
        <DataCard icon="alt_route" title="종류" data="정동아리"/>
        <DataCard icon="schedule" title="개설일" data={new Date($circle.createdAt)}/>
        <DataCard icon="front_hand" title="대표자" data={new Date()}/>
        <DataCard icon="apartment" title="동방" data="할당되지 않음"/>
        {#if $circle.mail}
            <DataCard icon="email" title="메일 주소" data="test@kaist.ac.kr"/>
        {/if}
    </Grid>
    <h1>소개</h1>
    <TipTap body={$circle.description}/>
    <h1>회원 <span style="font-size: 0.6em">{$circle.members?.length || 0}명</span></h1>
    <Grid col="8" width="160px">
        {#each $circle.members || [] as member}
            <AccountCard id={member} small/>
        {/each}
    </Grid>
</main>