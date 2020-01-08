<template>
	<div class="cen">
		<header class="cen-header">
			<i class="el-icon-s-opportunity"></i>
			<span>我的聊天</span>
		</header>
		<section class="cenchat">
			<div class="cenchat-l">
				<header class="search-admin">
					<div class="search-admin__inp">
						<i class="el-icon-search search-admin__inp--ico"></i>
						<input placeholder="搜索" class="search-admin__text" type="text" />
					</div>
					<div class="search-admin__add">
						<i class="el-icon-plus"></i>
					</div>
				</header>
				<ScrollBar class="cenchat-scro">
					<ul v-if="arrAdmin.length">
						<li
							v-for="item in arrAdmin"
							:key="item.Admin_id"
							:class="['cen-admin', currAdmin.Admin_id==item.Admin_id?'cen-admin--active':'']"
							@click="currAdmin=item;item.unread=0"
						>
							<div class="cen-admin__l">
								<img :src="item.Admin_avaterPath || defCover" alt />
							</div>
							<el-badge class="cen-admin__num" :max="99" :value="item.unread" :hidden="item.unread==0">
								<div class="cen-admin__r">
									<p class="cen-admin__name">{{item.Admin_realName}}</p>
									<p class="cen-admin__info">{{item.lastMsg}}</p>
								</div>
							</el-badge>
						</li>
					</ul>
				</ScrollBar>
			</div>
			<div class="cenchat-r">
				<ScrollBar class="cenchat-content" :goBottom="goBot">
					<div v-if="arrAdmin.length" class="cenchat-content__box">
						<div
							v-for="item in arrAdmin"
							:key="item.Admin_id"
							v-show="item.Admin_id == currAdmin.Admin_id"
							:ref="`admin${item.Admin_id}`"
						></div>
					</div>
				</ScrollBar>
				<div class="write">
					<div class="cen-msg">
						<div class="cen-msg__inp" @keydown.ctrl="sendMsgKey">
							<el-input type="textarea" rows="4" v-model="userMsg"></el-input>
						</div>
						<div class="cen-msg__but">
							<Mybutton @clickTo="butUserMsg" title="发送" />
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
	import ScrollBar from "@/components/wholeSit/ScrollBar";
	import { webChatU, myWebS } from "@/config/webSocket";
	import { queryMyAdmin } from "@/api/user";
	import { mapGetters } from "vuex";
	import { async } from "q";
	export default {
		data() {
			let defCover = require("@/assets/avator.jpg");
			return {
				webK: null,
				arrAdmin: [],
				defCover,
				currAdmin: null,
				userMsg: "",
				goBot: false
			};
		},
		components: {
			ScrollBar
		},
		methods: {
			// 连接webSocket
			connectAdin() {
				this.webK = new myWebS(`${webChatU}${this.userName}`);
				this.webK.conSuss(() => {
					console.log("连接用户成功");
				});
				this.webK.message(async data => {
					if (data.nickname != this.userName) {
						let adminData = null;
						let res = await queryMyAdmin({
							admin_name: data.nickname
						});
						if (res.status) {
							if (!this.arrAdmin.length) {
								this.currAdmin = res.admin;
							}
							adminData = res.admin;
							if (
								!this.arrAdmin.some(
									item => item.Admin_name == data.nickname
								)
							) {
								adminData.unread = 0;
								this.arrAdmin.push(adminData);
							}
							for (let i = 0; i < this.arrAdmin.length; i++) {
								if (this.arrAdmin[i].Admin_name == data.nickname) {
									this.arrAdmin[i].lastMsg = data.content.data;
									if (this.currAdmin.Admin_id != adminData.Admin_id){
										this.arrAdmin[i].unread++;
									}
									break;
								}
							}
							this.$nextTick(() => {
								this.addReciveMsg(data, adminData.Admin_id);
							});
						}
					}
				});
			},
			// 发送消息
			butUserMsg(htmlData, houseId) {
				if (this.userMsg.length && this.currAdmin) {
					let div = document.createElement("div");
					div.classList.add("cenuser-chat", "cenchat-msg");
					div.innerHTML = `
													<div class="cenuser-chat-avator cenchat-msg-avator">
														<img src="${this.userAvater || this.defCover}" alt />
													</div>
													<div class="cenuser-chat-con cenchat-msg-con">
														${this.userMsg}
															<div class="cenuser-chat-con__l cenchat-msg-con_l">
															<i class="el-icon-caret-right"></i>
														</div>
													</div>`;
					let sendContent = null;
					if (htmlData) {
						sendContent = {
							type: "html",
							data: houseId + ""
						};
					} else {
						sendContent = {
							type: "text",
							data: this.myText
						};
					}
					this.webK.send(
						JSON.stringify({
							content: this.userMsg,
							nickname: this.userName,
							nickname2: this.currAdmin.Admin_name
						})
					);
					let refName = `admin${this.currAdmin.Admin_id}`;
					if (Array.isArray(this.$refs[refName])) {
						this.$refs[refName][0].appendChild(div);
					} else {
						this.$refs[refName].appendChild(div);
					}
					this.goBot = !this.goBot;
					this.userMsg = "";
				}
			},
			// 接受到的消息
			addReciveMsg(data, adminId) {
				if (data.isSelf) {
					let div = document.createElement("div");
					div.classList.add("cenadmin-chat", "cenchat-msg");
					div.innerHTML = `
					<div class="cenadmin-chat-avator cenchat-msg-avator">
						<img src="${this.currAdmin.Admin_avaterPath || this.defCover}" alt />
					</div>
					<div class="cenadmin-chat-con cenchat-msg-con">
						${data.content.data}
							<div class="cenadmin-chat-con__l cenchat-msg-con_l">
							<i class="el-icon-caret-right"></i>
						</div>
					</div>`;
					let refName = `admin${adminId}`;
					if (Array.isArray(this.$refs[refName])) {
						this.$refs[refName][0].appendChild(div);
					} else {
						this.$refs[refName].appendChild(div);
					}
					this.goBot = !this.goBot;
				}
			},
			// 按键发送
			sendMsgKey(e) {
				if (e.keyCode == 13) {
					this.butUserMsg();
				}
			}
		},
		computed: {
			...mapGetters(["userName"])
		},
		created() {
			this.connectAdin();
		}
	};
</script>

<style lang="scss">
	.cen-header {
		padding-bottom: 3rem;
		font-size: 1.8rem;
		line-height: 2.1rem;
		border-bottom: 1px solid #f1f1f1;
		color: #333;
		span {
			margin-left: 15px;
		}
	}
	.cen {
		height: 570px;
	}
	.cenchat {
		height: calc(100% - 52px);
		display: flex;
		&-l {
			height: 100%;
			background-color: #fafafa;
			&::before {
				display: table;
				content: "";
			}
		}
		&-scro {
			height: 300px;
		}
		&-r {
			flex-grow: 1;
		}
	}
	.search-admin {
		flex-shrink: 0;
		width: fit-content;
		display: flex;
		padding: 20px 15px 20px 0;
		align-items: center;
		border-bottom: 1px solid #f1f1f1;
		&__add {
			font-size: 16px;
			background-color: #dbd9d8;
			width: 25px;
			height: 25px;
			text-align: center;
			line-height: 25px;
			margin-left: 15px;
			border-radius: 4px;
			overflow: hidden;
		}
		&__inp {
			border-radius: 4px;
			overflow: hidden;
			display: flex;
			background-color: #dbd9d8;
			align-items: center;
			padding: 0 5px;
			&--ico {
				font-size: 13px;
			}
			input {
				background-color: #dbd9d8;
				border: 0;
				outline: none;
				font-size: 14px;
				line-height: 1.8;
				padding-left: 8px;
			}
		}
	}
	.cen-admin {
		display: flex;
		padding: 10px 20px;
		height: 46px;
		&__num {
			width: 142px;
			& > .el-badge__content.is-fixed {
				top: 50%;
				transform: translateY(-50%);
				right: -20px;
			}
		}
		&__r {
			display: flex;
			height: 100%;
			flex-direction: column;
			justify-content: space-between;
			p {
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
				word-break: break-all;
			}
			padding-left: 10px;
		}
		&__info {
			font-size: 14px;
			color: #7d7d7e;
		}
		&__name {
			font-size: 15px;
		}
		&__l {
			flex-shrink: 0;
			width: 46px;
			height: 46px;
			overflow: hidden;
			border-radius: 50%;
			img {
				width: 100%;
				height: 100%;
			}
		}
		&:hover {
			background-color: #ebebec;
		}
		&--active {
			background-color: #ebebec;
		}
	}
	.cen-msg {
		display: flex;
		justify-content: space-between;
		&__inp {
			width: 80%;
		}
		&__but {
			flex-grow: 1;
			& > div {
				width: 120px;
				margin: 0 auto;
			}
		}
	}
	.cenchat-content {
		height: 421px;
		background-color: #fff;
		border: 1px solid skyblue;
		box-sizing: border-box;
		&__box {
			padding: 15px 15px 0;
		}
	}
	.cenadmin-chat {
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
	.cenuser-chat {
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
	.cenchat-msg {
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
			max-width: 290px;
			padding: 8px;
			line-height: 19px;
			border-radius: 4px;
			word-wrap: break-word;
			&_l {
				position: absolute;
				top: 6px;
				font-size: 16px;
			}
		}
	}
</style>