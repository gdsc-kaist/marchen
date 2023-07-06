<script lang="ts">
    import Head from "$lib/Head.svelte";
    import {Card} from "nunui";
</script>

<Head title="이젤 대여"
      img="https://images.unsplash.com/photo-1595378426340-19a317b875e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1365&q=80"/>
<main>
    <Card primary flat ripple>
        sdfsd
    </Card>
</main>

{#each {length: 50} as _, i}
    <p>The current count is {i + 1}</p>
{/each}
