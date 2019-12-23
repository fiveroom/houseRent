<template>
	<section>
		<header class="header">
			<i class="el-icon-edit-outline"></i>
			<span>我的订单</span>
		</header>
		<section ref="MyOrder" class="order-box">
			<div v-if="orderList.length === 0" class="order--no">
				<p class="order--no__title">您还没有履行中的合同，快去签约吧！～</p>
				<router-link class="order--no__next" to="/h">去找房</router-link>
			</div>
			<div v-else>
				<el-table :data="orderList" style="width: 100%">
					<el-table-column prop="date" label="日期" width="180"></el-table-column>
					<el-table-column prop="name" label="姓名" width="180"></el-table-column>
					<el-table-column prop="address" label="地址"></el-table-column>
					<el-table-column prop="address" label="地址"></el-table-column>
					<el-table-column prop="address" label="地址"></el-table-column>
				</el-table>
			</div>
		</section>
	</section>
</template>

<script>
	import { mapGetters } from "vuex";
	import * as userApi from "@/api/user";
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
				orderList: []
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
						noLoading: true
					})
					.then(res => {
						if (res.data) {
							this.orderList = res.data;
						}
						this.$myLoadding.hide();
					});
			}
		},
		mounted() {
			this.getMyOrder();
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
</style>