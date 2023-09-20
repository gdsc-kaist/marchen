<script lang='ts'>
    import {onMount} from 'svelte';
    import Tooltip from "nunui/Tooltip";
    import Button from "nunui/Button";
    import Icon from "nunui/Icon";

    export let from = Date.now(), right = false, tag = false;
    let str = '', intv, _from = from;

    $: {
        _from = new Date(from).getTime();
        if (_from < 1000000000000) _from *= 1000;
    }

    $: {
        void _from;
        recalc();
    }

    function fmt() {
        let future = false, from = new Date(_from), to = new Date();
        if (from > to) {
            future = true;
            [from, to] = [to, from];
        }
        let suffix = future ? '후' : '전';
        if (from.getFullYear() !== to.getFullYear()) return `${to.getFullYear() - from.getFullYear()}년 ${suffix}`;
        else if (from.getMonth() !== to.getMonth()) return `${to.getMonth() - from.getMonth()}달 ${suffix}`;
        else if (from.getDate() !== to.getDate()) {
            if (to.getDate() - from.getDate() === 2) return `이틀 ${suffix}`;
            else if (to.getDate() - from.getDate() === 1) return `${suffix === '후' ? '내일' : '어제'}`;
            else return `${to.getDate() - from.getDate()}일 ${suffix}`;
        } else {
            let diff = to.getTime() - from.getTime();
            if (diff < 60000) return `${Math.floor(diff / 1000)}초 ${suffix}`;
            else if (diff < 3600000) return `${Math.floor(diff / 60000)}분 ${suffix}`;
            else return `${Math.floor(diff / 3600000)}시간 ${suffix}`;
        }
    }

    const recalc = () => str = fmt();

    onMount(() => {
        intv = setInterval(recalc, 1000);
        return () => clearInterval(intv);
    });
</script>

<Tooltip {right} left={!right} bottom xstack ignoreTarget openDelay={300}>
    <span slot="target">
        {#if tag}
            <Button small round outlined style="border-color: var(--primary-light3)">
                <Icon icon="update"/>
                {str}
            </Button>
        {:else}
            {str}
        {/if}
    </span>
    <main>{new Date(_from).toLocaleString()}</main>
</Tooltip>

<style lang="scss">
  main {
    padding: 12px;
  }
</style>