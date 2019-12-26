<template>
	<div>
		<header-nav />
		<section class="container">
			<section class="container-left">
				<div class="lunbo">
					<div class="show-img">
						<!-- 未处理鼠标滚动 -->
						<div class="view-img">
							<img :src="showImg.showBigImg" alt />
							<i v-show="showImgIndex != 0" @click="toLeft" class="el-icon-arrow-left to-left"></i>
							<i
								v-show="showImgIndex != showImg.showImgLen - 1"
								class="el-icon-arrow-right to-right"
								@click="toRight"
							></i>
							<div class="collect-house" title="收藏" @click="handleCollect">
								<i
									:class="[userCollect?'collect-house--have':'collect-house--no','myiconfont icon-shoucang']"
								></i>
							</div>
						</div>
						<!-- 下方小图片 -->
						<div class="choice-img" ref="choiceImg">
							<ul
								class="choice-img-ul"
								ref="choiceImgUl"
								:style="{'transform': `translateX(${clickImageDis}px)`}"
							>
								<li
									:class="{'shade': index != showImgIndex}"
									v-for="(item, index) in showImg.showSmallImg"
									:key="index"
									@click="showImgIndex = index"
								>
									<img :src="item" :data-imgIndex="index" alt />
								</li>
							</ul>
							<div
								:class="['choice-mini choice-mini__l', showImgIndex == 0?'choice-mini--hid':'']"
								@click="toLeft"
							>
								<i class="el-icon-arrow-left"></i>
							</div>
							<div
								:class="['choice-mini choice-mini__r', showImgIndex == showImg.showImgLen - 1?'choice-mini--hid':'']"
								@click="toRight"
							>
								<i class="el-icon-arrow-right"></i>
							</div>
						</div>
					</div>
				</div>
				<!-- 房屋简介 -->
				<section class="detail">
					<header :class="['detail-title',detailFiexd?'detail-title__fixed':'']">
						<ul class="detail-title-l">
							<li :class="detailIndex == 0?'detail-title-l--active':''" @click="detailIndex=0">
								<a href="#house-des">房源简介</a>
							</li>
							<li :class="detailIndex == 1?'detail-title-l--active':''" @click="detailIndex=1">
								<a href="#rent-info">租约信息</a>
							</li>
							<li :class="detailIndex == 2?'detail-title-l--active':''" @click="detailIndex=2">
								<a href="#ambitus">周边配套</a>
							</li>
							<li class="slidline" :style="{'transform': `translateX(${detailIndex*80}px)`}"></li>
						</ul>
						<div class="detail-title-r">
							<div class="collect-house collect-house--noposi" title="收藏" @click="handleCollect">
								<i
									:class="[userCollect?'collect-house--have':'collect-house--no','myiconfont icon-shoucang']"
								></i>
								<span>收藏</span>
							</div>
						</div>
					</header>
					<div :class="detailFiexd?'detail-title-wrap':''"></div>
					<div class="detial-sec detial-sec--no">
						<h2 class="detail-h2" id="house-des">房源简介</h2>
						<div class="detail-body">{{House.House_detail}}</div>
					</div>
					<div class="detial-sec" id="rent-info">
						<h2 class="detail-h2">租约信息</h2>
						<div class="detail-body"></div>
					</div>
				</section>
			</section>
			<section class="container-right">
				<!-- 房源信息 -->
				<div class="house-info">
					<h1 class="house-t" v-text="House.House_title"></h1>
					<p class="house-p">
						<span class="house-p-big">￥</span>
						<span class="house-p-big">{{House.House_rent}}</span>
						<span>/月</span>
						<span>·</span>
						<span>（{{House.House_months | getChname}}）</span>
					</p>
					<div class="house-rent">
						<div class="house-rent__t">押金</div>
						<p>￥{{House.House_pledge}}</p>
					</div>
					<ul class="house-type">
						<li>
							<p class="house-type__t">{{House.House_area}}㎡</p>
							<p class="house-type__c">建筑面积</p>
						</li>
						<li>
							<p class="house-type__t">朝{{House.House_direction}}</p>
							<p class="house-type__c">朝向</p>
						</li>
						<li>
							<p class="house-type__t">{{House.House_shape}}</p>
							<p class="house-type__c">户型</p>
						</li>
					</ul>
					<ul class="house-other">
						<li class="house-other__li">
							<p>位置</p>
							<p>{{House.House_address}}</p>
						</li>
						<li class="house-other__li">
							<p>楼层</p>
							<p>{{House.House_floor}}</p>
						</li>
					</ul>
				</div>
				<!-- 预约看房 -->
				<div
					:class="[subscribeShow && !subscribePosi?'subscribe-contain':'',subscribePosi?'subscribe-contain-posi':'' ]"
				>
					<div class="subscribe">
						<h2 class="subscribe-t" v-show="subscribeShow">
							<span>{{House.House_title}}</span>
							<span class="subscribe-d">·</span>
							<span>{{House.House_shape}}</span>
						</h2>
						<p class="house-p subscribe-p" v-show="subscribeShow">
							<span class="house-p-big">￥</span>
							<span class="house-p-big">{{House.House_rent}}</span>
							<span>/月</span>
							<span>（{{House.House_months | getChname}}）</span>
						</p>
						<Mybutton title="预约看房" @clickTo="subscribe" />
						<p v-if="houseCollectNumM" class="subscribe-like">房源已被收藏{{houseCollectNumM}}次</p>
					</div>
					<div class="admin">
						<div class="admin-avator">
							<img :src="Admin.Admin_avaterPath || defaultAvator" alt />
						</div>
						<div class="admin-info">
							<p>{{Admin.Admin_realName}}</p>
							<p>{{Admin.Admin_tel}}</p>
						</div>
					</div>
					<div class="weixin" v-if="showWeiXin">
						<div class="weixin-c">
							<i @click="showWeiXin = false" class="el-icon-close"></i>
						</div>
						<div class="weixin-i">
							<div class="weixin-i__p">
								<img :src="weixinTuP" alt />
							</div>
							<div class="weixin-i__des">
								<p>扫码进入微信小程序</p>
								<p>即时接收房源优惠及订阅信息~</p>
							</div>
						</div>
					</div>
				</div>
				<!-- 预约信息添加 -->
				<el-dialog title="咨询约看" :visible.sync="subscribeEdit" width="30%">
					<section>
						<div class="admin admin-see">
							<div class="admin-avator">
								<img :src="Admin.Admin_avaterPath" alt />
							</div>
							<div class="admin-info">
								<p>{{Admin.Admin_realName}}</p>
								<p>提交约看后我会尽快联系您确认时间和地点</p>
							</div>
						</div>
						<div class="subfrom">
							<div class="subfrom-div-choice">
								<el-date-picker :clearable="false" v-model="subDate" type="datetime" placeholder="选择日期"></el-date-picker>
							</div>
							<div class="subfrom-div">
								<MyInput
									v-model="userTel"
									class="subfrom-div__inp"
									placeholder="手机号码"
									:regStr="userPhoneRex"
									@inputStatus="(status)=>{userPhoneStatus = status}"
									:upStatus="subfromStatus"
									:required="true"
									lable="userPhone"
									@keyDownTo="keyDown"
									:judgeNum="judgeNum"
								/>
								<div class="subfrom-div__cho" v-if="!inputkeyDown">
									<el-switch v-model="seePhone" @change="showPhone" active-color="#2878ff"></el-switch>
								</div>
							</div>
							<MyInput v-model="userRemark" placeholder="备注" lable="userRemark" />
							<Mybutton class="subfrom-but" title="提交约看" @clickTo="confimSub" />
						</div>
					</section>
				</el-dialog>
			</section>
		</section>
		<section id="ambitus">
			<div class="map-box">
				<h2 class="detail-h2">周边配套</h2>
				<div class="map"></div>
			</div>
		</section>
		<Footer />
	</div>
</template>

<script>
	import * as houseApi from "@/api/house";
	import mixin from "@/mixin";
	import * as userApi from "@/api/user";
	import { mapActions, mapGetters } from "vuex";
	export default {
		data() {
			let userPhoneRex = {
				reg: /^1[3456789]\d{9}/,
				hint: "手机号码格式不正确"
			};
			let serverImg = [
				require("@/assets/img/server01.png"),
				require("@/assets/img/server02.png"),
				require("@/assets/img/server03.png"),
				require("@/assets/img/server01.png"),
				require("@/assets/img/server02.png"),
				require("@/assets/img/server03.png"),
				require("@/assets/img/server01.png"),
				require("@/assets/img/server02.png"),
				require("@/assets/img/server03.png")
			];
			let defaultAvator = require("@/assets/avator.jpg");
			let weixinTuP = require("@/assets/house.jpg");
			return {
				defaultAvator,
				weixinTuP,
				HousePicture: [],
				House: {},
				Admin: {},
				showWeiXin: true,
				subscribeEdit: false, // 添加预约窗口
				subDate: new Date(), // 预约时间
				cpUserTel: null, // copyPhone
				userTel: null, // 电话号码
				userPhoneStatus: false, //
				userPhoneRex,
				seePhone: false, // 看号码
				subfromStatus: true, //
				userRemark: "", //
				inputkeyDown: false,
				judgeNum: 1, // 检验次数1
				houseCollectNumM: null,
				showImgIndex: 0, // 图片展示
				serverImg,
				clickImageDis: 0,
				userCollect: false,
				detailIndex: 0,
				detailFiexd: false,
				subscribeShow: false,
				subscribePosi: false,
				hintI: { duration: 1500, title: "收藏" }
			};
		},
		filters: {
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
		watch: {
			showImgIndex(newV, oldV) {
				let distanceSmallImg = 120 * 2 - this.showImgIndex * 120;
				if (this.showImgIndex > 1) {
					if (this.showImgIndex > this.serverImg.length - 3) {
						distanceSmallImg =
							this.$refs.choiceImg.clientWidth -
							(this.serverImg.length + 1) * 120;
					}
					this.clickImageDis = distanceSmallImg;
				}
			},
			$route() {
				this.getHouseDetail();
				this.judgeCollect();
			}
		},
		computed: {
			...mapGetters(["tel", "telDeal", "userId"]),
			// 分类
			showImg() {
				return {
					showBigImg: this.serverImg[this.showImgIndex],
					showSmallImg: this.serverImg,
					showImgLen: this.serverImg.length
				};
			}
		},
		mixins: [mixin],
		methods: {
			getHouseDetail() {
				houseApi.houseDetail(
					{
						house_id: this.$route.query.House_id
					},
					res => {
						if (res.status) {
							this.HousePicture = res.Data.HousePicture;
							this.House = res.Data.House;
							this.Admin = res.Data.Admin || {};
							houseApi
								.houseCollectNum({
									house_id: this.House.House_id
								})
								.then(res => {
									this.houseCollectNumM = res.data;
								});
						}
					}
				);
			},
			subscribe() {
				if (this.judgeUser()) {
					this.userTel = this.telDeal;
					this.cpUserTel = this.tel;
					this.subscribeEdit = true;
				}
			},
			// 提交约看
			confimSub() {
				this.subfromStatus =
					this.userTel.includes("****") || this.userPhoneStatus;
				if (this.subfromStatus) {
					let obj = {
						bespeak: JSON.stringify({
							Bs_type: 1,
							User_id: this.userId,
							User_tel: this.cpUserTel,
							House_id: this.House.House_id,
							Admin_id: 21,
							Bs_time: this.subDate,
							Bs_isDeal: false,
							Bs_content: this.userRemark || "无"
						})
					};
					console.log(this.subDate);
					userApi.addBespeak(obj).then(res => {
						let hint = {
							title: "预约",
							duration: 1500,
							showClose: false,
							message: res.msg
						};
						if (res.status) {
							this.$notify.success(hint);
						} else {
							this.$notify.error(hint);
						}
						this.subscribeEdit = false;
					});
				}
			},
			showPhone(value) {
				if (value) {
					this.userTel = this.cpUserTel;
				} else {
					this.userTel = this.userTel.replace(
						/(?<=\d{3})(\d{4})(?=\d{4})/g,
						"****"
					);
				}
			},
			keyDown() {
				if (this.judgeNum == 1) {
					this.userTel = "";
					this.inputkeyDown = true;
					this.judgeNum++;
				}
			},
			toRight() {
				if (this.showImgIndex + 1 != this.serverImg.length) {
					this.showImgIndex++;
				}
			},
			toLeft() {
				if (this.showImgIndex != 0) {
					this.showImgIndex--;
				}
			},
			// 收藏判断
			judgeCollect() {
				if (this.userId) {
					let res = userApi.queryOwnCollect({ user_id: this.userId });
					res.then(data => {
						console.log(data, "我的收藏");
						this.userCollect = data.data.some(item => {
							return item.House_id == this.$route.query.House_id;
						});
						console.log(this.userCollect);
					});
				}
			},
			// 添加移除收藏
			handleCollect() {
				if (this.judgeUser()) {
					let res = null;
					let obj = {
						user_id: this.userId,
						noLoading: true
					};
					if (this.userCollect) {
						userApi
							.deleteOwnCollectBatch({
								...obj,
								house_idStr: `${this.House.House_id}`
							})
							.then(res => {
								let obj = {
									title: "收藏",
									duration: 1500,
									message: res.msg
								};
								if (!res.status) {
									this.$notify.error(obj);
								} else {
									this.$notify.success(obj);
									this.userCollect = !this.userCollect;
								}
							});
					} else {
						userApi
							.addOwnCollect({
								...obj,
								house_id: this.House.House_id
							})
							.then(res => {
								let obj = {
									title: "收藏",
									duration: 1500,
									message: res.msg
								};
								if (!res.status) {
									this.$notify.error(obj);
								} else {
									this.userCollect = !this.userCollect;
									this.$notify.success(obj);
								}
							});
					}
				}
			},
			// 节流
			judgeheight() {
				if (window.pageYOffset >= 650) {
					this.detailFiexd = true;
				} else {
					this.detailFiexd = false;
				}
				if (window.pageYOffset >= 600) {
					this.subscribeShow = true;
				} else {
					this.subscribeShow = false;
				}
				if (window.pageYOffset >= 1098) {
					this.subscribePosi = true;
				} else {
					this.subscribePosi = false;
				}
			},
			// 添加滚动事件
			addScrollEvent() {
				window.addEventListener("scroll", this.judgeheight);
			}
		},
		created() {
			this.getHouseDetail();
			this.judgeCollect();
		},
		mounted() {
			this.addScrollEvent();
		},
		beforeDestroy() {
			window.removeEventListener("scroll", this.judgeheight);
		},
		destroyed() {
			// window.removeEventListener("scroll", this.judgeheight);
		}
	};
	// 展示图切换
</script>

<style lang="scss" scoped>
	$hoverColor: #00bfc8;
	$fontLightColor: #3dbcc6;
	$noCheckFontColor: #dadce0;
	$baseFontColor: #00000099;
	.container {
		width: 116.8rem;
		margin: 2rem auto 0;
		display: flex;
		&-left {
			flex-shrink: 0;
			width: 76.4rem;
		}
		&-right {
			flex-grow: 1;
			margin-left: 3rem;
			position: relative;
		}
	}
	.lunbo {
		width: 764px;
		margin-bottom: 2rem;
	}
	.house-info {
		height: 54rem;
		margin-bottom: 2rem;
		&::before {
			display: table;
			content: "";
		}
	}
	.house {
		&-t {
			line-height: 32px;
			font-size: 24px;
			margin: 0.67em 0;
		}
		&-p {
			display: flex;
			align-items: center;
			font-size: 0;
			transform: translateX(-7px);
			span {
				font-size: 24px;
				color: $fontLightColor;
			}
			& > &-big {
				font-size: 30px;
			}
		}
		&-rent {
			display: flex;
			align-items: center;
			margin-top: 18px;
			padding-bottom: 10px;
			border-bottom: 1px solid #f0f0f0;
			&__t {
				width: 64px;
				flex-shrink: 0;
				text-align: justify;
				height: 28px;
				line-height: 28px;
				margin-right: 7px;
				&::after {
					display: inline-block;
					width: 100%;
					content: "";
				}
			}
			p:last-of-type {
				color: $fontLightColor;
			}
		}
		&-type {
			display: flex;
			justify-content: space-between;
			// text-align: center;
			padding: 21px 0 10px 0;
			border-bottom: 1px solid #f0f0f0;
			&__t {
				font-size: 20px;
				color: #000;
			}
			&__c {
				margin-top: 6px;
				color: rgba(0, 0, 0, 0.4);
			}
		}
		&-other {
			&__li {
				padding: 10px 0;
				border-bottom: 1px solid #f0f0f0;
				display: flex;
				font-size: 17px;
				p:first-of-type {
					width: 62px;
					color: #9f9f9f;
					line-height: 19px;
					height: 19px;
				}
			}
			margin-bottom: 52px;
		}
	}
	.subscribe-contain {
		position: fixed;
		top: 60px;
		&-posi {
			position: absolute;
			bottom: 0;
		}
	}
	.subscribe {
		padding: 20px;
		border: 1px solid #f0f0f0;
		&-t {
			font-size: 0;
			margin: 10px 0;
			span {
				font-size: 17px;
			}
		}
		&-d {
			margin: 0 5px;
		}
		&-p {
			margin-bottom: 2rem;
		}
		&-like {
			font-size: 14px;
			text-align: center;
			padding-top: 16px;
			color: #9f9f9f;
		}
	}
	.admin {
		margin-top: 20px;
		display: flex;
		&-info {
			padding: 12px 12px 0;
			p:first-of-type {
				font-size: 18px;
				color: #000;
			}
			p:last-of-type {
				margin-top: 4px;
				font-size: 15px;
				color: #9f9f9f;
			}
		}
		&-avator {
			width: 60px;
			height: 60px;
			img {
				border-radius: 50%;
				overflow: hidden;
				height: 100%;
				width: 100%;
			}
		}
		&-see {
			margin-bottom: 20px;
		}
	}
	.weixin {
		margin-top: 20px;
		padding: 0 20px 20px;
		border: 1px solid #f0f0f0;
		&-c {
			&::before {
				display: table;
				content: "";
			}
			padding-top: 6px;
			text-align: end;
			font-size: 16px;
			line-height: 16px;
			i {
				margin-right: -10px;
				cursor: pointer;
			}
		}
		&-i {
			display: flex;
			margin-top: -10px;
			&__p {
				width: 60px;
				height: 60px;
				img {
					width: 100%;
					height: 100%;
				}
				margin-right: 14px;
			}
			&__des {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				color: rgba(0, 0, 0, 0.85);
				font-size: 15px;
				line-height: 30px;
				font-weight: 600;
			}
		}
	}
	::v-deep .el-dialog__body {
		padding-top: 0;
	}
	.subfrom {
		padding: 0 12px;
		input {
			border: 0;
			outline: none;
		}
		&-div {
			display: flex;
			justify-content: space-between;
			align-items: center;
			&__cho {
				font-size: 22px;
				cursor: pointer;
				margin-left: 15px;
			}
			&__inp {
				flex-grow: 1;
			}
			&-choice {
				margin-bottom: 2rem;
			}
		}
	}
	::v-deep .el-input--prefix .el-input__inner {
		border: 0;
		border-bottom: 1px solid #999999;
		font-size: 16px;
		outline: none;
		border-radius: 0;
		padding: 0;
	}
	::v-deep .el-date-editor {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	::v-deep .el-date-editor.el-input {
		width: auto;
	}
	::v-deep .el-icon-date::before {
		content: "\e6df";
	}
	::v-deep .el-input__prefix {
		position: static;
		cursor: pointer;
		font-size: 22px;
		margin-left: 15px;
	}
	.subfrom-but {
		margin-top: 2rem;
	}
	.show-img {
		width: 764px;
		position: relative;
		& > .view-img {
			height: 440px;
			background-color: #f9f9f9;
			position: relative;
		}
		& > .choice-img {
			margin-top: 10px;
			overflow: hidden;
			height: 90px;
			position: relative;
		}
		& > .show-big {
			z-index: 30;
			position: absolute;
			width: 530px;
			height: 530px;
			top: 0;
			left: 450px;
			overflow: hidden;
			display: none;
			background: #f9f9f9;
			z-index: 100;
			& > .big-img-show {
				// 4倍
				width: 880px;
				height: 880px;
				position: absolute;
			}
		}
	}
	.view-img {
		// height: 573px;
		overflow: hidden;
		display: flex;
		&:hover {
			& > i {
				display: block;
			}
		}
		& > i {
			z-index: 100;
			display: none;
			height: 40px;
			font-size: 40px;
			cursor: pointer;
			color: rgba($color: #000000, $alpha: 0.5);
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			&:first-of-type {
				left: 0;
			}
			&:last-of-type {
				right: 0;
			}
		}
		img {
			width: 100%;
			height: 100%;
		}
		& > .show-big {
			position: absolute;
			width: 530px;
			height: 530px;
			top: 0;
			left: 450px;
			overflow: hidden;
			display: none;
			& > .big-img-show {
				// 4倍
				width: 880px;
				height: 880px;
				position: absolute;
			}
		}
	}
	.choice-img-ul {
		font-size: 0;
		position: relative;
		width: max-content;
		height: 100%;
		transition: transform 0.3s;
		& > li {
			display: inline-block;
			width: 120px;
			height: 90px;
			margin-right: 10px;
			cursor: pointer;
			position: relative;
			&:last-of-type {
				margin-right: 0;
			}
			& > img {
				width: 100%;
				height: 100%;
			}
		}
		& > li.shade::after {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			content: "";
			background-color: rgba(255, 255, 255, 0.7);
		}
	}
	.choice-mini {
		cursor: pointer;
		position: absolute;
		height: 100%;
		top: 0;
		width: 30px;
		text-align: center;
		transition: all 0.5s;
		background-color: rgba(0, 0, 0, 0.1);
		opacity: 1;
		&__l {
			left: 0;
			border-top-right-radius: 5px;
			border-bottom-right-radius: 5px;
		}
		&__r {
			right: 0;
			border-top-left-radius: 5px;
			border-bottom-left-radius: 5px;
		}
		i {
			color: #fff;
			font-size: 30px;
			vertical-align: middle;
		}
		&:hover {
			background-color: rgba(0, 0, 0, 0.4);
		}
		&::after {
			content: "";
			vertical-align: middle;
			display: inline-block;
			height: 100%;
			width: 0;
		}
		&--hid {
			opacity: 0;
		}
	}
	.collect-house {
		position: absolute;
		right: 10px;
		top: 10px;
		font-size: 0;
		cursor: pointer;
		&--no {
			color: #fff;
		}
		&--have {
			color: #fb6650;
		}
		i {
			transition: color 0.3s;
			font-size: 25px;
		}

		&--noposi {
			position: inherit;
			background-color: #3dbcc6;
			padding: 2px 5px;
			border-radius: 5px;
			span {
				font-size: 15px;
				color: #fff;
				vertical-align: middle;
				margin-left: 5px;
			}
			i {
				font-size: 18px;
				vertical-align: middle;
			}
		}
		&:hover > i {
			color: #fb6650;
		}
	}
	.detail {
		overflow: hidden;
		&-title {
			width: 116.8rem;
			display: flex;
			align-items: center;
			height: 50px;
			justify-content: space-between;
			background-color: #fff;
			position: relative;
			&-l {
				height: 100%;
				width: 764px;
				border-top: 1px solid rgba(0, 0, 0, 0.12);
				display: flex;
				align-items: center;
				font-size: 15px;
				line-height: 50px;
				position: relative;
				box-sizing: border-box;
				a {
					color: rgba(0, 0, 0, 0.4);
				}
				li {
					cursor: pointer;
					height: 100%;
					margin-right: 20px;
				}
				&--active {
					a {
						color: #3dbcc6;
					}
				}
				li.slidline {
					top: 0;
					position: absolute;
					width: 60px;
					height: 2px;
					background-color: #3dbcc6;
					transition: transform 0.3s;
				}
			}
			&__fixed {
				position: fixed;
				top: 0;
				border-bottom: 1px solid rgba(0, 0, 0, 0.12);
				z-index: 1;
			}
			&-wrap {
				height: 50px;
			}
		}
	}
	.detail-h2 {
		color: rgba(0, 0, 0, 0.85);
		font-size: 24px;
		margin-bottom: 2rem;
	}
	.detial-sec {
		margin-top: 6rem;
		&--no {
			margin-top: 0;
		}
	}
	.detail-body {
		height: 300px;
	}
	.map-box {
		width: 116.8rem;
		margin: 6rem auto 0;
	}
	.map {
		height: 420px;
		background-color: skyblue;
	}
</style>