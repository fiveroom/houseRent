<template>
	<section class="adv-container">
		<header-nav />
		<section class="adv-box">
			<main class="adv-box-con">
				<div class="adv-chat">
					<ScrollBar class="adv-chat__info" :goBottom="goBot">
						<div class="adv-chat-con" ref="advCon">
							<p class="adv-chat-con__hint">咨询相关住房服务</p>
						</div>
						<div class="advh" v-show="showLod">
							<div class="advh-close">
								{{choiceTitle}}
								<i class="el-icon-close" @click="showLod=false"></i>
							</div>
							<ScrollBar class="advh-scroll">
								<ul class="advh-ul">
									<li class="advh-item" v-for="(item, index) in houseData" :key="index">
										<div class="advh-item__cover">
											<img :src="item.House_coverPic" alt />
										</div>
										<article class="advh-item__info">
											<p class="advh-item__info__t">{{item.House_title}}</p>
											<p>
												<span>{{item.House_shape}}</span>
												<span class="advh-item__info__spli">|</span>
												<span>{{item.House_direction}}</span>
												<span class="advh-item__info__spli">|</span>
												<span>{{item.House_area}}㎡</span>
											</p>
											<p>
												<span>{{item.House_rent}}</span>
												<span class="advh-item__info__spli">|</span>
												<span>{{getChname(item.House_months)}}</span>
											</p>
										</article>
										<nav class="advh-item__nav">
											<i class="el-icon-tickets" @click="goHouseDetial(item.House_id)"></i>
											<i class="el-icon-position" @click="sendHouse(index)"></i>
										</nav>
									</li>
								</ul>
							</ScrollBar>
						</div>
					</ScrollBar>
					<div class="adv-user">
						<ul class="adv-menu">
							<li class="adv-menu-item" @click="queryHouseData(0, '选择房源')">
								<i class="myiconfont icon-fangzi"></i>
								<span>选择房源</span>
							</li>
							<li class="adv-menu-item" @click="queryHouseData(1, '我的收藏')">
								<i class="myiconfont icon-shoucang"></i>
								<span>我的收藏</span>
							</li>
							<li class="adv-menu-item" @click="queryHouseData(2, '我的预约')">
								<i class="myiconfont icon-yuyue"></i>
								<span>我的预约</span>
							</li>
						</ul>
						<div class="adv-msg">
							<div class="adv-msg__inp" @keydown.ctrl="sendMsgKey">
								<el-input type="textarea" rows="4" v-model="userMsg"></el-input>
							</div>
							<div class="adv-msg__but">
								<Mybutton @clickTo="butUserMsg" title="发送" />
							</div>
						</div>
					</div>
				</div>
				<div class="adv-hint">
					<div class="adv-weixin">
						<header class="adv-weixin__header">
							<div class="adv-weixin__header--l">
								<img :src="imgSta.weixinPro" alt />
								<span>微信小程序</span>
								<div>推荐</div>
							</div>
							<div
								:class="['adv-weixin__header--r', clickW?'adv-weixin__header--r--click':'']"
								@click="clickW = !clickW"
							>
								<i class="el-icon-arrow-down"></i>
							</div>
						</header>
						<div
							class="adv-weixin__body"
							:style="{'height':clickW?'0':'auto', 'padding': clickW?'0':'10px 0'}"
						>
							<p class="adv-weixin__body--tit">相寓</p>
							<div class="adv-weixin__body--img">
								<img :src="imgSta.weixin" alt />
							</div>
							<p class="adv-weixin__body--pro">微信小程序</p>
						</div>
					</div>
				</div>
			</main>
		</section>
		<Footer />
	</section>
</template>

<script>
	import ScrollBar from "@/components/wholeSit/ScrollBar";
	import { myWebS, webChatU } from "@/config/webSocket";
	import { mapGetters, mapState } from "vuex";
	import { queryAdmin, queryOwnCollect, queryBespeak } from "@/api/user";
	import { searchHouse } from "@/api/house";
	export default {
		data() {
			let defCover = require("@/assets/avator.jpg");
			let imgSta = {
				weixin: require("@/assets/house.jpg"),
				weixinPro: require("@/assets/img/weixinPro.png")
			};
			return {
				imgSta,
				clickW: false,
				defCover,
				userMsg: "",
				goBot: false,
				webK: null,
				admin: {},
				houseData: [],
				skipNum: 1, // '页数'
				sizeNum: 10, // '分页数'
                showLod: false,
                choiceTitle: ''
			};
		},
		components: {
			ScrollBar
		},
		computed: {
			...mapGetters(["userAvater", "userName", "userId"])
		},
		methods: {
			butUserMsg(htmlData) {
				if (this.userMsg.length || htmlData) {
					let div = document.createElement("div");
					div.classList.add("user-chat", "advchat-msg");
					div.innerHTML = `
							    <div class="user-chat-avator advchat-msg-avator">
							        <img src="${this.userAvater || this.defCover}" alt />
							    </div>
							    <div class="user-chat-con advchat-msg-con">
							        ${htmlData ? htmlData : this.userMsg}
							         <div class="user-chat-con__l advchat-msg-con_l">
							            <i class="el-icon-caret-right"></i>
							        </div>
							    </div>`;
					this.webK.send(
						JSON.stringify({
							content: this.userMsg,
							nickname: this.userName,
							nickname2: this.admin.Admin_realName
						})
					);
					this.$refs.advCon.appendChild(div);
					this.goBot = !this.goBot;
					this.userMsg = "";
				}
			},
			connectSer() {
				this.webK = new myWebS(`${webChatU}${this.userName}`);
				this.webK.conSuss(() => {
					console.log("连接用户成功");
				});
				this.webK.message(data => {
					if (data.isSelf) {
						let div = document.createElement("div");
						div.classList.add("admin-chat", "advchat-msg");
						div.innerHTML = `
							    <div class="admin-chat-avator advchat-msg-avator">
								    <img src="${this.admin.Admin_avaterPath || this.defCover}" alt />
								</div>
								<div class="admin-chat-con advchat-msg-con">
									${data.content}
									<div class="admin-chat-con__l advchat-msg-con_l">
										<i class="el-icon-caret-left"></i>
										<i class="el-icon-arrow-left admin-chat-con__l-line"></i>
									</div>
								</div>`;
						this.$refs.advCon.appendChild(div);
						this.goBot = !this.goBot;
					}
				});
			},
			sendMsgKey(e) {
				if (e.keyCode == 13) {
					this.butUserMsg();
				}
			},
			queryAdmin() {
				queryAdmin('全能管理员').then(data => {
					this.admin = data.admin;
				});
			},
			queryHouseData(type, title) {
				this.showLod = true;
				this.choiceTitle = title;
				switch (type) {
					case 0:
						this.advHoses();
						break;
					case 1:
						this.advCollect();
						break;
					case 2:
						this.advBes();
						break;
				}
			},
			advHoses() {
				searchHouse(
					{
						area_str: "",
						rent_str: "",
						shape_str: "",
						months_str: "",
						skipNum: `${this.skipNum}`,
						sizeNum: `${this.sizeNum}`,
						noLoading: true
					},
					data => {
						if (data.Code == "200") {
							console.log(data);
							this.houseData = data.Data._Items;
						}
					}
				);
			},
			advCollect() {
				let obj = { user_id: this.userId, noLoading: true };
				queryOwnCollect(obj).then(res => {
					this.houseData = res.data;
				});
			},
			advBes() {
				let obj = {
					noLoading: true,
					user_id: this.userId,
					bs_type: 1
				};
				queryBespeak(obj).then(res => {
					res.data.forEach(item => {
						let obj = {};
						for (let [key, value] of Object.entries(item)) {
							obj[key[0].toUpperCase() + key.slice(1)] = value;
						}
						this.houseData.push(obj);
					});
				});
			},
			goHouseDetial(House_id) {
				this.$router.push(`/hdetail?House_id=${House_id}`);
			},
			sendHouse(index) {
				let htmlData = `
					    <div class="advh-item advh-item--min">
						    <div class="advh-item__cover">
									<img src="${this.houseData[index].House_coverPic}" alt />
								</div>
								<article class="advh-item__info">
								<p class="advh-item__info__t">${this.houseData[index].House_title}</p>
								<p>
									<span>${this.houseData[index].House_shape}</span>
									<span class="advh-item__info__spli">|</span>
									<span>${this.houseData[index].House_direction}</span>
									<span class="advh-item__info__spli">|</span>
									<span>${this.houseData[index].House_area}㎡</span>
								</p>
								<p>
									<span>${this.houseData[index].House_rent}</span>
									<span class="advh-item__info__spli">|</span>
									<span>${this.getChname(this.houseData[index].House_months)}</span>
								</p>
					        </article>
		                </div>`;
				this.showLod = false;
				this.butUserMsg(htmlData);
			},
			getChname(value) {
				switch (true) {
					case value == "1":
						return "押一付一";
					case value == "2":
						return "押一付二";
					case value == "3":
						return "押一付三";
					default:
						return "";
				}
			}
		},
		created() {
			this.connectSer();
			this.queryAdmin();
		},
		beforeDestroy() {
			this.webK.close();
		},
		filters: {}
	};
</script>

<style lang="scss">
.adv-container {
	height: 100%;
}
.adv-box {
	height: calc(100% - 125px);
	min-height: 700px;
	display: flex;
	&-con {
		border: 2px solid #ddd;
		box-sizing: border-box;
		width: 116.8rem;
		margin: auto;
		height: 700px;
		background-color: #ffffff;
		display: flex;
	}
}
.adv-chat {
	width: 70%;
	&__info {
		height: 540px;
		background-color: #f5f5f5;
	}
	&-con {
		padding: 0 10px 10px;
		&::before {
			display: table;
			content: "";
		}
		&__hint {
			background-color: #dadada;
			width: fit-content;
			margin: 10px auto;
			color: #fff;
			border-radius: 2px;
			font-size: 12px;
			padding: 2px 5px;
		}
	}
}
.adv-user {
	background-color: #fff;
	padding: 0 20px 19px 10px;
}
.adv-menu {
	li {
		cursor: pointer;
		display: inline-block;
		transition: color 0.2s;
		margin: 10px 15px;
		margin-left: 0;
		i {
			margin-right: 5px;
		}
		&:hover {
			color: #00c0c4;
		}
	}

	&-item {
	}
}
.adv-msg {
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
.adv-hint {
	width: 30%;
	background-color: #fff;
	padding: 30px 10px;
	box-shadow: 0 0 10px hsla(0, 66%, 86%, 0.55);
}
.adv-weixin {
	&__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		&--r {
			cursor: pointer;
			transition: transform 0.2s;
			transform: rotate(0deg);
			&--click {
				transform: rotate(-180deg);
			}
		}
		&--l {
			display: flex;
			align-items: flex-end;
			img {
				width: 20px;
				height: 20px;
			}
			span {
				color: #333;
				margin: 0 5px;
			}
			div {
				color: #fff;
				background-color: #00c0c4;
				border-radius: 2em;
				font-size: 12px;
				padding: 0 5px;
			}
		}
	}
	&__body {
		transition: height 0.3s;
		height: auto;
		padding: 10px 0;
		overflow: hidden;
		&--tit {
			width: fit-content;
			color: #fff;
			background-color: #00c0c4;
			font-size: 18px;
			margin: 0 auto;
			font-weight: bolder;
			border-top-left-radius: 5px;
			border-top-right-radius: 5px;
			padding: 0 5px;
		}
		&--img {
			border: 4px solid #00c0c4;
			width: fit-content;
			margin: 0 auto;
		}
		img {
			width: 150px;
			height: 150px;
		}
		&--pro {
			width: fit-content;
			margin: 0 auto;
			font-size: 12px;
			color: #787878;
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
.advchat-msg {
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
.advh {
    border-radius: 4px;
	position: absolute !important;
	background-color: #fff;
	width: 380px;
	height: 360px;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	padding: 12px;
	box-sizing: border-box;
	&-scroll {
		height: 298px;
	}
	&-ul {
		padding-right: 12px;
	}
	&-close {
		text-align: center;
        padding-bottom: 15px;
        position: relative;
		// margin-right: 4px;
		i {
            position: absolute;
            top: 0;
            right: 0;
			color: #909399;
			cursor: pointer;
			&:hover {
				color: #3dbcca;
			}
		}
	}
	&-item {
		display: flex;
		padding: 15px 0;
		background-color: #fff;
		border-bottom: 1px solid #ddd;
		& > &--min {
			p {
				margin-bottom: 5px;
			}
		}
		&__cover {
			width: 130px;
			height: 80px;
			margin-right: 14px;
			img {
				height: 100%;
				width: 100%;
			}
		}
		&__info {
			width: 150px;
			color: #606266;
			font-size: 0;
			&__t {
				font-size: 12px;
			}
			&__spli {
				margin: 0 5px;
			}
			span {
				font-size: 12px;
			}
			p {
				margin-bottom: 10px;
			}
			p:last-child {
				margin-bottom: 0;
			}
		}
		&__nav {
			flex-grow: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			i:last-child {
				margin-top: 10px;
			}
			i {
				cursor: pointer;
				font-size: 20px;
				color: #606266;
			}
			i:hover {
				color: #00c0c4;
			}
		}
	}
}
</style>