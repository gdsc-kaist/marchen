<script lang="ts">
    import { Input, Button, Date as DatePicker, Select, Option } from "nunui";

    interface imageType {
        url: string,
        desc: string,
    }

    interface dataType {
        title: string,
        classification: string,
        date: string,
        location: string,
        memberNum: number,
        members: string[],
        purpose: string,
        content: string, 
        images: imageType[],
    }
    interface warningType {
        message: string,
        detail?: warningType[]| null,
    }

    let now = new Date();

    $: if (now) {
        data.date = now.toISOString().split('T')[0];
    };

    const data:dataType = {
        title: '',
        classification: '합치하는 외부활동',
        date:'',
        location: '',
        memberNum: 0,
        members: [],
        purpose: '',
        content: '',
        images: []
    }

    let evidenceToggleId = -1;

    const evidenceWarning: warningType[] = [
        {
            message: '사진',
            detail: [
                { message: '사진으로 해당 활동을 명확히 확인할 수 있어야 함'},
                { message: '얼굴을 식별할 수 있는 경우만 사진에 나온 인원 수에 포함'},
                { message: '외부인이 포함되어 있을 경우, 정회원을 표시해야 함'},
                { message: '활동 당시의 사진이어야 함'},
            ]
        },
        {
            message: '공식 홍보 자료',
            detail: [
                { message: '공지된 내용으로 동아리를 특정할 수 있어야 함'},
                { message: '홍보 자료에 해당 활동의 날짜, 장소가 포함되어 있어야 함'},
                { 
                    message: '전체 공개된 홍보물이어야 함',
                    detail: [
                        {
                            message: 'Facebook 페이지 등 인터넷에 올린 경우',
                            detail: [
                                { message: '전체 공개 게시물이여야 함' },
                                { message: '게시 날짜가 해당 활동 전이어야 함'},
                            ]
                        },
                        {
                            message: '포스터가 게시된 것을 찍은 사진인 경우',
                            detail: [
                                { message: '포스터가 모두 확인할 수 있는 곳에 붙어 있어야 함'},
                                { message: '사진이 찍힌 날짜가 명백히 해당 활동 전이어야 함'}
                            ]
                        },
                        { message: '포스터를 실물 제출했을 경우 - 집행부에서 확인 후 처리'}
                    ]
                }
            ]
        },
        {
            message: '내부 공지 자료',
            detail: [
                { message: '공지된 내용으로 동아리를 특정할 수 있어야 함'},
                { message: '공지된 커뮤니티가 해당 동아리의 커뮤니티인지 확인할 수 있어야 함'},
                {  
                    message: '카카오톡 톡방 공지인 경우',

                    detail: [
                        { message: '등록 때 제출한 커뮤니티나 톡방인 경우, 등록 서류와 함께 제출했다고 기입하는 것으로 위 과정 대체 가능'},
                        { message: '공지가 이루어진 일시를 확인할 수 있어야 함' }
                    ]
                },
                { message: '등록 때 제출한 커뮤니티나 톡방인 경우, 등록 서류와 함께 제출했다고 기입하는 것으로 위 과정 대체 가능'}
            ]
        }
    ]

    const addEvidence = () => {
        data.images.push({
            url:"https://cdn.pixabay.com/photo/2017/11/10/05/24/add-2935429_960_720.png",
            desc:"test"
        });
        data.images = data.images.reverse();
    };
    const loadFile = (e, i:number) => {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        data.images[i].url = url;
        data.images = data.images;
    };
    const fillMember = (value:string|null) => {
        if (value) {
            data.members = value.split(',');
            data.memberNum = data.members.length;
        }
    }

    const submit = () => {
        console.log(data);
    }

</script>
<div class="activity">
    <div class="activity-desc">
        <h3>활동 보고서</h3>
        <table>
            <tr>
                <th>활동명</th>
                <td><Input bind:value={data.title} placeholder="활동명을 기입해주세요" fullWidth /></td>
            </tr>
            <tr>
                <th>공식분류</th>
                <td>
                    <Select placeholder="" bind:selected={data.classification}>
                        <Option data="합치하는 외부활동" title="합치하는 외부활동"></Option>
                        <Option data="합치하는 내부활동" title="합치하는 내부활동"></Option>
                        <Option data="합치하지 않는 활동" title="합치하지 않는 활동"></Option>
                    </Select>
                </td>
            </tr>
            <tr>
                <th>일시</th>
                <td>
                    <DatePicker placeholder="" bind:value={data.date}/>
                </td>
            </tr>
            <tr>
                <th>장소</th>
                <td><Input bind:value={data.location} placeholder="온라인으로 진행된 경우 온라인, 카카오톡 톡방 등 명확하게 기입해주세요" fullWidth/></td>
            </tr>
            <tr>
                <th>참여회원수</th>
                <td>{data.members.length}</td>
            </tr>
            <tr>
                <th>참여 인원 (명단)</th>
                <td><Input value={data.members.join(',')} placeholder="참여 회원 이름을 모두 기입해주세요. (ex. 홍길동, 김동연) " fullWidth on:change={(e)=>fillMember(e.target.value)}/></td>
            </tr>
            <tr>
                <th>활동 목적</th>
                <td><Input bind:value={data.purpose} placeholder="자세하고 정확하게 작성해주세요" fullWidth multiline/></td>
            </tr>
            <tr>
                <th>활동 내용</th>
                <td><Input bind:value={data.content} placeholder="자세하고 정확하게 작성해주세요" fullWidth multiline/></td>
            </tr>
        </table>
    </div>
    <div class="activity-evidence">

        <h3>활동 증빙</h3>
        <div class="info">
            활동 증빙 주의사항
            <ul>
                {#each evidenceWarning as {message, detail: detail1}, idx}
                <button
                    class:foldable = {true}
                    on:click={()=> {evidenceToggleId = evidenceToggleId == idx ? -1: idx}}
                    class:unfold={evidenceToggleId == idx}
                >
                    <li>
                        {message}
                        {#if detail1}
                        <ul>
                            {#each detail1 as {message, detail: detail2}, idx}
                            <li>
                                {message}
                                {#if detail2}
                                <ul>
                                    {#each detail2 as {message, detail: detail3}, idx}
                                    <li>
                                        {message}
                                        {#if detail3}
                                        <ul>
                                            {#each detail3 as {message, detail: detail4}, idx}
                                            <li>
                                                {message}
                                            </li>
                                            {/each}
                                        </ul>
                                {/if}
                                    </li>
                                    {/each}
                                </ul>
                                {/if}
                            </li>
                            {/each}
                        </ul>
                        {/if}
                    </li>
                </button>
                
                {/each}
            </ul>
        </div>
        <div class="add-evidence">
            <Button on:click={()=>addEvidence()} style="width: calc(100% - 1rem); text-align:center;">증빙자료 추가하기</Button>
        </div>
        {#each data.images as {url, desc}, i}
            <div key={i} class="image">
                <label for={`evd-${i}`}>
                    <img
                        src={url}
                        alt={desc}
                    >
                </label>
                <input type="file" class="evd-input" id= {`evd-${i}`} name={`evd-${i}`} accept="image/png, image/jpeg" on:change={(e)=>loadFile(e, i)}/>
                <label for={`evd-${i}`}>
                    <div class="hover-text">
                        증빙자료 변경하기
                    </div>
                </label>
            </div>
        {/each}
    </div>
</div>
<div class="buttons">
    <a href="./">
        <Button outlined>이전</Button>
    </a>
    <Button on:click={()=>submit()}>보고서 제출하기</Button>
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
.activity-evidence {
    position: relative;
    padding: 0 1rem;
    overflow-y: scroll;
    .image {
        border: 1px solid var(--primary-light2);
        margin: 1rem 0;
        position: relative;
        padding: 1rem;
        border-radius: 0.5rem;
        box-shadow: 0.5rem 0.5rem 0.5rem 0.5rem var(--primary-light1);
        img {
            width: 100%;
        }
        .evd-input {
            display: none;
        }
        .hover-text {
            display: none;
        }
        &:hover {
            .hover-text {
                display: block;
                position: absolute;
                background-color: #aaa4;
                inset: 1rem 1rem 1rem 1rem;
                border-radius: 0.5rem;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }
    .info {
        background-color: var(--primary-light1);
        padding: 1rem;
        border-radius: 0.5rem;
        margin-bottom: 1rem;
    }
    .add-evidence {
        width: 100%;
        div {
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
ul {
    padding-inline-start: 2rem;
    list-style-type: decimal;
}
.foldable {
    background-color: #0000;
    width: 94%;
    margin-bottom: 0.5rem;
    display: block;
    border: none;
    text-align:start;
    li{
        margin-top: 0.5rem;
    }
    &.unfold {
        ul {
            display: block;
        }
    }
    &:not(.unfold) {
        ul {
            display: none;
        }
    }
}
</style>