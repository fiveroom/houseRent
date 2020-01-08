<template>
	<div>
		<ul class="right-sli" :style="showRight">
			<li @click="chatAdv" title="咨询">
				<i class="myiconfont icon-zixun"></i>
			</li>
			<li @click="chatAdmin">
				<i class="el-icon-chat-line-round"></i>
			</li>
			<li class="msg no-bot" @mouseenter="enterMsg" @mouseleave="leaveMsg">
				<i class="el-icon-s-opportunity"></i>
				<div class="msg__min" v-show="allRemindCount!=0">{{allRemindCount}}</div>
				<section :class="['msg-remaind', showRemind?'msg-remaind--show':'msg-remaind--no']">
					<div class="msg-conbox">
						<div :class="['msg-content', showRemind?'msg-content--show':'msg-content--leave']">
							<div class="empty"></div>
							<ScrollBar class="msg-scroll">
								<div>
									<div class="msgitem">
										<header>系统消息</header>
										<ul>
											<li
												class="msg-li msg-li-nomsg"
												:style="liAnima(0, 0)"
												v-if="sysRemind.length == 0"
											>暂时没有消息</li>
											<li
												class="msg-li"
												v-for="(item, index) in sysRemind"
												:key="item.Mge_id"
												@click="showMsg(item.Mge_id, 'sys')"
												:style="liAnima(index, sysRemind.length)"
											>
												{{item.Mge_content}}
												<i class="msg-li-dian"></i>
											</li>
										</ul>
									</div>
									<div class="msgitem">
										<header>预约提醒</header>
										<ul>
											<li class="msg-li msg-li-nomsg" :style="liAnima(0, 0)" v-if="bsRemind.length == 0">暂时没有消息</li>
											<li
												class="msg-li"
												v-for="(item, index) in bsRemind"
												:key="item.Mge_id"
												@click="showMsg(item.Mge_id, 'bs')"
												:style="liAnima(index, bsRemind.length)"
											>
												{{item.Mge_content}}
												<i class="msg-li-dian"></i>
											</li>
										</ul>
									</div>
									<div class="msgitem">
										<header>合同提醒</header>
										<ul>
											<li
												class="msg-li msg-li-nomsg"
												:style="liAnima(0, 0)"
												v-if="conRemind.length == 0"
											>暂时没有消息</li>
											<li
												class="msg-li"
												v-for="(item, index) in conRemind"
												:key="item.Mge_id"
												@click="showMsg(item.Mge_id, 'con')"
												:style="liAnima(index, conRemind.length)"
											>
												{{item.Mge_content}}
												<i class="msg-li-dian"></i>
											</li>
										</ul>
									</div>
									<div class="msgitem msgitem-no">
										<header>支付通知</header>
										<ul>
											<li
												class="msg-li msg-li-nomsg"
												:style="liAnima(0, 0)"
												v-if="payRemind.length == 0"
											>暂时没有消息</li>
											<li
												class="msg-li"
												v-for="(item, index) in payRemind"
												:key="item.Mge_id"
												@click="showMsg(item.Mge_id, 'pay')"
												:style="liAnima(index, payRemind.length)"
											>
												{{item.Mge_content}}
												<i class="msg-li-dian"></i>
											</li>
										</ul>
									</div>
								</div>
							</ScrollBar>
							<div class="empty">
								<div class="empty-clear" @click="clearAllmsg">清空</div>
							</div>
						</div>
					</div>
					<div class="msg-icon" v-show="showRemind">
						<i class="el-icon-caret-right"></i>
					</div>
				</section>
			</li>
		</ul>
		<ChatBox v-if="addChat" @close="addChat = false" />
	</div>
</template>

<script>
	import { mapGetters, mapState, mapActions } from "vuex";
	import mixin from "@/mixin";
	import ScrollBar from "@/components/wholeSit/ScrollBar";
	import ChatBox from "@/components/wholeSit/ChatBox";
	export default {
		data() {
			return {
				timerTop: null,
				showRemind: false,
				showRemindStyle: null,
				timerOut: null,
				test: [[], [], []],
				addChat: false
			};
		},
		computed: {
			...mapGetters(["userId", "allRemindCount"]),
			...mapState({
				bsRemind: state => state.user.bsRemind,
				conRemind: state => state.user.conRemind,
				payRemind: state => state.user.payRemind,
				sysRemind: state => state.user.sysRemind
			}),
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
		mixins: [mixin],
		methods: {
			...mapActions(["delRemind"]),
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
						transitionDuration: "0.4s",
						transitionDelay: `${(max - index) / 10}s`
					};
				}
			},
			chatAdmin() {
				if (this.judgeUser()) {
					if (this.$route.path !== "/hdetail") {
						this.$router.push("/userDetail/myChat");
					} else {
						console.log("do something ----");
						this.addChat = true;
					}
				}
			},
			chatAdv() {
				if (this.judgeUser()) {
					this.$router.push("/advis");
				}
			},
			showMsg(mge_id, type) {
				switch (type) {
					case "bs":
						this.$router.push("/userDetail/mySubs");
						break;
					case "con":
						this.$router.push("/userDetail/persCenter");
						break;
					default:
						this.delRemind({ mge_id, type });
						break;
				}
			},
			clearAllmsg() {
				if (
					this.delRemind.length ||
					this.conRemind.length ||
					this.payRemind.length ||
					this.sysRemind.length
				) {
					this.$msgBox
						.confirm("当前包含未处理信息是否全部清空", "确认信息", {
							distinguishCancelAndClose: true,
							confirmButtonText: "是",
							cancelButtonText: "否"
						})
						.then(() => {
							this.bsRemind.forEach(item => {
								this.delRemind({ mge_id: item.Mge_id, type: "bs" });
							});
							this.conRemind.forEach(item => {
								this.delRemind({
									mge_id: item.Mge_id,
									type: "con"
								});
							});
							this.payRemind.forEach(item => {
								this.delRemind({
									mge_id: item.Mge_id,
									type: "pay"
								});
							});
							this.sysRemind.forEach(item => {
								this.delRemind({
									mge_id: item.Mge_id,
									type: "sys"
								});
							});
						})
						.catch(() => {});
				}
			}
		},
		created() {},
		beforeDestroy() {},
		components: {
			ScrollBar,
			ChatBox
		}
	};
</script>

<style lang="scss" scoped>
.right-sli {
	position: fixed;
	right: 40px;
	top: 50%;
	transform: translateY(-50%);
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
.empty {
	height: 20px;
	background-color: rgb(217, 217, 217);
	position: relative;
	&-clear {
		font-size: 12px;
		border-radius: 4px;
		position: absolute;
		top: 50%;
		background-color: #fff;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 2px 5px;
		transition: all .2s;
		&:hover{
			background-color: #3dbcc6;
			color: #fff;
		}
	}
}
.msg {
	&-scroll {
		height: 260px;
	}
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
		height: 100%;
		overflow: hidden;
	}
	&-content {
		height: 300px;
		background-color: #fff;
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
	&-no {
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
	color: #000;
	// color: #909399;
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

