<script lang="ts">
    import Head from "$lib/Head.svelte";
    import CircleCard from "$lib/CircleCard.svelte";
    import Grid from "$ui/Grid.svelte";
    import APIList from "$ui/APIList.svelte";
    import DataCard from "$ui/DataCard.svelte";
    import Time from "$ui/Time.svelte";
    import Circle from "$ui/Circle.svelte";
</script>

<Head title="경고"
      img="https://images.unsplash.com/photo-1586201687415-f89f8bd2ab38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"/>

<main>
    <a href="/penalty/apply">부여</a>
    <h1>내 동아리</h1>
    <Grid>
        {#each {length: 2} as _, i}
            <CircleCard id={i}/>
        {/each}
    </Grid>
    <h1>최근 부과 목록</h1>
    <APIList endpoint="/penalty" title="시각;동아리;사유|5" let:data>
        {@const href = `/penalty/id/${data._id}`}
        <a {href}>
            <Time from={data.date}/>
        </a>
        <a {href}>
            <Circle id={data.circle}/>
        </a>
        <a {href}>{data.reason}</a>
    </APIList>
</main>
