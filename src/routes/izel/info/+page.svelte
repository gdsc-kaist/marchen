<script lang="ts">
    import {Input, Card, Button} from "nunui";
    import Head from "$lib/Head.svelte";
    const thingName = "이젤";
    const thingCount = 3;
    const thingPeriod = '2023.07.25 오전 2시 ~ 2023. 07.27 오후 2시';
</script>
<Head title="이젤 대여" size="200"
      img="https://images.unsplash.com/photo-1595378426340-19a317b875e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1365&q=80"/>
<div class="info">
    <Card>
        <h1>대여 정보 입력</h1>
        <div class="inputs">
            <Input placeholder="분과명"/>
            <Input placeholder="동아리명"/>
            <Input placeholder="대여자명"/>
        </div>
        <Input placeholder="대여사유" multiline />
    </Card>
    <Card>
        <h1>대여 정보 확인</h1>
        <p>물품: {thingName}</p>
        <p>수량: {thingCount}개</p>
        <p>대여기간: {thingPeriod}</p>
    </Card>
</div>
<div class="footer">
    <Button outlined>이전</Button>
    <Button primary>대여 완료</Button>
</div>
<style lang="scss">
    .info {
        position: relative;
        display: grid;
        gap: 20px;
        .inputs {
            display: grid;
            gap: 8px;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            margin: 16px 0;
        }
    }
    .footer {
        float: right;
        margin: 16px 0;
    }
</style>
