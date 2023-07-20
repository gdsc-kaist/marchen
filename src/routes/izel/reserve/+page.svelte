<script lang="ts">
    import {Card, LinearProgress} from "nunui";
    import {fly} from "svelte/transition";
    import Head from "$lib/Head.svelte";

    let date = 0;
    let step = 0;
    $: progress = (step + 0.5) / 8;

    const selectIzel = (idx: number) => () => {
        step = 1;
    }

    const selectDate = (idx: number, to: number) => () => {
        date = idx;
        step = to;
    }
</script>

<Head title="이젤 대여" size="200"
      img="https://images.unsplash.com/photo-1595378426340-19a317b875e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1365&q=80"/>

<LinearProgress {progress}/>
{#if step === 0}
    <main in:fly={{y: 10,delay: 100}} out:fly={{y: -10,duration: 100}}>
        <h1>어떤 이젤을 빌릴까요?</h1>
        <div class="row">
            <div style="position: relative">
                <Card ripple on:click={selectIzel(0)}>
                    <div class="frame">몰</div>
                </Card>
                <div class="dot">10개</div>
            </div>
            <Card ripple on:click={selectIzel(1)}>
                <div class="frame">루</div>
            </Card>
            <Card ripple on:click={selectIzel(2)}>
                <div class="frame">?</div>
            </Card>
        </div>
    </main>
{:else if step >= 1 && step <= 3}
    <main in:fly={{y: 10,delay: 100}} out:fly={{y: -10,duration: 100}}>
        <h1>언제부터요?</h1>
        <div class="row">
            <Card primary={date===0} ripple on:click={selectDate(0, 2)}>
                오늘
            </Card>
            <Card primary={date===1} ripple on:click={selectDate(1, 2)}>
                내일
            </Card>
            <Card primary={date===2} ripple on:click={selectDate(2, 2)}>
                모레
            </Card>
            {#each {length: 5} as _, i}
                <Card primary={date===i+3} ripple on:click={selectDate(3+i, 2)}>
                    {new Date().getMonth() + 1}월 {new Date().getDate() + i + 3}일
                </Card>
            {/each}
        </div>
        {#if step >= 2}
            <div class="row" in:fly={{y: 10}}>
                <span>오전</span>
                {#each {length: 12} as _, i}
                    <Card ripple on:click={() => step = 3}>
                        {i + 1}시
                    </Card>
                {/each}
            </div>
            <div class="row" in:fly={{y: 10}}>
                <span>오후</span>
                {#each {length: 12} as _, i}
                    <Card ripple on:click={() => step = 3}>
                        {i + 1}시
                    </Card>
                {/each}
            </div>
        {/if}
        {#if step >= 3}
            <div class="row" in:fly={{y: 10}}>
                <span>분</span>
                {#each {length: 12} as _, i}
                    <Card ripple on:click={() => step = 4}>
                        {i * 5}분
                    </Card>
                {/each}
            </div>
        {/if}
    </main>
{/if}
{#if step >= 4 && step <= 6}
    <main in:fly={{y: 10,delay: 100}} out:fly={{y: -10,duration: 100}}>
        <h1>
            {new Date().getMonth() + 1}월 {new Date().getDate() + date}일부터 언제까지요?
        </h1>
        <div class="row">
            <Card primary={date===0} ripple on:click={selectDate(0, 5)}>
                오늘
            </Card>
            <Card primary={date===1} ripple on:click={selectDate(1, 5)}>
                내일
            </Card>
            <Card primary={date===2} ripple on:click={selectDate(2, 5)}>
                모레
            </Card>
            {#each {length: 5} as _, i}
                <Card primary={date===i+3} ripple on:click={selectDate(3+i, 5)}>
                    {new Date().getMonth() + 1}월 {new Date().getDate() + i + 3}일
                </Card>
            {/each}
        </div>
        {#if step >= 5}
            <div class="row" in:fly={{y: 10}}>
                <span>오전</span>
                {#each {length: 12} as _, i}
                    <Card ripple on:click={() => step = 6}>
                        {i + 1}시
                    </Card>
                {/each}
            </div>
            <div class="row" in:fly={{y: 10}}>
                <span>오후</span>
                {#each {length: 12} as _, i}
                    <Card ripple on:click={() => step = 3}>
                        {i + 1}시
                    </Card>
                {/each}
            </div>
        {/if}
        {#if step >= 6}
            <div class="row" in:fly={{y: 10}}>
                <span>분</span>
                {#each {length: 12} as _, i}
                    <Card ripple on:click={() => step = 4}>
                        {i * 5}분
                    </Card>
                {/each}
            </div>
        {/if}
    </main>
{/if}

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 24px;
    flex-wrap: wrap;

    & > :global(*) {
      margin: 0 10px 10px 10px;
    }
  }

  .frame {
    width: 200px;
    height: 200px;
  }

  .dot {
    position: absolute;
    top: -4px;
    right: -4px;
    padding: 4px;
    border-radius: 12px;
    background-color: var(--primary-light2);
    font-size: 12px;
  }
</style>