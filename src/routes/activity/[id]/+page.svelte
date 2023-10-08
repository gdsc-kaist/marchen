<script lang="ts">
	import { getIdData } from "$utils/getActivityData";
	import { Button } from "nunui";
	import { onMount } from "svelte";

    export let data;
    let isMounted = false
    onMount(async () => {
        activityData = await getIdData(data.id);
        isMounted = true
    })

    let activityData = {
        id: null,
        title: null,
        classification:null,
        date:null,
        location: null,
        memberNum: 0,
        members: [],
        purpose: null,
        content: null,
        images: []
    };
</script>
{#if isMounted}
<div class="activity">
    <div class="activity-desc">
        <h3>활동 보고서</h3>
        <table>
            <tr>
                <th>활동명</th>
                <td>{activityData.title}</td>
            </tr>
            <tr>
                <th>공식분류</th>
                <td>{activityData.classification}</td>
            </tr>
            <tr>
                <th>일시</th>
                <td>{activityData.date}</td>
            </tr>
            <tr>
                <th>장소</th>
                <td>{activityData.location}</td>
            </tr>
            <tr>
                <th>참여회원수</th>
                <td>{activityData.memberNum}</td>
            </tr>
            <tr>
                <th>참여 인원 (명단)</th>
                <td>{activityData.members.join(', ')}</td>
            </tr>
            <tr>
                <th>활동 목적</th>
                <td>{activityData.purpose}</td>
            </tr>
            <tr>
                <th>활동 내용</th>
                <td>{activityData.content}</td>
            </tr>
        </table>
    </div>
    <div class="activity-evidence">
        <h3>활동 증빙</h3>
        {#each activityData.images as {url, desc}, i}
        <div key={i} class="image">
            <img
                src={url}
                alt={desc}
            />
        </div>
        {/each}
    </div>
</div>
<div class="buttons">
    <a href="./">
        <Button outlined>이전</Button>
    </a>
    <Button>보고서 수정하기</Button>
</div>
{/if}
{#if !isMounted}
<div>
    Loading...
</div>
{/if}

<style lang="scss">
@media (max-width: 800px) {
    .activity {
        display: grid;
    }
}
@media (min-width: 800px) {
    .activity {
        display: grid;
        grid-template-columns: 2fr 1fr;
        height: calc(100vh - 6rem);
    }
    .activity-desc {
        border-right: 1px solid var(--primary-light2);
    }
}
.activity-desc {
    overflow-y: scroll;
    padding: 0 1rem;
    table {
        border-spacing: 0;
        width: 100%;
            border: 0.5px solid var(--primary-light3);
        th, td {
            padding: 0.5rem 1rem;
            border: 0.5px solid var(--primary-light3);
        }
        th {
            background-color: var(--primary-light2);
            text-align: left;
            width: 120px;
        }
    }
}
.activity-evidence {
    overflow-y: scroll;
    position: relative;
    padding: 0 1rem;
    border-left: 1px solid var(--primary-light1);
    .image {
        border: 1px solid var(--primary-light2);
        margin: 1rem;
        position: relative;
        padding: 1rem;
        border-radius: 0.5rem;
        box-shadow: 0.5rem 0.5rem 0.5rem 0.5rem var(--primary-light1);
        img {
            width: 100%;
        }
    }
    &::-webkit-scrollbar {
    width: 8px;
    }

    &::-webkit-scrollbar-track {
    background: var(--primary-light1);
    }

    &::-webkit-scrollbar-thumb {
    background: var(--primary-light3);
    transition: all 0.2s ease;
    }
}
.buttons {
    height: 2.5rem;
    display: flex;
    justify-content: space-between;
    padding: 1rem;
}
</style>