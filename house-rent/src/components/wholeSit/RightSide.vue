<template>
	<ul class="right-sli" :style="showRight">
		<li class="msg" @mouseenter="enterMsg" @mouseleave="leaveMsg">
			<i class="el-icon-s-opportunity"></i>
			<div class="msg__min">1</div>
			<!-- :style="showRemindStyle" -->
			<!-- showRemind?'msg-remaind--show':'' -->
			<section :class="['msg-remaind', 'msg-remaind--show']" style="display: block">
				<div :class="['msg-content', showRemind?'msg-content--show':'msg-content--leave']"></div>
			</section>
		</li>
		<li class="no-bot" @click="toTop">
			<i class="el-icon-caret-top"></i>
		</li>
	</ul>
</template>

<script>
	import { mapGetters, mapState } from "vuex";
	export default {
		data() {
			return {
				timerTop: null,
				showRemind: false,
				showRemindStyle: null,
				timerOut: null
			};
		},

		computed: {
			...mapGetters(["userId", "allRemindCount"]),
			...mapState(["bsRemind", "conRemind", "payRemind"]),
			showRight() {
				if (
					this.$route.matched.some(item => {
						return item.meta.noShowRight;
					})
				) {
					return { display: "none" };
				}
				return "";
			}
		},
		methods: {
			toTop() {
				clearInterval(this.timerTop);
				this.timerTop = setInterval(() => {
					document.documentElement.scrollTop =
						document.documentElement.scrollTop - 100;
					if (document.documentElement.scrollTop < 10) {
						document.documentElement.scrollTop = 0;
						clearInterval(this.timerTop);
					}
				}, 10);
			},
			msgEnter() {
				console.log("进入就");
			},
			enterMsg() {
				this.showRemind = true;
				console.log("进入");
				window.clearTimeout(this.timerOut);
				this.showRemindStyle = { display: "block" };
			},
			leaveMsg() {
				this.showRemind = false;
				console.log("出去");
				window.clearTimeout(this.timerOut);
				this.timerOut = setTimeout(() => {
					this.showRemindStyle = {};
					window.clearTimeout(this.timerOut);
				}, 1000);
			}
		},
		created() {
			console.log("bsRemind", this.bsRemind);
			console.log("conRemind", this.conRemind);
			console.log("payRemind", this.payRemind);
			// if (this.userId) {
			// }
		},
		beforeDestroy() {}
	};
</script>

<style lang="scss" scoped>
	.right-sli {
		position: fixed;
		right: 40px;
		bottom: 40px;
		color: #3dbcc6;
		font-size: 20px;
		& > li {
			position: relative;
			box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
			cursor: pointer;
			background-color: #fff;
			width: 40px;
			height: 40px;
			border-radius: 50%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		& > li:hover {
			background-color: #f2f6fc;
		}

		& > li:not(.no-bot) {
			margin-bottom: 5px;
		}
	}
	.msg {
		&__min {
			position: absolute;
			// width:
		}
		&-remaind {
			overflow: hidden;
			display: none;
			position: absolute;
			width: 250px;
			height: 300px;
			right: 44px;
			bottom: 0;
			z-index: 3;
			opacity: 0;
			transition-property: opacity;
			transition-delay: 1.3s;
			transition-duration: 0.3s;
			border-right: 2px solid #3dbcc6;
		}

		&-remaind--show {
			opacity: 1;
		}
		&-content {
			width: 100%;
			transform: translateX(100%);
			height: 30px;
			background-color: skyblue;
			transition: transform .3s .4s;
			&--show {
				transform: translateX(0)
			}
			&--leave {
				transform: translateX(100%)
			}
		}
	}
</style>

