<script lang="ts">
    import {Card, Icon} from "nunui";
    import Link from "$lib/Link.svelte";
    import Time from "$ui/Time.svelte";
    import Circle from "$ui/Circle.svelte";

    export let icon = '', title = '', href = '', data: any = '', style = '';
    export let primary = true, flat = true, ripple = true, outlined = false, active = false;
    export let small = false;
</script>

<Link {href}>
    <Card {primary} {flat} {ripple} {outlined} {active} style="background: var(--primary-light1);margin: 0;{style}"
          on:click>
        <main class:small>
            {#if icon}
                <div class="icon">
                    <Icon {icon} size="26"/>
                </div>
            {/if}
            <div class="content">
                {#if title}
                    <h2>{title}</h2>
                {/if}
                {#if data}
                    <p>
                        {#if data instanceof Date}
                            <Time from={data}/>
                        {:else if data?.circle}
                            <Circle id={data.circle}/>
                        {:else}
                            {data}
                        {/if}
                    </p>
                {/if}
                <slot/>
            </div>
        </main>
    </Card>
</Link>

<style lang="scss">
  main {
    display: flex;
    align-items: center;
    padding: 0.3em 0.3em 0.4em 0.3em;

    &.small {
      font-size: 0.8rem;
      padding: 0.1em 0.1em 0.2em 0.1em;
    }

    .icon {
      margin: 0 0.8em 0 0;
    }

    h2 {
      margin: 0;
      font-size: 1.5em;
      font-weight: 400;
      color: var(--primary-dark5);
    }

    .content {
      font-weight: 200;
    }

    p {
      margin: 0.6em 0 0 0;
      z-index: 10;
      position: relative;
    }
  }
</style>