<script lang="ts">
    import Provider from "$lib/Provider.svelte";

    export let id;
</script>

<Provider circle={id} let:data>
    <span>{data.name}</span>
</Provider>