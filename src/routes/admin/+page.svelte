<script lang="ts">
	import { Button, Card } from 'nunui';
	import Head from '$lib/Head.svelte';
</script>

<main class="main">
	<Head
		title="관리자 메뉴"
		size={200}
		img="https://mishpacha.com/wp-content/uploads/2022/07/So-You-Want-to-Be-a%E2%80%A6-Web-Developer-R.jpg"
	/>

	<div class="thing-list">
		<a href="/admin/circle">
			<Card on:click ripple>
				<div class="thing">
					<img
						src="https://media.istockphoto.com/id/607906786/ko/%EC%82%AC%EC%A7%84/%EA%B8%B0%ED%83%80-%EC%A6%9D%ED%8F%AD%EA%B8%B0-%ED%9D%B0%EC%83%89-%EB%B0%94%ED%83%95%EC%97%90-%ED%9D%B0%EC%83%89-%EB%B0%B0%EA%B2%BD.jpg?s=612x612&w=0&k=20&c=UsalKdr25BihzieTmCiwuUw0t7NzG9pRYn2-ovOIy7Q="
						alt="test image"
					/>
					<h3>동아리 총람 관리</h3>
				</div>
			</Card>
		</a>
		<a href="/admin/rental">
			<Card on:click ripple>
				<div class="thing">
					<img
						src="https://wimg.mk.co.kr/meet/neds/2014/11/image_readtop_2014_1425887_14159500481628772.jpg"
						alt="test image"
					/>
					<h3>물품 대여 관리</h3>
				</div>
			</Card>
		</a>
		<a href="/admin/penalty">
			<Card on:click ripple>
				<div class="thing">
					<img
						src="https://img.freepik.com/premium-vector/empty-canvas-on-wooden-easel-wooden-brown-easel_349999-1056.jpg"
						alt="test image"
					/>
					<h3>동아리 징계 관리</h3>
				</div>
			</Card>
		</a>
	</div>
</main>

<style lang="scss">
	a {
		text-decoration: none;
		color: black;
	}
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
