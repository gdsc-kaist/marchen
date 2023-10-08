<script lang="ts">
	import { Input, Card, Button } from 'nunui';
	import {
		subDivision,
		clubName,
		borrowerName,
		rentalReason,
		borrowTimeString,
		returnTimeString,
		izelName
	} from '$stores/reserve.js';
	import Head from '$lib/Head.svelte';
	const thingCount = 3;
	const thingPeriod = '2023.07.25 오전 2시 ~ 2023. 07.27 오후 2시';
	let isInfoFilled;
	const updateReserveInfo = () => {
		// DB 에 업데이트 하는 기능 구현
	};
	$: isThingInfoFilled = !!$subDivision && !!$clubName && !!$borrowerName && !!$rentalReason;
</script>

<Head
	title="이젤 대여"
	size={150}
	img="https://images.unsplash.com/photo-1595378426340-19a317b875e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1365&q=80"
/>
<div class="info">
	<Card>
		<h1 class="textmiddle">대여 정보를 입력해 주세요!</h1>
		<div class="inputs">
			<p>분과명</p>
			<Input placeholder="" fullWidth bind:value={$subDivision} />
			<p>동아리명</p>
			<Input placeholder="" fullWidth bind:value={$clubName} />
			<p>대여자명</p>
			<Input placeholder="" fullWidth bind:value={$borrowerName} />
			<p>대여 사유</p>
			<Input placeholder="" multiline fullWidth bind:value={$rentalReason} />
		</div>
	</Card>
	<Card>
		<div class="check">
			<div class="read">
				<h1 class="textmiddle">대여 정보 확인</h1>
				<p>물품: {$izelName}</p>
				<p>수량: {thingCount}개</p>
				<p>대여기간: {`${$borrowTimeString} ~ ${$returnTimeString}`}</p>
				<p>분과명: {$subDivision}</p>
				<p>동아리명: {$clubName}</p>
				<p>대여자명: {$borrowerName}</p>
				<p>대여 사유: {$rentalReason}</p>
			</div>
			<div class="line"></div>
			<div class="read">
				<h1 class="textmiddle">유의사항</h1>
				<p>1. 블라블라</p>
				<p>2. 블라블라</p>
				<p>3. 블라블라</p>
				<p>4. 블라블라</p>
			</div>
		</div>
	</Card>
</div>
<div class="footer">
	<a href="/rental/rent/reserve">
		<Button outlined>이전</Button>
	</a>
	<a href={isThingInfoFilled ? '/rental' : null}>
		<Button primary disabled={!isThingInfoFilled} on:click={updateReserveInfo}>대여 완료</Button>
	</a>
</div>

<style lang="scss">
	.info {
		position: relative;
		display: grid;
		gap: 16px;
		grid-template-columns: 1fr 1.5fr;
		.inputs {
			display: grid;
			gap: 8px;
			grid-template-columns: 100px 1fr;
			margin: 16px 30px;
		}
		.check {
			height: 100%;
			display: grid;
			gap: 8px;
			grid-template-columns: 1fr 2px 1fr;
			margin: 0 0;
		}
	}
	.footer {
		display: flex;
		justify-content: space-between;
		margin: 16px 0;
	}
	.textmiddle {
		width: auto;
		text-align: center;
	}
	.line {
		border-left: solid 2px;
		border-color: #ddd;
	}
	.read {
		margin: 0 16px;
	}
</style>
