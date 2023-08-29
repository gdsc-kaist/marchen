<script  lang="ts">
    import {Input, Card, Button} from "nunui";
    import { onMount } from 'svelte';

    $: curHour = 12;
    $: curMinute = 0;
    let curDay = 0;
    let now = new Date();

    let dateList;
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
</script>
<div class="middle">
    <div class="day">
        {#each dateList as {month, date, day}, i}
            <div class="day-card">
                <Card primary={i== curDay} ripple key={i}>
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
    <div class="down-arrow">▼</div>
    <div class="row">
        {#each hourList as hour, i}
            <div>
                <Card primary={hour==curHour} ripple key={i}>
                    {hour}시
                </Card>
            </div>
        {/each}
    </div>
    <div class="down-arrow">▼</div>
    <div  class="row">
        {#each minuteList as minute, i}
            <div>
                <Card primary={minute==curMinute} ripple key={i}>
                    {minute}분
                </Card>
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
    .middle {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .row {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
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
</style>