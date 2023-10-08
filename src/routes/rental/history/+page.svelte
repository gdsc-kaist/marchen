<script lang="ts">
	import RentInfo from '$lib/RentInfo.svelte';
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
	$: isThingInfoFilled = !!$subDivision && !!$clubName && !!$borrowerName && !!$rentalReason;
</script>

<Head title="대여 내역 조회" size={150} img="https://i.imgur.com/ko0FTro.jpg" />
<div class="info">
	<RentInfo product="0" state="0" />
	<RentInfo product="1" state="1" />
	<RentInfo product="2" state="2" />
	<RentInfo product="1" state="3" />
	<RentInfo product="2" state="4" />
	<RentInfo product="0" state="0" />
	<RentInfo product="2" state="2" />
	<RentInfo product="1" state="4" />
</div>
<div class="footer">
	<a href="/rental">
		<Button outlined>이전</Button>
	</a>
</div>

<style lang="scss">
	.info {
		position: relative;
		display: grid;
		gap: 16px;
		grid-template-columns: 1fr 1fr 1fr;
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
