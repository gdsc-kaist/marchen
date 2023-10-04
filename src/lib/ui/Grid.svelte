<script lang="ts">
    export let col: any = 3, width = '320px', size = '100%', gap = '0.7rem', list = false;
</script>

<div style="--col: {col};--width: {width};--gap: {gap};--size: {size}" class:list>
    <slot/>
</div>

<style lang="scss">
  div:not(.list), div.list > :global(.--skeleton>div) {
    display: grid;
    width: var(--size);

    --gap-count: calc(var(--col) - 1);
    --total-gap: calc(var(--width) * var(--gap-count));

    --grid-item--max-width: calc((100% - var(--total-gap)) / var(--col));
    grid-template-columns: repeat(auto-fill, minmax(max(var(--width), var(--grid-item--max-width)), 1fr));
    grid-gap: var(--gap);
  }
</style>