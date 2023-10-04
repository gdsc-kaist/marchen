<script lang="ts">
    import Head from "$lib/Head.svelte";
    import CircleCard from "$lib/CircleCard.svelte";
    import Grid from "$ui/Grid.svelte";
    import APIList from "$ui/APIList.svelte";
</script>

<Head title="동아리 총람" size="200"
      img="https://images.unsplash.com/photo-1529148482759-b35b25c5f217?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"/>

<main>
    <h1>내 동아리</h1>
    <Grid>
        {#each {length: 5} as _, i}
            <CircleCard id={i}/>
        {/each}
    </Grid>
    <h1>전체 동아리</h1>
    <Grid list>
        <APIList url="/circle" custom let:data let:i line="1">
            <CircleCard id={data._id}/>
        </APIList>
    </Grid>
</main>
