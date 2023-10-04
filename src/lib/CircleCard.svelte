<script lang="ts">
    import Link from "$lib/Link.svelte";
    import DataCard from "$ui/DataCard.svelte";
    import Provider from "$lib/Provider.svelte";

    export let id: any, link = true;
    export let outlined = false, active = false;
</script>

<Link href={link && `/circle/${id}`}>
    <Provider circle={id} let:data>
        <DataCard {outlined} title={data.name} data={data.description} {active} on:click>
            <slot/>
        </DataCard>
    </Provider>
</Link>

<style lang="scss">
  a {
    text-decoration: none;
    color: inherit;
  }
</style>