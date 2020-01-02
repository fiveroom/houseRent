<template>
	<section class="chat">
		<header class="chat-h">
			管理员姓名
			<div class="chat-close" @click="$emit('close')">
				<i class="el-icon-close"></i>
			</div>
		</header>
		<ScrollBar class="chat-b" :goBottom="goBot">
			<section class="chat-con" ref="chatCon">
				<div class="time">{{nowTime}}</div>
				<div class="admin-chat chat-msg">
					<div class="admin-chat-avator chat-msg-avator">
						<img :src="defCover" alt />
					</div>
					<div class="admin-chat-con chat-msg-con">
						今天是个好天气，今天是个好天气今天是个好天气，今天是个好天气今天是个好天气，今天是个好天气今天是个好天气，今天是个好天气今天是个好天气，今天是个好天气今天是个好天气，今天是个好天气
						<div class="admin-chat-con__l chat-msg-con_l">
							<i class="el-icon-caret-left"></i>
							<i class="el-icon-arrow-left admin-chat-con__l-line"></i>
						</div>
					</div>
				</div>
				<div class="user-chat chat-msg">
					<div class="user-chat-avator chat-msg-avator">
						<img :src="defCover" alt />
					</div>
					<div class="user-chat-con chat-msg-con">
						<span class="emoji emoji1f60e" title="smiling face with sunglasses"></span>
						今天是个好天气，今天是个好天气今天是个好天气，今天是个好天气今天是个好天气，今天是个好天气今天是个好天气，今天是个好天气今天是个好天气，今天是个好天气今天是个好天气，今天是个好天气
						<div class="user-chat-con__l chat-msg-con_l">
							<i class="el-icon-caret-right"></i>
						</div>
					</div>
				</div>
			</section>
		</ScrollBar>
		<footer class="chat-f">
			<div
				class="myinput"
				@input="e=>myText=e.target.innerText"
				ref="myinput"
				@paste="pasteMsg"
				contenteditable
			></div>
			<Mybutton title="发送" @clickTo="enterMsg" class="chat-f-up" />
		</footer>
	</section>
</template>

<script>
	import ScrollBar from "@/components/wholeSit/ScrollBar";
	import myWebS from "@/config/webSocket";
	import { mapGetters, mapState } from "vuex";
	export default {
		data() {
			let defCover = require("@/assets/avator.jpg");
			let time = new Date();
			let nowTime = `${(time.getHours() + "").padStart(2, "0")}:${(
				time.getMinutes() + ""
			).padStart(2, "0")}`;
			return {
				nowTime,
				defCover,
				chatMsg: null,
				myText: "",
				goBot: false,
				webK: null
			};
		},
		components: {
			ScrollBar
		},
		computed: {
			...mapGetters(["userAvater", "userName"]),
			...mapState({
				admin: state => state.user.adminInfo
			})
		},
		methods: {
			pasteMsg(e) {
				e.preventDefault();

				var clp = (e.originalEvent || e).clipboardData.getData(
					"text/plain"
				);
				clp = clp.replace(/(<([^>]+)>)/gi, "");
				document.execCommand("insertText", false, clp);
			},
			connectSer() {
				this.webK = new myWebS(
					`ws://39.106.122.19:8888/websocket/nickname:${this.admin.Admin_realName}`
				);
				this.webK.conSuss(() => {
					console.log("连接用户成功");
				});
				this.webK.message(data => {
					console.log(data, "接受到的数据");
					// let div = document.createElement("div");
					// div.classList.add("admin-chat", "chat-msg");
					// div.innerHTML = `<div class="admin-chat-avator chat-msg-avator">
					// 		<img src="${this.admin.Admin_avaterPath || this.defCover}" alt />
					// 	</div>
					// 	<div class="admin-chat-con chat-msg-con">
					// 		${data}
					// 		<div class="admin-chat-con__l chat-msg-con_l">
					// 			<i class="el-icon-caret-left"></i>
					// 			<i class="el-icon-arrow-left admin-chat-con__l-line"></i>
					// 		</div>
					// 	</div>`;
					// this.$refs.chatCon.appendChild(div);
					// this.goBot = !this.goBot;
				});
			},
			enterMsg() {
				if (this.myText.length) {
					let div = document.createElement("div");
					div.classList.add("user-chat", "chat-msg");
					div.innerHTML = `<div class="user-chat-avator chat-msg-avator"><img src="${this
						.userAvater || this.defCover}" alt />
										</div>
										<div class="user-chat-con chat-msg-con">
											${this.myText}
											<div class="user-chat-con__l chat-msg-con_l">
												<i class="el-icon-caret-right"></i>
											</div>
										</div>
									`;
					this.webK.send(this.myText);
					this.$refs.chatCon.appendChild(div);
					this.goBot = !this.goBot;
					this.myText = "";
					this.$refs.myinput.innerText = "";
				}
			}
		},
		created() {
			console.log(this.admin);
			this.connectSer();
		},
		beforeDestroy() {
			console.log("关闭");
			this.webK.close();
		}
	};
</script>

<style lang="scss">
	.chat {
		width: 340px;
		position: fixed;
		bottom: 0;
		right: 10px;
		box-shadow: rgba(0, 0, 0, 0.21) 0px 4px 16px 0px;
		z-index: 6;
		&-h {
			position: relative;
			background-color: #f2f2f2;
			padding: 12px;
			text-align: center;
			cursor: move;
			font-size: 12px;
			font-weight: bold;
			border-bottom: 1px solid #e7e7e7;
		}
		&-b {
			height: 300px;
			position: relative;
		}
		&-con {
			background-color: #f5f5f5;
			padding: 0 10px 10px;
			&::before {
				display: table;
				content: "";
			}
		}
		&-close {
			position: absolute;
			top: 0;
			right: 3px;
			font-size: 18px;
			cursor: pointer;
		}
		&-f {
			padding: 10px;
			background-color: #f2f2f2;
			border-top: 1px solid #e7e7e7;
			display: flex;
			justify-content: space-between;
			&-in {
				width: 200px;
			}
			&-up {
				width: 68px;
			}
		}
	}
	.time {
		background-color: #dadada;
		width: fit-content;
		margin: 10px auto;
		color: #fff;
		border-radius: 2px;
		font-size: 12px;
		padding: 2px 5px;
	}
	.chat-msg {
		&::after {
			content: "";
			display: block;
			clear: both;
		}
		margin-bottom: 15px;
		&-avator {
			width: 35px;
			height: 35px;
			border-radius: 5px;
			overflow: hidden;
			img {
				width: 100%;
				height: 100%;
			}
		}
		&-con {
			box-sizing: border-box;
			position: relative;
			font-size: 13px;
			min-height: 35px;
			max-width: 222px;
			padding: 8px;
			line-height: 19px;
			border-radius: 4px;
			&_l {
				position: absolute;
				top: 6px;
				font-size: 16px;
			}
		}
	}
	.admin-chat {
		&-avator {
			float: left;
		}
		&-con {
			background-color: #fff;
			float: left;
			margin-left: 12px;
			border: 1px solid #ededed;
			&__l {
				color: #fff;
				left: -10px;
				&-line {
					position: absolute;
					top: 2px;
					left: 0;
					color: #ededed;
				}
			}
		}
	}
	.user-chat {
		&-avator {
			float: right;
		}
		&-con {
			background-color: #9eea6a;
			float: right;
			margin-right: 12px;
			&__l {
				color: #9eea6a;
				right: -9px;
			}
		}
	}
	.myinput {
		min-height: 35px;
		font-size: 13px;
		width: 220px;
		max-height: 70px;
		background-color: #fff;
		padding: 8px;
		border-radius: 5px;
		box-sizing: border-box;
		outline: none;
		overflow: auto;
	}
	.chat-f > .chat-f-up {
		height: 35px !important;
		font-size: 13px !important;
	}
</style>