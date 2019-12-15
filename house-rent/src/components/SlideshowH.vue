<template>
	<section class="container">
		<div class="container-bgci" :style="{'background-image': `url(${imgList[showIndex].img})`}"></div>
		<div class="slide">
			<div
				class="slide-cir"
				:style="{'background-image': `url(${imgList[showIndex].img})`}"
				@click="$router.push(`/hdetail?house_id=${imgList[showIndex].house_id}`)"
			></div>
			<ul class="slide__nav">
				<li
					v-for="(item, index) in imgList"
					:style="showIndex == index?choiceitem:''"
					:key="item.house_id"
					@click="showIndex = index"
				></li>
			</ul>
			<i class="slide-left" @click="lastHouse"></i>
			<i class="slide-right" @click="nextHouse"></i>
		</div>
	</section>
</template>

<script>
	// 首页轮播图
	export default {
		data() {
			let choiceitem = {
				"background-color": " rgb(255, 255, 255)",
				"border-color": "rgb(146, 154, 159)"
			};
			return {
				imgList: [
					{
						img: require("../assets/img/xmad_1552553827586_JWbdT.jpg"),
						house_id: 1
					},
					{
						img: require("../assets/img/xmad_1562317906034_yYDfN.jpg"),
						house_id: 2
					},
					{
						img: require("../assets/img/xmad_15621496998423_jWLlF.jpg"),
						house_id: 3
					},
					{
						img: require("../assets/img/xmad_15623260229891_iSOkA.jpg"),
						house_id: 4
					},
					{
						img: require("../assets/img/xmad_15625509375452_mExAO.jpg"),
						house_id: 5
					}
				],
				showIndex: 0,
				choiceitem
			};
		},
		methods: {
			lastHouse() {
				this.showIndex =
					Math.abs(--this.showIndex + 1) % 5 == 0 ? 4 : this.showIndex;
			},
			nextHouse() {
				this.showIndex =
					Math.abs(++this.showIndex) % 5 == 0 ? 0 : this.showIndex;
			}
		}
	};
</script>

<style lang="scss" scoped>
@mixin cut {
	display: flex;
	position: absolute;
	width: 41px;
	height: 69px;
	cursor: pointer;
	top: 50%;
	transform: translateY(-50%);
	background: url(../assets/img/icon-slides.png) no-repeat;
}
.container {
	position: relative;
	background-size: contain;
	background-repeat: no-repeat;
	&-bgci {
		position: absolute;
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
		filter: blur(5px);
		z-index: -1;
	}
}
.slide {
	cursor: pointer;
	width: 116.8rem;
	margin: 0 auto;
	height: 400px;
	position: relative;
	&:hover > &-left {
		background-position: 0;
	}
	&:hover > &-right {
		background-position: -41px;
	}
	&-cir {
		height: 100%;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		transition: all 0.4s;
	}
	&-left {
		@include cut;
		left: 0;
		background-position: -84px;
		border-top-right-radius: 0.3rem;
		border-bottom-right-radius: 0.3rem;
	}
	&-right {
		@include cut;
		right: 0;
		background-position: -124px;
		border-top-left-radius: 0.3rem;
		border-bottom-left-radius: 0.3rem;
	}
	&__nav {
		position: absolute;
		display: flex;
		bottom: 1rem;
		right: 0.8rem;
		transform: translate(-50%, -50%);
		li {
			cursor: pointer;
			width: 0.6rem;
			height: 0.6rem;
			border-radius: 50%;
			background-color: #999999;
			border: 0.2rem solid #abb2b3;
			margin: 0.5rem;
			transition: all 0.2s;
			&:hover {
				background-color: #ffffff;
				border-color: #929a9f;
			}
		}
	}
}
</style>