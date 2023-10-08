<script lang="ts">
    import Head from "$lib/Head.svelte";
    import Form from "$ui/Form.svelte";
    import Grid from "$ui/Grid.svelte";
    import DataCard from "$ui/DataCard.svelte";
    import CircleSelect from "$lib/CircleSelect.svelte";
    import {Input} from "nunui";
    import api from "$utils/api";
    import {goto} from "$app/navigation";

    let critical = -1, curr, selected, reason = '';

    const next = () => curr++;

    const submit = () => api('/penalty', {reason, circle: selected}).then(() => goto('/penalty'))
</script>

<main>
    <Form bind:curr on:submit={submit}>
        <div>
            <h1>어느 동아리에 부여할까요?</h1>
            <CircleSelect form search bind:selected on:select={next}/>
        </div>
        <div>
            <h1>어떤 페널티를 부여할까요?</h1>
            <p>주의 3개가 경고에요!</p>
            <Grid col="2" width="100px" size="300px">
                <DataCard icon="cancel" title="경고" active={critical === true} on:click={() => critical = true}
                          on:click={next}/>
                <DataCard icon="priority_high" title="주의" active={critical === false}
                          on:click={() => critical = false} on:click={next}/>
            </Grid>
        </div>
        <div>
            <h1>부여 사유를 입력해주세요.</h1>
            <Input multiline placeholder="부여 사유" on:input={next} bind:value={reason}/>
        </div>
    </Form>
</main>

<style lang="scss">
  h1 {
    margin-bottom: 2rem;
  }
</style>