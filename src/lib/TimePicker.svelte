<script  lang="ts">
    export let dateIdx:number, hourIdx:number, minuteIdx:number, key:number;
    import { fly, scale } from "svelte/transition";
    import {Input, Card, Button} from "nunui";
    import { onMount } from 'svelte';
    import { flip } from 'svelte/animate';
	import { send, receive } from './transition.js';
	import Page from "../routes/+page.svelte";

    let isAfternoon = false;
    let now = new Date();

    type dateWithDay = {month:number, date:number, day:string, idx: number}
    let dateList: dateWithDay[];
    const hourList = [...Array(12).keys()].map((e)=>(e?e:12));
    const minuteList = [...Array(6).keys()].map((e)=>(e*10));
    const dayList = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
    $: {
        if (now) {
            dateList = [...Array(16)].map((e, i)=> {
            let tempDate = now;
            if (i) {
                tempDate = new Date(now.setDate(now.getDate()+1));
            }
            let m = tempDate.getMonth()+1;
            let d = tempDate.getDate();
            let day = dayList[tempDate.getDay()];
            return {
                month: m,
                day: day,
                date: d,
                idx: i
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
    let moreDays = false;
    let opened = false;
    let fullDateList: dateWithDay[];
    $: {
        if (moreDays) {
            fullDateList = dateList;
            opened = true;
        } else {
            if (opened || fullDateList === undefined) {
                if (dateIdx >= 3) {
                    fullDateList = dateList.slice(0, 2);
                    fullDateList.push({month: 0, day: "", date: 0, idx: -1});
                    fullDateList.push(dateList.at(dateIdx) as dateWithDay)
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
        {#each fullDateList as {month, date, day, idx} (idx)}
            <div in:receive={{key: idx}} out:send={{key: idx}} animate:flip={{duration: 600}}>
                {#if month===0}
                    <div>
                        <Card class="etc" ripple on:click={()=>{moreDays=true}} >
                            <br />...
                        </Card>
                    </div>
                {:else}
                    <div class="day-card">
                        <Card primary={idx== dateIdx} ripple key={idx} on:click={()=>{dateIdx=idx; moreDays=false}}>
                            <b class="day-text">{`${month}월 ${date}일`}</b>
                            <br />
                            {day}
                        </Card>
                        {#if idx===0}
                        <div class="dot">오늘</div>
                        {/if}
                        {#if idx===1}
                        <div class="dot">내일</div>
                        {/if}
                    </div>
                {/if}
            </div>
        {/each}
    </div>
    {#if (dateIdx !== undefined && !moreDays)}
    <div class="down-arrow" in:fly={{y: 10, duration: 100}} out:fly={{y: -10, duration: 100}}>▼</div>
    <div class="row" in:fly={{y: 10, duration: 100}} out:fly={{y: -10, duration: 100}}>
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
    {#if (hourIdx !== undefined && !moreDays)}
    <div class="down-arrow" in:fly={{y: 10, duration: 100}} out:fly={{y: -10,duration: 100}}>▼</div>
    <div  class="row" in:fly={{y: 10, duration: 100}} out:fly={{y: -10,duration: 100}}>
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