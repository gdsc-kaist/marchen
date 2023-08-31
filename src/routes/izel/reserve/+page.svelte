<script lang="ts">
    import {Card, LinearProgress, Button} from "nunui";
    import {fly} from "svelte/transition";
    import Head from "$lib/Head.svelte";
	import TimePicker from "$lib/TimePicker.svelte";

  const izels = [
    {name: '나무 이젤'},
    {name: '철제 이젤'},
  ]
    let step = 0;
    let izel:number;
    let startDate:number, startHour:number, startMinute:number;
    let endDate:number, endHour:number, endMinute:number;
  
    $: progress = (step + 0.5) / 7;
    $: {
      if (izel !== undefined) step = Math.max(step, 1);
    }
    $: {
      if (startDate !== undefined) step = Math.max(step, 2);
    }
    $: {
      if (startHour !== undefined) step = Math.max(step, 3);
    }
    $: {
      if (startMinute !== undefined) step = Math.max(step, 4);
    }
    $: {
      if (endDate !== undefined) step = Math.max(step, 5);
    }
    $: {
      if (endHour !== undefined) step = Math.max(step, 6);
    }
    $: {
      if (endMinute !== undefined) step = Math.max(step, 7);
    }
</script>

<Head title="이젤 대여" size={150}
      img="https://images.unsplash.com/photo-1595378426340-19a317b875e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1365&q=80"/>

<LinearProgress {progress}/>
<div class="content">
  <div class="container">
    <h2>무슨 이젤을 빌릴까요?</h2>
    <div class="thing-list">
      {#each izels as {name}, i}
      <Card on:click={()=>{izel = i}} key={i} primary={i== izel}>
        <div class="thing">
          <img 
            src="https://img.freepik.com/premium-vector/empty-canvas-on-wooden-easel-wooden-brown-easel_349999-1056.jpg"
            alt="test image"
          />
          <h3>{name}</h3>
        </div>
      </Card>
      {/each}
    </div>
  </div>
  <div class="container">
    <h2>언제부터 빌릴까요?</h2>
    {#if (step >= 1)}
    <TimePicker 
      bind:dateIdx = {startDate}
      bind:hourIdx = {startHour}
      bind:minuteIdx = {startMinute}
      key={0}
    />
    {/if}
  </div>
  <div class="container">
    <h2>언제까지 빌릴까요?</h2>
    {#if (step >= 4)}
    <TimePicker 
      bind:dateIdx = {endDate}
      bind:hourIdx = {endHour}
      bind:minuteIdx = {endMinute}
      key={1}
    />
    {/if}
  </div>
</div>
<div class="footer">
  <Button outlined>이전</Button>
  <Button primary disabled={step < 7}>대여 정보 입력</Button>
</div>
<style lang="scss">
  .content {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    padding: 0.5rem;
    user-select: none;
    h2 {
      text-align: center;
      margin-bottom: 1rem;
    }
  }
  .container {
    border-radius: 10px;
    box-shadow: 0 0 10px 0 #00000040;
    padding: 0.5rem;
    overflow: hidden;
    &:not(:first-child) {
      height: 400px;
      grid-column: span 2;
    }
  }
  .footer {
      display: flex;
      justify-content: space-between;
  }
  .thing-list {
    display: grid;
    gap: 16px;
    width: 100%;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    .thing {
      display: grid;
      gap: 10px;
      grid-template-columns: 100px 1fr;
      grid-template-rows: 1fr 40px;
      >*:first-child {
        grid-column: 1 / 2;
        grid-row: 1 / 3
      }
      h3 {
        margin: 0.7em 0;
      }
      img {
        height: 100px;
        width: 100px;
        object-fit: cover;
      }
    }
  }
</style>