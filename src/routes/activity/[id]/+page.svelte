<script lang="ts">
	import { Button } from "nunui";
    const data = {
        title: '활동보고서 이름',
        classification: '합치하는 외부 활동',
        date:'2023-09-20',
        location: '동아리방',
        memberNum: 5,
        members: ['이서현', '강우성', '류수현', '박도윤', '조유진'],
        purpose: '활동 목적에 대한 설명 입니다. 활동 목적에 대한 설명 입니다. 활동 목적에 대한 설명 입니다. 활동 목적에 대한 설명 입니다. 활동 목적에 대한 설명 입니다. 활동 목적에 대한 설명 입니다. 활동 목적에 대한 설명 입니다. 활동 목적에 대한 설명 입니다. 활동 목적에 대한 설명 입니다. 활동 목적에 대한 설명 입니다. 활동 목적에 대한 설명 입니다. ',
        content: '이런 저런 일을 했습니다. 이런 저런 일을 했습니다. 이런 저런 일을 했습니다. 이런 저런 일을 했습니다. 이런 저런 일을 했습니다. 이런 저런 일을 했습니다. 이런 저런 일을 했습니다. 이런 저런 일을 했습니다. 이런 저런 일을 했습니다. 이런 저런 일을 했습니다. 이런 저런 일을 했습니다. 이런 저런 일을 했습니다. 이런 저런 일을 했습니다. 이런 저런 일을 했습니다. ',
        images: [
            {
                url: "https://images.unsplash.com/photo-1548705085-101177834f47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRvZ2V0aGVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
                desc: '활동 인원 전원이 나온 사진 입니다.'
            },
            {
                url: "https://images.unsplash.com/photo-1548705085-101177834f47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRvZ2V0aGVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
                desc: '활동 중인 사진 입니다.'
            },
            {
                url: "https://images.unsplash.com/photo-1548705085-101177834f47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRvZ2V0aGVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
                desc: '활동 중인 추가 사진 입니다'
            }
        ]
    }
</script>
<div class="activity">
    <div class="activity-desc">
        <h3>활동 보고서</h3>
        <table>
            <tr>
                <th>활동명</th>
                <td>{data.title}</td>
            </tr>
            <tr>
                <th>공식분류</th>
                <td>{data.classification}</td>
            </tr>
            <tr>
                <th>일시</th>
                <td>{data.date}</td>
            </tr>
            <tr>
                <th>장소</th>
                <td>{data.location}</td>
            </tr>
            <tr>
                <th>참여회원수</th>
                <td>{data.memberNum}</td>
            </tr>
            <tr>
                <th>참여 인원 (명단)</th>
                <td>{data.members.join(', ')}</td>
            </tr>
            <tr>
                <th>활동 목적</th>
                <td>{data.purpose}</td>
            </tr>
            <tr>
                <th>활동 내용</th>
                <td>{data.content}</td>
            </tr>
        </table>
    </div>
    <div class="activity-evidence">
        <h3>활동 증빙</h3>
        {#each data.images as {url, desc}, i}
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