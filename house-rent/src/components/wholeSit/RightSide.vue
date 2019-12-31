<template>
	<ul class="right-sli" :style="showRight">
		<li class="msg" @mouseenter="showRemind = true" @mouseleave="showRemind = false">
			<i class="el-icon-s-opportunity"></i>
			<div class="msg__min">1</div>
			<section :class="['msg-remaind',showRemind?'msg-remaind--show':'']" :style="showRemindStyle">
				<p>消息提醒</p>
				<ul>
					<li>1</li>
					<li>2</li>
					<li>3</li>
					<li>4</li>
				</ul>
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
				showRemindStyle: null
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
		watch: {
			showRemind(newValue, oldValue) {
				
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
			showMsgAnim(status) {
				if (status) {
					this.showRemindStyle = { display: "block" };
				} else {
					setTimeout(() => {
						this.showRemindStyle = "";
					});
				}
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
			display: none;
			position: absolute;
			width: 300px;
			height: 400px;
			background-color: red;
			right: 44px;
			bottom: 0;
			z-index: 3;
			opacity: 0;
			transition: opacity 0.3s 0.3s;
		}

		&-remaind--show {
			opacity: 1;
		}
	}
</style>

