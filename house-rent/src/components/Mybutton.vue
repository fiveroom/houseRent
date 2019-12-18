<template>
	<div
		ref="formBut"
		:class="['but',disabled?'':'but--down']"
		@mousedown="addWrap"
		@mouseup="delWrap"
	>
		<span v-text="title"></span>
		<div v-show="!disabled" class="wrap-box">
			<div :style="wrapStyle" :class="['wrap',wrapDown?'wrap--one':'']"></div>
			<div :style="wrapStyle" :class="['wrap',wrapDown?'wrap--two':'']"></div>
		</div>
		<div v-show="disabled" class="but-disabled"></div>
	</div>
</template>

<script>
	/**
	 *
	 * 事件
	 * clickTo 点击后执行
	 */
	export default {
		props: ["title", "disabled"],
		data() {
			return {
				wrapStyle: {},
				wrapDown: false
			};
		},
		methods: {
			// 按钮按下
			addWrap(e) {
				this.wrapDown = true;
				let percent =
					(
						e.offsetX /
						parseInt(getComputedStyle(this.$refs.formBut).width)
					).toFixed(2) *
						100 +
					"%";
				this.wrapStyle = {
					left: percent,
					transform: `translateX(-${percent})`
				};
			},
			// 按钮松开
			delWrap() {
				this.wrapDown = false;
				this.wrapStyle = {};
				this.$emit("clickTo");
			}
		}
	};
</script>

<style lang="scss" scoped>
@keyframes addWrap {
	0% {
		width: 0;
	}
	100% {
		width: 100%;
	}
}

.but {
	height: 4rem;
	display: flex;
	background-color: #2878ff;
	color: #fff;
	font-weight: bolder;
	border-radius: 0.4rem;
	position: relative;
	cursor: pointer;
	span {
		margin: auto;
	}
	box-shadow: 0 1px 6px rgba(0, 0, 0, 0.117647),
		0 1px 4px rgba(0, 0, 0, 0.117647);
	&--down:hover {
		background-color: #246ce5;
	}
	&--down:active {
		box-shadow: 2px 5px 8px rgba(0, 0, 0, 0.2),
			-2px 0px 6px rgba(0, 0, 0, 0.2);
	}
	&-disabled {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background-color: rgba(255, 255, 255, 0.3);
	}
}
.wrap-box {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
}
.wrap {
	position: absolute;
	height: 100%;
	top: 0;
	width: 0;
	background-color: rgba(255, 255, 255, 0.1);
	&--one {
		animation: addWrap 0.3s forwards;
	}
	&--two {
		animation: addWrap 0.2s forwards;
	}
}
</style>