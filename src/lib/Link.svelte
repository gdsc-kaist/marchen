<script lang="ts">
    export let href: any = '', div = false;
</script>

<svelte:element this={href ? 'a' : (div ? 'div' : 'span')} {href} {...$$restProps}>
    <slot/>
</svelte:element>

<style>
    a {
        color: inherit;
        text-decoration: none;
    }
</style>