<template>
	<section>
		<header class="header">
			<i class="el-icon-edit-outline"></i>
			<span>我的订单</span>
		</header>
		<div class="house-info">
			<div class="house-info__l">
				<div class="house-info__cov">
					<img :src="House.House_coverPic" alt />
				</div>
				<ul class="house-detail">
					<li class="house-detail__t">
						<span>{{House.House_title}}</span>
						<span>·</span>
						<span>{{House.House_months | getChname}}</span>
					</li>
					<li class="house-price">
						<span class="house-price__sym">￥租金</span>
						<span class="house-price__rent">{{House.House_rent}}</span>
						<span class="house-price__pledge house-price__pledge--l">押金￥</span>
						<span class="house-price__pledge">{{House.House_pledge}}</span>
					</li>
				</ul>
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
		</div>
		<section ref="MyOrder" class="order-box">
			<div v-if="orderList.length === 0" class="order--no">
				<p class="order--no__title">您还没有履行中的合同，快去签约吧！～</p>
				<router-link class="order--no__next" to="/h">去找房</router-link>
			</div>
			<div v-else>
				<el-table
					:data="orderList"
					:border="true"
					ref="orderTable"
					@selection-change="(value)=>{checkOrderCon = value}"
				>
					<el-table-column type="selection"></el-table-column>
					<el-table-column label="支付日期">
						<template slot-scope="scope">
							<span>{{scope.row.Order_time | getTime}}</span>
						</template>
					</el-table-column>
					<el-table-column label="应支付">
						<template slot-scope="scope">
							<span>{{scope.row.Order_shouldPay}}</span>
							<span v-if="scope.row.index">(含押金{{scope.row.House_pledge}})</span>
						</template>
					</el-table-column>
					<el-table-column prop="Order_alreadyPay" label="实支付"></el-table-column>
					<el-table-column label="支付状态" width="150px">
						<template slot-scope="scope">
							<div class="hint-status">
								<div v-if="scope.row.judgePay.status == 1">支付成功</div>
								<div v-else-if="scope.row.judgePay.status == 2">
									<el-tooltip effect="dark" content="如需线下请联系上方管理员" placement="top">
										<span class="topay" @click="toPayOrder(scope.row.Order_id,scope.row.judgePay.should)">线上支付</span>
									</el-tooltip>
								</div>
								<!-- <router-link v-else-if="scope.row.judgePay.status == 2" to="#" class="topay"></router-link> -->
								<router-link v-else to="#">去补交</router-link>
								<div class="hint-status__icon" :style="hintStatusStlye(scope.row.judgePay.status)">
									<i class="el-icon-check"></i>
								</div>
							</div>
						</template>
					</el-table-column>
				</el-table>
				<!-- <div class="many-item">
					<div>
						<span>总计</span>
						<span></span>
					</div>
					<div>支付</div>
				</div> -->
			</div>
		</section>
	</section>
</template>

<script>
	import { mapGetters } from "vuex";
	import * as userApi from "@/api/user";
	import { houseDetail } from "@/api/house";
	export default {
		data() {
			let a = {
				Order_id: 1,
				Con_id: 1,
				Admin_id: 2,
				User_id: 1,
				House_months: 3,
				House_pledge: 1200,
				Order_shouldPay: 1200,
				Order_alreadyPay: 1200,
				Order_time: "2019-12-18 00:00:00.0000000",
				Order_isPaid: "Y"
			};
			return {
				orderList: [],
				HousePicture: null,
				House: {},
				Admin: {},
				checkOrderIndex: []
			};
		},
		computed: {
			...mapGetters(["userId"])
		},
		methods: {
			getMyOrder() {
				this.$myLoadding.open(this.$refs.MyOrder);
				userApi
					.queryOrder({
						user_id: this.userId,
						con_id: this.$route.query.Con_id,
						noLoading: true
					})
					.then(res => {
						if (res.data) {
							this.orderList = res.data;
							this.orderList.sort((a, b) => {
								let res =
									new Date(a.Order_time) - new Date(b.Order_time);
								return res;
							});
							this.orderList.forEach(item => {
								item.judgePay = this.judegPayStatus(
									item.Order_shouldPay,
									item.Order_alreadyPay
								);
							});
							this.orderList[0].index = true;
						}
						this.$myLoadding.hide();
					});
			},

			judegPayStatus(should, realy) {
				switch (true) {
					case should === realy:
						return {
							status: 1
						};
					case realy == 0:
						return {
							status: 2,
							should: should
						};
					case should > realy:
						return {
							status: 3,
							should: parseFloat(should) - parseFloat(realy)
						};
				}
			},
			getHouseInfo() {
				houseDetail(
					{
						house_id: this.$route.query.House_id
					},
					res => {
						if (res.status) {
							this.HousePicture = res.Data.HousePicture;
							this.House = res.Data.House;
							this.Admin = res.Data.Admin;
						}
					}
				);
			},
			hintStatusStlye(value) {
				switch (true) {
					case value == 1:
						return {
							"background-color": "rgb(103, 194, 58)"
						};
					case value == 2:
						return {};
					case value == 3:
						return {
							"background-color": "rgb(245, 108, 108)"
						};
				}
			},
			toPayOrder(con_id, payAmount){
				this.$myLoadding.open(this.$refs.MyOrder, '等待支付中');
				window.open(`http://192.168.3.5:8888/payController/pay?order_id=${con_id}&payAmount=${payAmount}`);

			}
		},

		mounted() {
			this.getMyOrder();
			this.getHouseInfo();
		},
		filters: {
			getTime(value) {
				let date = new Date(value);
				let mouth = `${date.getMonth() + 1}`.padStart("2", "0");
				return `${date.getFullYear()}.${mouth}.${date.getDate()}`;
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
		}
	};
</script>
<style lang="scss" scoped>
	$hoverColor: #00bfc8;
	$fontLightColor: #3dbcc6;
	$bacHoerClr: #3dbcc6;
	$NoHover: #999999;
	.header {
		padding-bottom: 3rem;
		font-size: 1.8rem;
		line-height: 2.1rem;
		border-bottom: 1px solid #f1f1f1;
		color: #333;
		span {
			margin-left: 15px;
		}
	}
	.house-info {
		margin-left: 10px;
		height: 130px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		&__cov {
			width: 150px;
			height: 90px;
			background-color: red;
			img {
				width: 100%;
				height: 100%;
			}
		}
		&__l {
			display: flex;
		}
	}
	.house-detail {
		margin-left: 16px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		&__t {
			font-size: 22px;
			font-weight: bold;
			cursor: pointer;
			transition: color 0.3;
			&:hover {
				color: rgb(61, 188, 198);
			}
		}
	}
	.house-price {
		font-size: 20px;
		&__pledge {
			font-size: 16px;
			color: rgb(102, 102, 102);
			&--l {
				margin-left: 10px;
			}
		}
	}
	.order-box {
		position: relative;
	}
	.order {
		&--have {
			border-bottom: 1px solid #f1f1f1;
		}
		&--no {
			height: 200px;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
		}
	}
	.order--no {
		&__title {
			font-size: 16px;
			color: #999;
		}
		&__next {
			display: block;
			background-color: #fff;
			min-width: 180px;
			width: auto;
			height: 50px;
			font-size: 1.8rem;
			line-height: 4.6rem;
			text-align: center;
			border: 2px solid #3dbcc6;
			border-radius: 33px;
			box-sizing: border-box;
			color: $hoverColor;
			padding: 0 30px;
			transition: all 0.2s;
			margin-top: 2rem;
			&:hover {
				background-color: $bacHoerClr;
				color: #fff;
			}
		}
	}

	.admin {
		display: flex;
		margin-left: 10px;
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
	.hint-status {
		display: flex;
		align-items: center;
		&__icon {
			height: 20px;
			line-height: 20px;
			width: 34px;
			text-align: center;
			border-radius: 2em;
			font-size: 16px;
			color: #fff;
			margin-left: 10px;
			i {
				font-weight: bolder;
			}
			background-color: rgba(0, 0, 0, 0.2);
			&--succuss {
				background-color: rgb(103, 194, 58);
			}
		}
	}
	.table-order {
		border: 1px solid #f1f1f1;
		padding: 10px;
	}
	.topay {
		color: #3dbcc6;
		cursor: pointer;
	}
	.many-item {
	}
</style>