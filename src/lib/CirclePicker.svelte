<script lang="ts">
    import {Select, Option} from "nunui";
    import {onMount} from "svelte";

    let circles = [];

    onMount(() => {
        circles = [{id: 1, name: "동아리1"}, {id: 2, name: "동아리2"}]
    })
</script>

<Select placeholder="동아리">
    {#each circles as circle}
        <Option title={circle.name} data={circle.id}/>
    {/each}
</Select>