<script lang="ts">
    import {Button} from "nunui";
    import Head from "$lib/Head.svelte";
</script>

<Head title="이젤 대여"
      img="https://images.unsplash.com/photo-1595378426340-19a317b875e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1365&q=80"/>

<main>
    <h1>예약한 내용이 없어요!</h1>
    <a href="/izel/reserve">
        <Button>예약하기</Button>
    </a>
</main>

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
</style>