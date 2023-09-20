<script lang="ts">
    import Provider from "$lib/Provider.svelte";
    import DataCard from "$ui/DataCard.svelte";

    export let id: number | string;
</script>

<Provider account={id} let:data>
    <DataCard icon="account_circle" title={data.name} data={data.uid} href="/account/{data.id}" {...$$restProps}/>
</Provider>