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
                <td><Input bind:value={data.title} placeholder="" fullWidth /></td>
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
                <td><Input bind:value={data.location} placeholder="" fullWidth/></td>
            </tr>
            <tr>
                <th>참여회원수</th>
                <td>{data.members.length}</td>
            </tr>
            <tr>
                <th>참여 인원 (명단)</th>
                <td><Input value={data.members.join(',')} placeholder="" fullWidth on:change={(e)=>fillMember(e.target.value)}/></td>
            </tr>
            <tr>
                <th>활동 목적</th>
                <td><Input bind:value={data.purpose} placeholder="" fullWidth multiline/></td>
            </tr>
            <tr>
                <th>활동 내용</th>
                <td><Input bind:value={data.content} placeholder="" fullWidth multiline/></td>
            </tr>
        </table>
    </div>
    <div class="activity-evidence">

        <h3>활동 증빙</h3>
        <div class="info">
            활동 증빙 주의사항
            <ul>
                <li>사진으로 해당 활동을 명확히 확인할 수 있어야 함</li>
                <li>얼굴을 식별할 수 있는 경우만 사진에 나온 인원 수에 포함</li>
                <li>외부인이 포함되어 있을 경우, 정회원을 표시해야 함 (명확히 구분할 수 있는 경우는 생략 가능)</li>
                <li>활동 당시의 사진이어야 함</li>

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
</style>