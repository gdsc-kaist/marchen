<script lang="ts">
	import { Card, LinearProgress, Button } from 'nunui';
	import Head from '$lib/Head.svelte';
	import TimePicker from '$lib/TimePicker.svelte';
	import { izels, borrowTime, returnTime, izelIdx } from '$stores/reserve.js';

	let step = 0,
		selected = 0,
		izel = -1;

	function checkTime(timeInfo: number[]) {
		const [startDate, startHour, startMinute, endDate, endHour, endMinute] = timeInfo;
		return (
			startDate < endDate ||
			(startDate == endDate &&
				(startHour < endHour || (startHour == endHour && startMinute < endMinute)))
		);
	}

	$: progress = (step + 0.5) / 7;
	$: if (izel !== -1) {
		step = Math.max(step, 1);
		$izelIdx = izel;
	}

	$: if ($borrowTime.date >= 0) step = Math.max(step, 2);
	$: if ($borrowTime.hour >= 0) step = Math.max(step, 3);
	$: if ($borrowTime.minute >= 0) step = Math.max(step, 4);
	$: if ($returnTime.date >= 0) step = Math.max(step, 5);
	$: if ($returnTime.hour >= 0) step = Math.max(step, 6);
	$: if ($returnTime.minute >= 0) step = Math.max(step, 7);

	$: timeInfo = [
		$borrowTime.date,
		$borrowTime.hour,
		$borrowTime.minute,
		$returnTime.date,
		$returnTime.hour,
		$returnTime.minute
	];

	$: {
		void $borrowTime;
		selected = 0;
	}
	$: {
		void $returnTime;
		selected = 1;
	}

	$: warnTimeFrom = step === 7 && !checkTime(timeInfo) && selected === 0;
	$: warnTimeTo = step === 7 && !checkTime(timeInfo) && selected === 1;
</script>

<LinearProgress {progress} />
<div class="content">
	<div class="container" class:hover={0 === step}>
		<h2>무슨 이젤을 빌릴까요?</h2>
		<div class="thing-list">
			{#each izels as { name }, i}
				<Card on:click={() => (izel = i)} ripple primary={i === izel}>
					<div class="thing">
						<img
							src="https://img.freepik.com/premium-vector/empty-canvas-on-wooden-easel-wooden-brown-easel_349999-1056.jpg"
							alt="test image"
						/>
						<h3>{name}</h3>
					</div>
				</Card>
			{/each}
		</div>
	</div>
	<div class="container" class:warn={warnTimeFrom} class:hover={1 <= step && step <= 3}>
		{#if warnTimeFrom}
			<h3 class="warning">⚠️</h3>
		{/if}
		<h2>언제부터 빌릴까요?</h2>
		{#if step >= 1}
			<TimePicker bind:time={$borrowTime} />
		{/if}
	</div>
	<div class="container" class:warn={warnTimeTo} class:hover={4 <= step && step <= 6}>
		{#if warnTimeTo}
			<h3 class="warning">⚠️</h3>
		{/if}
		<h2>언제까지 빌릴까요?</h2>
		{#if step >= 4}
			<TimePicker bind:time={$returnTime} />
		{/if}
	</div>
</div>
<div class="footer">
	<a href="/rental/rent">
		<Button outlined>이전</Button>
	</a>
	<div class="to-next">
		{#if step === 7 && !checkTime(timeInfo)}
			<!-- <p class="warning">대여 종료 시간이 대여 시작 시간과 같거나 빨라요.</p> -->
		{/if}
		<a href={step === 7 && checkTime(timeInfo) ? '/rental/rent/reserve-end' : null}>
			<Button primary disabled={step < 7 || !checkTime(timeInfo)}>대여 정보 입력</Button>
		</a>
	</div>
</div>

<style lang="scss">
	.content {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		padding: 0.5rem;
		user-select: none;

		h2 {
			text-align: center;
			margin-bottom: 1rem;
		}
	}

	.container {
		position: relative;
		border-radius: 10px;
		/* background-color: #ff000040; */
		padding: 0.5rem;
		overflow: hidden;
		transition: all 0.3s ease-in-out;
		border: 1px solid var(--primary-light2);

		&:not(:first-child) {
			height: 400px;
			grid-column: span 2;
		}

		.warning {
			position: absolute;
			top: 0px;
			left: 2rem;
			font-size: 25px;
			color: #f00;
		}

		&.warn {
			border: 1px solid #ff6c6c;
			box-shadow: 0 0 16px 0 #ff6c6c44;
		}

		&.hover {
			border: none;
			box-shadow: 0 0 16px 0 #00000020;
		}
	}

	.footer {
		display: flex;
		justify-content: space-between;

		.to-next {
			display: flex;
			gap: 1rem;

			.warning {
				margin-block-start: 0;
				margin-block-end: 0;
				align-self: center;
			}
		}
	}

	.thing-list {
		display: grid;
		gap: 16px;
		width: 100%;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

		.thing {
			display: grid;
			gap: 10px;
			grid-template-columns: 100px 1fr;
			grid-template-rows: 1fr 40px;

			> *:first-child {
				grid-column: 1 / 2;
				grid-row: 1 / 3;
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
