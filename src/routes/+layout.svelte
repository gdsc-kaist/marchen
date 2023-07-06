<script lang="ts">
    import {ThemeProvider} from "nunui";
    import {windowWidth, pageScroll, leftNav, navHeight, darkMode} from "$stores/ui";
    import Nav from "$lib/Nav.svelte";
    import './global.css';
    import {page} from "$app/stores";
    import {fly} from "svelte/transition";


    let primary, secondary, surface, onSurface, onSecondary;
    $: {
        if ($darkMode) {
            [primary, secondary, surface, onSurface, onSecondary] = ["#595da7", "#464186", "#1e202a", "#fff", "#fff"];
        } else {
            [primary, secondary, surface, onSurface, onSecondary] = ["#2c2963", "#514daf", "#eff2f6", "#13131f", "#13131f"];
        }
    }
</script>

<svelte:head>
    {#if $darkMode}
        <style>
            html, body {
                background: #1e202a;
            }
        </style>
    {:else}
        <style>
            html, body {
                background: #eff2f6;
            }
        </style>
    {/if}
</svelte:head>

<svelte:window bind:innerWidth={$windowWidth} bind:scrollY={$pageScroll}/>
<ThemeProvider {primary} {secondary} {surface} {onSurface} {onSecondary}>
    <Nav/>
    <main class:leftNav={$leftNav} style:padding-top="{$navHeight}px">
        {#key $page.url.toString()}
            <div in:fly={{y: 10}}>
                <slot/>
            </div>
        {/key}
    </main>
</ThemeProvider>

<style lang="scss">
  :root {
    --nav: 70px;
  }

  main {
    color: var(--on-surface);

    &.leftNav {
      margin-left: var(--nav);

      div {
        padding: 12px;
      }
    }
  }
</style>
