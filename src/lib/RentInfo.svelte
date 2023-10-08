<script context="module">
	let counter = 0;
</script>

<script lang="ts">
	import { Button, Card } from 'nunui';
	export let product = 0,
		state = 1;
	const products = {
		0: {
			text: '이젤 대여',
			image:
				'https://img.freepik.com/premium-vector/empty-canvas-on-wooden-easel-wooden-brown-easel_349999-1056.jpg'
		},
		1: {
			text: '청소기 대여',
			image:
				'https://wimg.mk.co.kr/meet/neds/2014/11/image_readtop_2014_1425887_14159500481628772.jpg'
		},
		2: {
			text: '앰프 대여',
			image:
				'https://media.istockphoto.com/id/607906786/ko/%EC%82%AC%EC%A7%84/%EA%B8%B0%ED%83%80-%EC%A6%9D%ED%8F%AD%EA%B8%B0-%ED%9D%B0%EC%83%89-%EB%B0%94%ED%83%95%EC%97%90-%ED%9D%B0%EC%83%89-%EB%B0%B0%EA%B2%BD.jpg?s=612x612&w=0&k=20&c=UsalKdr25BihzieTmCiwuUw0t7NzG9pRYn2-ovOIy7Q='
		}
	};
	const states = {
		0: {
			text: '대여 전',
			style:
				'background-color:#dadce7; height: 100%; display:flex; padding: 0; margin: 0; align-items:center; justify-content:center; border-radius: 0 12px 12px 0;'
		},
		1: {
			text: '대여 중',
			text_extra: '미수령',
			style:
				'background-color:#dadce7; height: 100%; display:flex; padding: 0; margin: 0; align-items:center; justify-content:center; border-radius: 0 12px 0 0;',
			style_extra:
				'background-color:#3c8553; height: 100%; display:flex; padding: 0; margin: 0; align-items:center; justify-content:center; border-radius: 0 0 12px 0; color: #fff'
		},
		2: {
			text: '대여 중',
			text_extra: '사용 중',
			style:
				'background-color:#dadce7; height: 100%; display:flex; padding: 0; margin: 0; align-items:center; justify-content:center; border-radius: 0 12px 0 0;',
			style_extra:
				'background-color:#3984a3; height: 100%; display:flex; padding: 0; margin: 0; align-items:center; justify-content:center; border-radius: 0 0 12px 0; color: #fff'
		},
		3: {
			text: '대여 중',
			text_extra: '미반납',
			style:
				'background-color:#dadce7; height: 100%; display:flex; padding: 0; margin: 0; align-items:center; justify-content:center; border-radius: 0 12px 0 0;',
			style_extra:
				'background-color:#a33e39; height: 100%; display:flex; padding: 0; margin: 0; align-items:center; justify-content:center; border-radius: 0 0 12px 0; color: #fff'
		},
		4: {
			text: '대여 완료',
			style:
				'background-color:#dadce7; height: 100%; display:flex; padding: 0; margin: 0; align-items:center; justify-content:center; border-radius: 0 12px 12px 0;'
		}
	};
</script>

<Card ripple style="display: grid; grid-template-columns: 1fr 90px; margin: 0; padding: 0">
	<Card flat style="margin: 0; padding: 5px">
		<div class="thing">
			<img src={products[product]['image']} alt="test image" />
			<div>
				<h3>{products[product]['text']}</h3>
				<p>9.20(수) 18:00 ~ 9.21(목) 15:00</p>
			</div>
		</div>
	</Card>
	<div style="display: flex; flex-direction: column;margin: 0; padding: 0">
		<Card flat style={states[state]['style']}>
			<h4>{states[state]['text']}</h4>
		</Card>
		{#if state > 0 && state < 4}
			<Card flat style={states[state]['style_extra']}>
				<h4>{states[state]['text_extra']}</h4>
			</Card>
		{/if}
	</div>
</Card>

<style lang="scss">
	.thing {
		display: grid;
		gap: 0 10px;
		grid-template-columns: 100px 1fr;
		margin: 10px;
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
</style>
