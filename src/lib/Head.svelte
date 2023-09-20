<script lang="ts">
    import {leftNav, pageScroll} from "$stores/ui";

    export let img = '', title = '', size = 200;

    $: mx = +size + ($leftNav ? -36 : -100);
</script>

<div style:background-image="url('{img}')" style:height="{size}px" style:--top="{Math.min($pageScroll, mx) / 2 - 20}px"
      style:--mx="-{mx}px" class:top={!$leftNav}>
    <h1>{title}</h1>
</div>

<style lang="scss">
  div {
    margin: 0 0 12px 0;
    padding: 24px;
    width: calc(100% - 48px);

    border-radius: 12px;

    display: flex;
    flex-direction: column;
    justify-content: end;

    background-size: cover;
    background-position: center calc(50% + var(--top));

    position: sticky;
    top: var(--mx);
    z-index: 100;

    &.top {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }

    h1 {
      margin: 0;
      font-weight: 700;
    }
  }
</style>