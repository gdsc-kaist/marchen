<script lang="ts">
    import {Button, Card} from "nunui";
    import Provider from "$lib/Provider.svelte";

    export let data;
</script>

<Provider activity={data.id} let:data>
    <div class="activity">
        <div class="activity-desc">
            <h3>활동 보고서</h3>
            <div
                    class="info"
                    class:accept={data.status == 1}
                    class:reject={data.status == -1}
            >
                <div>승인 여부: <b>{['반려', '대기', '승인'][(data.status || 0) + 1]}</b></div>
                {#if (data.status == -1)}
                    <div>
                        반려 사유: {data.message}
                    </div>
                {/if}
            </div>
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
                    <td>{data.members?.join?.(', ')}</td>
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
            <div class="image-list">
                {#each data.images || [] as {url, desc}, i}
                    <Card key={i}>
                        <img
                                class="image"
                                src={url}
                                alt={desc}
                        />
                    </Card>
                {/each}
            </div>

        </div>
    </div>
    <div class="buttons">
        <a href="./">
            <Button outlined>이전</Button>
        </a>
        <a href={data.status==1 ? '':`/circle/${data.circle}/activity/add?id=${data._id}`}>
            <Button disabled={data.status==1}>보고서 수정하기</Button>
        </a>
    </div>
</Provider>

<style lang="scss">
  @media (max-width: 800px) {
    .activity {
      display: grid;
    }
    .activity-evidence .image-list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 500px) {
    .activity {
      display: grid;
    }
    .activity-evidence .image-list {
      grid-template-columns: 1fr
    }
  }

  @media (min-width: 800px) {
    .activity {
      display: grid;
      grid-template-columns: 1fr 300px;
      height: calc(100vh - 7rem);
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
      border: 0.5px solid var(--primary-light2);

      th, td {
        padding: 1rem 1rem;
        border: 0.5px solid var(--primary-light2);
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
      width: 100%;
      border-radius: 0.5rem;

      img {
        width: 100%;
      }
    }
  }

  .buttons {
    height: 2.5rem;
    display: flex;
    justify-content: space-between;
    padding: 1rem;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--primary-light1);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--primary-light3);
    transition: all 0.2s ease;
  }

  .info {
    background-color: var(--primary-light1);
    padding: 0.5rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;

    > * {
      margin: 0.5rem;
    }

    &.accept {
      background-color: #d1edc4
    }

    &.reject {
      background-color: #fcd3d3;
    }
  }
</style>