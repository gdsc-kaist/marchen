<script lang="ts">
    import Head from "$lib/Head.svelte";
    import DataCard from "$ui/DataCard.svelte";
    import Grid from "$ui/Grid.svelte";
    import Provider from "$lib/Provider.svelte";

    export let data;
</script>

<Head title="경고/상세"
      img="https://images.unsplash.com/photo-1602913238167-3a810817d62a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2946&q=80"/>

<Provider penalty={data.id} let:data>
    <Grid col="2">
        <DataCard icon="group" title="동아리" href="/circle/{data.circle}" data={{circle: data.circle}}/>
        <DataCard icon="schedule" title="일시" data={new Date(data.date)}/>
        <DataCard icon="help" title="사유" data={data.reason}/>
        <DataCard icon="group" title="부여자" data="1"/>
    </Grid>
    <p>이의 신청은 동아리연합회 메일로 해주시기 바랍니다.</p>
</Provider>