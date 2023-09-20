<script lang="ts">
    import {afterUpdate, createEventDispatcher} from "svelte";
    import DataCard from "$ui/DataCard.svelte";
    import {LinearProgress} from "nunui";

    const dispatch = createEventDispatcher();
    export let curr = 0, form = false;
    let el: Element;
    let total = 0;

    afterUpdate(() => {
        const tot = el.children.length;
        if (tot !== total) {
            total = tot;
            curr = 0;
        }
        for (let i = 0; i < total; i++) {
            el.children[i].classList.toggle("hidden", i !== curr);
        }
    })
</script>

<LinearProgress progress={curr / (Math.max(2, total) - 1)}/>
<main bind:this={el}>
    <slot/>
</main>

{#if curr}
    <DataCard icon="chevron_left" title="이전" small on:click={() => curr--} disabled={curr === 0}
              style="width: 180px;float: left"/>
{/if}
{#if curr < total - 1}
    {#if form}
        <DataCard icon="chevron_right" title="다음" small on:click={() =>  curr++} disabled={curr === 0}
                  style="width: 180px;float: right"/>
    {/if}
{:else}
    <DataCard icon="check" title="완료" small on:click={() => dispatch('submit')} disabled={curr === 0}
              style="width: 180px;float: right"/>
{/if}
<div style="clear: both"/>

<style lang="scss">
  main {
    padding: 12px 0 4rem 0;

    :global(.hidden) {
      display: none;
    }

    & > :global(*) {
      animation: fadein 0.5s;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  @keyframes fadein {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
    }
  }
</style>