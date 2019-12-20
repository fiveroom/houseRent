<template>
	<div>
		<header-nav />
		<section class="container">
			<section class="container-left">
				<div class="lunbo"></div>
				<!-- 房屋简介 -->
				<div>
					<h2>房屋简介</h2>
					<p>{{House.House_detail}}</p>
				</div>
			</section>
			<section class="container-right">
				<!-- 房源信息 -->
				<div>
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
				<div>
					<div class="subscribe">
						<h2 class="subscribe-t">
							<span>{{House.House_title}}</span>
							<span class="subscribe-d">·</span>
							<span>{{House.House_shape}}</span>
						</h2>
						<p class="house-p subscribe-p">
							<span class="house-p-big">￥</span>
							<span class="house-p-big">{{House.House_rent}}</span>
							<span>/月</span>
							<span>（{{House.House_months | getChname}}）</span>
						</p>
						<Mybutton title="预约看房" @clickTo="subscribe" />
						<p class="subscribe-like">房源已被收藏3次</p>
					</div>
					<div class="admin">
						<div class="admin-avator">
							<img :src="Admin.Admin_avaterPath" alt />
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
								<img src alt />
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
								<el-date-picker :clearable="false" v-model="subDate" type="date" placeholder="选择日期"></el-date-picker>
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
							<Mybutton
								class="subfrom-but"
								title="提交约看"
								v-loading.fullscreen.lock="fullLoading"
								@clickTo="confimSub"
							/>
						</div>
					</section>
				</el-dialog>
			</section>
		</section>
	</div>
</template>

<script>
	import * as houseApi from "@/api/house";
	import mixin from "@/mixin";
	import * as userApi from "@/api/user";
	import { mapActions, mapGetters } from "vuex";
	import { Loading, Notification } from "element-ui";
	export default {
		data() {
			let userPhoneRex = {
				reg: /^1[3456789]\d{9}/,
				hint: "手机号码格式不正确"
			};
			return {
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
				fullLoading: false, // 加载框
				inputkeyDown: false,
				judgeNum: 1 // 检验次数1
			};
		},
		watch: {},
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
		computed: {
			...mapGetters(["tel", "telDeal", "userId"])
		},
		mixins: [mixin],
		beforeRouteEnter(to, from, next) {
			next(vm => {});
		},
		methods: {
			getHouseDetail() {
				console.log(this.$route.query.House_id);
				houseApi.houseDetail(
					{
						house_id: this.$route.query.House_id
					},
					res => {
						if (res.status) {
							this.HousePicture = res.Data.HousePicture;
							this.House = res.Data.House;
							this.Admin = res.Data.Admin;
						} else {
						}
						console.log(res, "房子详情");
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
			test() {
				console.log("object");
			},
			confimSub() {
				this.subfromStatus =
					this.userTel.includes("****") || this.userPhoneStatus;
				if (this.subfromStatus) {
					this.fullLoading = true;
					userApi.addBespeak(
						{
							bespeak: JSON.stringify({
								Bs_type: 1,
								User_id: this.userId,
								User_tel: this.cpUserTel,
								House_id: this.House.House_id,
								Admin_id: this.House.Admin_id,
								Bs_time: this.subDate,
								Bs_isDeal: false,
								Bs_content: this.userRemark || "无"
							})
						},
						res => {
							let obj = {
								showClose: false,
								position: "top-left",
								duration: 1000
							};
							if (res.status) {
								Notification.success({ ...obj, message: res.msg });
							} else {
								Notification.warning({ ...obj, message: res.msg });
							}
							this.subscribeEdit = false;
							this.fullLoading = false;
						}
					);
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
			}
		},
		created() {
			this.getHouseDetail();
		}
	};
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
			background-color: red;
			height: 300px;
		}
		&-right {
			flex-grow: 1;
			margin-left: 3rem;
			height: 300px;
		}
	}
	.lunbo {
		height: 673px;
		background-color: skyblue;
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
	::v-deep .el-input--prefix .el-input__inner {
		padding: 0;
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
</style>