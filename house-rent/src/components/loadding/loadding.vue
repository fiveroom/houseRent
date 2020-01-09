<template>
	<div v-if="show" :class="['container', el?'container--abs':'container--fixed']">
		<div class="loadding-con" :style="miniBox">
			<div class="loadding-con__img" :style="nimiLoadding">
				<img :src="mini?imgOut:loaddingGif" alt />
			</div>
			<p v-if="!mini" class="loadding-con__text" v-text="text"></p>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			let loaddingGif = require("@/assets/img/loadding.gif");
			return {
				show: false,
				text: "正在加载中",
				el: false,
				loaddingGif,
				imgOut: null,
				mini: null
			};
		},
		computed: {
			nimiLoadding() {
				if (this.mini) {
					return {
						width: "16px",
						height: "16px"
					};
				}
				return "";
			},
			miniBox() {
				if (this.mini) {
					return {
						top: "50%",
						transform: "translate(-50%, -50%)"
					};
					return "";
				}
			}
		},
		beforeDestroy() {
			this.show = false;
			this.text = "正在加载中";
			this.el = false;
			this.imgOut = null;
			this.mini = null;
		}
	};
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100%;
		background-color: rgba(255, 255, 255, 0.9);
		top: 0;
		left: 0;
		z-index: 999999;
		&--fixed {
			position: fixed;
		}
		&--abs {
			position: absolute;
		}
	}
	.loadding-con {
		position: absolute;
		top: 100px;
		left: 50%;
		transform: translateX(-50%);
		&__img {
			width: 120px;
			height: 120px;
			img {
				width: 100%;
				height: 100%;
			}
		}
		&__text {
			text-align: center;
			margin-top: 16px;
			font-size: 20px;
			font-weight: bold;
			background: linear-gradient(to right, #f6c574, #fc5652, #00aacf);
			-webkit-background-clip: text;
			color: transparent;
		}
	}
</style>