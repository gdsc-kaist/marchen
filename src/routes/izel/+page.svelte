<script lang="ts">
    import {Button, Card} from "nunui";
    import Head from "$lib/Head.svelte";
</script>
<main class="main">
    <Head title="물품 대여" size="200"
        img="https://images.unsplash.com/photo-1595378426340-19a317b875e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1365&q=80"
    />

    <h1>어떤 물품을 대여하고 싶으신가요?</h1>
    <div class="thing-list">
      <Card>
        <div class="thing">
          <img 
            src="https://img.freepik.com/premium-vector/empty-canvas-on-wooden-easel-wooden-brown-easel_349999-1056.jpg"
            alt="test image"
          />
          <h3>이젤 대여</h3>
          <a href="/izel/reserve">
            <Button primary style="float:right;">대여하기</Button>
          </a>
        </div>
      </Card>
      <Card>
        <div class="thing">
          <img 
            src="https://wimg.mk.co.kr/meet/neds/2014/11/image_readtop_2014_1425887_14159500481628772.jpg"
            alt="test image"
          />
          <h3>청소기 대여</h3>
          <a href="/izel/reserve">
            <Button primary style="float:right;">대여하기</Button>
          </a>
        </div>
      </Card>
      <Card>
        <div class="thing">
          <img 
            src="https://media.istockphoto.com/id/607906786/ko/%EC%82%AC%EC%A7%84/%EA%B8%B0%ED%83%80-%EC%A6%9D%ED%8F%AD%EA%B8%B0-%ED%9D%B0%EC%83%89-%EB%B0%94%ED%83%95%EC%97%90-%ED%9D%B0%EC%83%89-%EB%B0%B0%EA%B2%BD.jpg?s=612x612&w=0&k=20&c=UsalKdr25BihzieTmCiwuUw0t7NzG9pRYn2-ovOIy7Q="
            alt="test image"
          />
          <h3>앰프 대여</h3>
          <a href="/izel/reserve">
            <Button primary style="float:right;">대여하기</Button>
          </a>
        </div>
      </Card>
    </div>
    
</main>

<style lang="scss">
  h1 {
    text-align: center;
    word-break: keep-all;
  }
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .thing-list {
    display: grid;
    gap: 16px;
    width: 100%;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
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