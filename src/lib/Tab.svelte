<script lang="ts">
    import {Icon, Ripple} from "nunui";
    import {page} from "$app/stores";

    export let tabs = [];
    $: show = tabs.map(i => i.link).includes($page.url.pathname);
</script>

{#if show}
    <header>
        {#each tabs as {icon, title, link}}
            <a href={link}>
                <Icon {icon}/>
                <span>{title}</span>
                <Ripple active={$page.url.pathname === link}/>
            </a>
        {/each}
    </header>
{/if}

<style lang="scss">
  header {
    background: var(--primary-light1);
    width: 100%;
    margin-bottom: 12px;
    border-radius: 12px;
    display: flex;
    overflow: hidden;
    position: sticky;
    top: 96px;
    z-index: 1;

    & > a {
      padding: 16px;
      flex: 1;
      position: relative;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.4em;
      color: inherit;
      text-decoration: none;

      & > span {
        margin-left: 12px;
      }
    }
  }
</style>