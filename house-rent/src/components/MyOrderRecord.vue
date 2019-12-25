<template>
	<div>
		<header class="header">
			<div>
				<i class="myiconfont icon-shoucang"></i>
				<span>订单交易记录</span>
			</div>
		</header>
		<ul class="orderre-box" ref="orderReBox">
			<li v-if="orderReArr.length == 0" class="orderre-box--no">
				<p class="orderre-box--no__title">无交易记录！～</p>
				<router-link class="orderre-box--no__next" to="/h">去找房</router-link>
			</li>
			<li v-else>
				<el-table :data="orderReArr" ref="orderDeTable" height="400">
					<!-- <el-table-column label="预约时间">
						<template slot-scope="scope">
							<span>{{scope.row.Bs_time | getTime}}</span>
						</template>
					</el-table-column>
					<el-table-column label="预约房源">房源信息</el-table-column>
					<el-table-column label="联系人" width="150"></el-table-column>
					<el-table-column label="操作" width="150"></el-table-column>-->
				</el-table>
			</li>
		</ul>
	</div>
</template>

<script>
	import { orderTradeInfo, queryOrder } from "@/api/user";
	import { mapGetters } from "vuex";
	export default {
		data() {
			return {
				orderReArr: [],
				total: 0,
				skipNum: 1,
				sizeNum: 10
			};
		},
		methods: {
			getOrderTra() {
				this.$myLoadding.open(this.$refs.orderReBox);
				orderTradeInfo({
					user_id: this.userId,
					skipNum: this.skipNum,
					sizeNum: this.sizeNum,
					noLoading: true
				}).then(res => {
					if (res.status) {
						console.log(res.Data);
						this.orderReArr = res._Items;
						let getOrder = res._Items.map(item => {
							return;
						});
						this.total = res.Total;
					}

					this.$myLoadding.hide();
				});
			}
		},
		computed: {
			...mapGetters(["userId"])
		},
		mounted() {
			this.getOrderTra();
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
	display: flex;
	justify-content: space-between;
	span {
		margin-left: 15px;
	}
}
.orderre-box {
	min-height: 500px;
	position: relative;
}
.orderre-box--no {
	height: 200px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
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