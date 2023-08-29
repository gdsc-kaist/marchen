<script  lang="ts">
    export let dateIdx:number, hourIdx:number, minuteIdx:number, key:number;
    import { fly } from "svelte/transition";
    import {Input, Card, Button} from "nunui";
    import { onMount } from 'svelte';

    let isAfternoon = false;
    let now = new Date();

    let dateList:{month:number, day:string, date: number}[];
    const hourList = [...Array(12).keys()].map((e)=>(e?e:12));
    const minuteList = [...Array(6).keys()].map((e)=>(e*10));
    const dayList = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
    $: {
        if (now) {
            dateList = [...Array(3)].map((e, i)=> {
            let tempDate = now;
            if (i) {
                tempDate = new Date(now.setDate(now.getDate()+1));
            }
            return {
                month: tempDate.getMonth()+1,
                day: dayList[tempDate.getDay()],
                date: tempDate.getDate(),
            }});
            console.log(dateList);
        }
    }
    $: {
        if (hourIdx!== undefined) {
            if (isAfternoon && hourIdx<12) hourIdx += Number(isAfternoon)*12;
            else if (!isAfternoon && hourIdx>13) hourIdx -= Number(isAfternoon)*12;
        }
    }
</script>
<div class="middle">
    <div class="day" in:fly={{y: 10,delay: 100}} out:fly={{y: -10,duration: 100}}>
        {#each dateList as {month, date, day}, i}
            <div class="day-card">
                <Card primary={i== dateIdx} ripple key={i} on:click={()=>{dateIdx=i}}>
                    <b>{`${month}월 ${date}일`}</b>
                    <br />
                    {day}
                </Card>
                {#if i===0}
                    <div class="dot">오늘</div>
                {/if}
                {#if i===1}
                    <div class="dot">내일</div>
                {/if}
            </div>
        {/each}
        <Card class="etc">
            <br />...
        </Card>
    </div>
    {#if (dateIdx !== undefined)}
    <div class="down-arrow" in:fly={{y: 10,delay: 100}} out:fly={{y: -10,duration: 100}}>▼</div>
    <div class="row" in:fly={{y: 10,delay: 100}} out:fly={{y: -10,duration: 100}}>
        <div class="switch-wrapper">
            <input class='switch-input' type="checkbox" id={`switch-${key}`} value={isAfternoon} on:change={()=>{isAfternoon=!isAfternoon}}>
            <label for={`switch-${key}`} class="switch_label">
                <span class="onf_btn">{isAfternoon?'오후':'오전'}</span>
            </label>
        </div>
        {#each hourList as hour, i}
            <div>
                <Card primary={i==hourIdx-Number(isAfternoon)*12} ripple key={i} on:click={()=>{hourIdx=i+Number(isAfternoon)*12}}>
                    {hour}시
                </Card>
            </div>
        {/each}
    </div>    
    {/if}
    {#if (hourIdx !== undefined)}
    <div class="down-arrow" in:fly={{y: 10,delay: 100}} out:fly={{y: -10,duration: 100}}>▼</div>
    <div  class="row" in:fly={{y: 10,delay: 100}} out:fly={{y: -10,duration: 100}}>
        <div></div>
        {#each minuteList as minute, i}
            <div>
                <Card primary={i==minuteIdx} ripple key={i} on:click={()=>{minuteIdx=i}}>
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
        gap: 1rem;
        text-align: center;
    }
    .down-arrow {
        padding: 0.5rem;
    }
    .day {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(3, 2fr) 1fr;
        text-align: center;
    }
    .day-card {
        position: relative;
    }
    .dot {
        position: absolute;
        top: -4px;
        left: -4px;
        padding: 4px;
        border-radius: 12px;
        background-color: var(--primary);
        font-size: 12px;
        color: #fff;
    }
    .switch-wrapper {
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
        background: #fff;
        border-radius: 10px;
        transition: 0.2s;
        }
        .onf_btn {
        position: absolute;
        top: 5%;
        left: 5%;
        display: inline-block;
        width: 90%;
        height: 40%;
        border-radius: 8px;
        background: var(--primary-light2);
        transition: 0.2s;
        }

        /* checking style */
        .switch-input:checked+.switch_label, 
        .switch-input:checked+.switch_label:hover {
        background: var(--primary-light2);
        }

        /* move */
        .switch-input:checked+.switch_label .onf_btn {
        top: 50%;
        background: #fff;
        box-shadow: 1px 2px 3px #00000020;
        }
    }
</style>