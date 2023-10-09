<script lang="ts">
    import {Input} from "nunui";

    const OFFSET = (new Date()).getTimezoneOffset() * 60000;

    export let time: any;
    let _time;

    $: {
        _time = new Date(new Date(time).getTime() - OFFSET).toISOString().slice(0, 16);
    }
    $: console.log(new Date(time).toString())
</script>

<Input value={_time} on:change={e => time = new Date(new Date(e.target.value+'Z').getTime() + OFFSET)} placeholder="시각"
       {...$$restProps} type="datetime-local"/>