<script lang="ts">
    import Head from "$lib/Head.svelte";
</script>

<Head size="600" title="동아리연합회" img="https://images.unsplash.com/photo-1578701190956-49a6d98c9702?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
<h1 style="margin: 0 10px 0 0">Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
{#each {length: 50} as _, i}
    <p>The current count is {i + 1}</p>
{/each}
