<template>
	<ul class="right-sli" :style="showRight">
		<li>
			<i class="el-icon-chat-line-round"></i>
		</li>
		<li class="msg" @mouseenter="enterMsg" @mouseleave="leaveMsg">
			<i class="el-icon-s-opportunity"></i>
			<div class="msg__min" v-show="allRemindCount!=0"></div>
			<section :class="['msg-remaind', showRemind?'msg-remaind--show':'msg-remaind--no']">
				<div class="msg-conbox">
					<ScrollBar :class="['msg-content', showRemind?'msg-content--show':'msg-content--leave']">
						<div>
							<div class="msgitem">
								<header>预约提醒</header>
								<ul>
									<!-- <li class="msg-li msg-li-nomsg" :style="liAnima(0, 0)" v-if="!bsRemind">暂时没有消息</li> -->
									<li
										class="msg-li"
										v-for="(item, index) in test"
										:key="index"
										:style="liAnima(index, item.length)"
									>
										你的消息你的消息你的消息你的消息
										<i class="msg-li-dian"></i>
									</li>
								</ul>
							</div>
							<div class="msgitem">
								<header>合同提醒</header>
								<ul>
									<li class="msg-li msg-li-nomsg" :style="liAnima(0, 0)" v-if="!conRemind">暂时没有消息</li>
									<li></li>
								</ul>
							</div>
							<div class="msgitem">
								<header>续租退租提醒</header>
								<ul>
									<li class="msg-li msg-li-nomsg" :style="liAnima(0, 0)" v-if="!payRemind">暂时没有消息</li>
								</ul>
							</div>
						</div>
					</ScrollBar>
				</div>
				<div class="msg-icon" v-show="showRemind">
					<i class="el-icon-caret-right"></i>
				</div>
			</section>
		</li>
		<li class="no-bot" @click="toTop">
			<i class="el-icon-caret-top"></i>
		</li>
	</ul>
</template>

<script>
	import { mapGetters, mapState } from "vuex";
	import ScrollBar from "@/components/wholeSit/ScrollBar";
	export default {
		data() {
			return {
				timerTop: null,
				showRemind: false,
				showRemindStyle: null,
				timerOut: null,
				test: [[], [], []]
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
			// 滚动条移动
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
			// 进入
			enterMsg() {
				this.showRemind = true;
				window.clearTimeout(this.timerOut);
			},
			leaveMsg() {
				window.clearTimeout(this.timerOut);
				this.timerOut = setTimeout(() => {
					this.showRemind = false;
					window.clearTimeout(this.timerOut);
				}, 500);
			},
			liAnima(index, max) {
				if (this.showRemind) {
					return {
						transform: "translateX(0)",
						transitionDelay: `${0.5 + index / 10}s`
					};
				} else {
					return {
						transform: "translateX(250px)",
						transitionDuration: '0.4s',
						transitionDelay: `${(max - index) / 10}s`
					};
				}
			}
		},
		created() {
			console.log("bsRemind", this.bsRemind);
			console.log("conRemind", this.conRemind);
			console.log("payRemind", this.payRemind);
		},
		beforeDestroy() {},
		components: {
			ScrollBar
		}
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
		margin-bottom: 10px;
	}
}
.msg {
	&__min {
		position: absolute;
		background-color: #d33a31;
		border-radius: 2em;
		top: -10px;
		right: -2px;
		line-height: 20px;
		padding: 0 5px;
		color: #fff;
		font-size: 14px;
	}
	&-remaind {
		// background-color: #fff;
		position: absolute;
		width: 250px;
		height: 0;
		right: 52px;
		bottom: 0;
		z-index: 3;
		border-right: 2px solid #3dbcc6;
		&--show {
			transition: height 0.3s;
			height: 300px;
		}
		&--no {
			transition: height 0.3s 0.6s;
			height: 0;
		}
	}
	&-conbox {
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
	}
	&-content {
		height: 300px;
		box-sizing: border-box;
		padding-right: 6px;
		transform: translateX(100%);
		transition: transform 0.3s 0.3s;
		&--show {
			transform: translateX(0);
		}
		&--leave {
			transform: translateX(100%);
		}
	}

	&-icon {
		position: absolute;
		bottom: 9px;
		right: -13px;
	}
}
.msgitem {
	margin-bottom: 10px;
	border: 1px solid #ebeef5;
	padding: 0 12px;
	background-color: #fff;
	header {
		color: #000;
		font-size: 15px;
		line-height: 28px;
		margin-bottom: 5px;
	}
	ul > li:last-child {
		margin-bottom: 0;
	}
}
.msg-li {
	position: relative;
	margin-bottom: 5px;
	font-size: 14px;
	line-height: 1.4;
	padding: 5px 5px 5px 0;
	cursor: pointer;
	color: #909399;
	transform: translateX(250px);
	border-top: 1px solid rgb(233, 233, 235);
	transition-property: transform;
	transition-duration: 0.3s;
	&-dian {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		position: absolute;
		top: 11px;
		left: -9px;
		background-color: #d33a31;
	}
	&-nomsg {
		text-align: center;
	}
}
</style>

