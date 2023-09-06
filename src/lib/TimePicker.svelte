<script context="module">
    let counter = 0;
</script>

<script lang="ts">
    import {fly} from "svelte/transition";
    import {Card} from "nunui";
    import {flip} from 'svelte/animate';
    import {send, receive} from './transition.js';

    export let time = {date: -1, hour: -1, minute: -1};
    let isAfternoon = false;
    let now = new Date();
    let key = counter++;

    type dateWithDay = { month: number, date: number, day: string, idx: number }
    let dateList: dateWithDay[];
    const hourList = [...Array(12).keys()].map((e) => (e ? e : 12));
    const minuteList = [...Array(6).keys()].map((e) => (e * 10));
    const dayList = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']

    $: if (now) {
        dateList = [...Array(16)].map((e, i) => {
            let tempDate = now;
            if (i) {
                tempDate = new Date(now.setDate(now.getDate() + 1));
            }
            let m = tempDate.getMonth() + 1;
            let d = tempDate.getDate();
            let day = dayList[tempDate.getDay()];
            return {
                month: m,
                day: day,
                date: d,
                idx: i
            }
        });
    }

    let moreDays = false;
    let opened = false;
    let fullDateList: dateWithDay[];
    $: {
        if (moreDays) {
            fullDateList = dateList;
            opened = true;
        } else {
            if (opened || fullDateList === undefined) {
                if (time.date >= 3) {
                    fullDateList = dateList.slice(0, 2);
                    fullDateList.push({month: 0, day: "", date: 0, idx: -1});
                    fullDateList.push(dateList.at(time.date) as dateWithDay)
                } else {
                    fullDateList = dateList.slice(0, 3);
                    fullDateList.push({month: 0, day: "", date: 0, idx: -1})
                }
            }
            opened = false;
        }
    }
</script>

<div class="middle">
    <div class="day" in:fly={{y: 10,duration: 100}} out:fly={{y: -10,duration: 100}}>
        {#each fullDateList as {month, date, day, idx: i} (i)}
            <div in:receive={{key: i}} out:send={{key: i}} animate:flip={{duration: 600}}>
                {#if month === 0}
                    <div>
                        <Card class="etc" ripple on:click={() => moreDays = true}>
                            <br/>...
                        </Card>
                    </div>
                {:else}
                    <div class="day-card">
                        <Card primary={i === time.date} ripple on:click={() => {time.date = i; moreDays = false}}>
                            <b class="day-text">{`${month}월 ${date}일`}</b>
                            <br/>
                            {day}
                        </Card>
                        {#if i === 0}
                            <div class="dot">오늘</div>
                        {/if}
                        {#if i === 1}
                            <div class="dot">내일</div>
                        {/if}
                    </div>
                {/if}
            </div>
        {/each}
    </div>
    {#if (time.date >= 0 && !moreDays)}
        <div class="down-arrow" in:fly={{y: 10, duration: 100}} out:fly={{y: -10, duration: 100}}>▼</div>
        <div class="row" in:fly={{y: 10, duration: 100}} out:fly={{y: -10, duration: 100}}>
            <div class="switch-wrapper">
                <input class='switch-input' type="checkbox" id={`switch-${key}`} value={isAfternoon}
                       checked={isAfternoon} on:change={()=>{isAfternoon=!isAfternoon}}>
                <label for={`switch-${key}`} class="switch_label">
                    <div class="text">오전</div>
                    <div class="text">오후</div>
                    <span class="onf_btn"></span>
                </label>
            </div>
            {#each hourList as hour, i(i)}
                {@const now = i + Number(isAfternoon) * 12}
                <div>
                    <Card primary={time.hour === now} on:click={() => time.hour = now} ripple>
                        {hour}시
                    </Card>
                </div>
            {/each}
        </div>
    {/if}
    {#if (time.hour >= 0 && !moreDays)}
        <div class="down-arrow" in:fly={{y: 10, duration: 100}} out:fly={{y: -10,duration: 100}}>▼</div>
        <div class="row" in:fly={{y: 10, duration: 100}} out:fly={{y: -10,duration: 100}}>
            <div/>
            {#each minuteList as minute, i(i)}
                <div>
                    <Card primary={i === time.minute} on:click={()=> time.minute = i} ripple>
                        {minute}분
                    </Card>
                </div>
            {/each}
        </div>
    {/if}
</div>

<style lang="scss">
  .middle {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .row {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0 1rem;
    text-align: center;
  }

  .down-arrow {
    padding: 0.5rem;
  }

  .day {
    display: grid;
    gap: 0.5rem 1rem;
    grid-template-columns: repeat(4, auto);
    text-align: center;
  }

  .day-card {
    position: relative;
  }

  .day-text {
    position: relative;
    margin: 0px 10px
  }

  .dot {
    position: absolute;
    top: -5px;
    left: -7px;
    padding: 4px;
    border-radius: 12px;
    background-color: var(--primary);
    font-size: 12px;
    color: #fff;
  }


  .switch-wrapper {
    margin: 6px 0;
    user-select: none;
    grid-row: 1/3;

    .switch-input {
      position: absolute;
      /* hidden */
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
    }

    .switch_label {
      position: relative;
      cursor: pointer;
      display: inline-block;
      width: 100%;
      height: 100%;
      background: var(--surface);
      border-radius: 12px;
      transition: 0.2s;
      box-shadow: 10px 10px 22px rgba(0, 0, 0, 0.0352941176), -10px -10px 22px rgba(0, 0, 0, 0.0352941176);
    }

    .onf_btn {
      position: absolute;
      top: 4%;
      left: 8%;
      display: inline-block;
      width: 84%;
      height: 38%;
      border-radius: 8px;
      background: var(--primary-light2);
      transition: 0.2s;
      box-shadow: 10px 10px 22px rgba(0, 0, 0, 0.0352941176), -10px -10px 22px rgba(0, 0, 0, 0.0352941176);
      z-index: 0;
    }

    .text {
      position: relative;
      height: calc(50% - 6px);
      display: flex;
      flex-direction: column;
      justify-content: center;
      z-index: 1;

      &:first-child {
        margin-bottom: 6px;
      }

      &:nth-child(2) {
        margin-top: 12px;
      }
    }

    .text-disabled {
      position: relative;
      height: calc(50% - 6px);
      display: flex;
      flex-direction: column;
      justify-content: center;
      z-index: 1;

      &:first-child {
        margin-bottom: 6px;
      }

      &:nth-child(2) {
        margin-top: 12px;
      }

      color: #aaa;
    }

    /* checking style */

    /* move */
    .switch-input:checked + .switch_label .onf_btn {
      top: 58%;
    }
  }
</style>