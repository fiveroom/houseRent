<template>
	<div>
		<section class="contract">
			<p class="contract-title">
				<i class="el-icon-document"></i>
				<span>我的合同</span>
			</p>
			<div class="contract-box" ref="contract">
				<div v-if="contractList.length === 0" class="contract--no">
					<p class="contract--no__title">您还没有履行中的合同，快去签约吧！～</p>
					<router-link class="contract--no__next" to="/h">去找房</router-link>
				</div>
				<!-- <ul v-else class="con-body"> -->
				<el-table
					:data="contractList"
					:border="true"
					ref="orderTable"
					@selection-change="(value)=>{checkOrderCon = value}"
				>
					<el-table-column prop="Con_id" label="合同编号"></el-table-column>
					<el-table-column prop="House_address" label="签约房源地址"></el-table-column>
					<el-table-column label="签约日期">
						<template slot-scope="scope">
							<div>{{scope.row.Con_startTime | getTime}}</div>
						</template>
					</el-table-column>
					<el-table-column label="到期时间">
						<template slot-scope="scope">
							<div>{{scope.row.Con_endTime | getTime}}</div>
						</template>
					</el-table-column>
					<el-table-column label="合同状态">
						<template slot-scope="scope">
							<div>{{scope.row.Con_isSigned | judegStatus}}</div>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="300px">
						<template slot-scope="scope">
							<div class="user-do">
								<div @click="download(scope.row.Con_path, scope.row.Con_id)">下载合同</div>
								<div @click="showBig(scope.row.Con_path)">查看合同</div>
								<router-link :to="`/userDetail/myOrder?Con_id=${scope.row.Con_id}`">查看订单</router-link>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<el-dialog :visible.sync="showConImage">
				<img width="100%" :src="showConImageUrl" alt />
			</el-dialog>
		</section>
	</div>
</template>

<script>
	import { saveAs } from "file-saver";
	import { mapGetters } from "vuex";
	import { queryCtractIn, dowloadFile } from "@/api/user";
	export default {
		data() {
			let avator = require("@/assets/avator.jpg");
			return {
				avator,
				showConImage: false,
				showConImageUrl: null,
				contractList: []
			};
		},
		computed: {
			...mapGetters(["userId", "userName", "telDeal", "userAvater"]),
			timeHint() {
				let time = new Date().getHours();
				switch (true) {
					case 0 <= time && time < 6:
						return "凌晨好";
					case 6 <= time && time < 11:
						return "上午好";
					case 11 <= time && time < 13:
						return "中午好";
					case 13 <= time && time < 18:
						return "下午好";
					case 18 <= time && time < 23:
						return "晚上好";
					default:
						return "你好";
				}
			}
		},
		methods: {
			getCtractIn() {
				// 获取合同
				this.$myLoadding.open(this.$refs.contract);
				queryCtractIn({ user_id: this.userId, noLoading: true }).then(
					res => {
						this.contractList = res.data;
						this.$myLoadding.hide();
					}
				);
			},
			// 展示图片
			showBig(url) {
				this.showConImageUrl = url;
				this.showConImage = true;
			},
			downloadIamge(url) {
				console.log(url);
			},

			download(imgSrc, num) {
				this.createIframe(imgSrc);
			}
		},
		mounted() {
			this.getCtractIn();
		},
		filters: {
			getTime(value) {
				let date = new Date(value);
				return `${date.getFullYear()}.${date.getMonth() +
					1}.${date.getDate()}`;
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
			},
			judegStatus(value) {
				if (value == "Y") {
					return "生效";
				}
				return "失效";
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
	display: flex;
	justify-content: space-between;
	span {
		margin-left: 15px;
	}
}
.contract-box {
	position: relative;
}
.contract {
	&-title {
		padding: 3rem 0 2.4rem;
		font-size: 1.8rem;
		line-height: 2.1rem;
		color: #333;
		span {
			margin-left: 1.4rem;
		}
	}
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
.contract--no {
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
.user-do {
	display: flex;
	align-items: center;
	cursor: pointer;
	div,
	a {
		font-size: 12px;
		display: block;
		flex-shrink: 0;
		transition: all 0.3s;
		border: 1px solid #3dbcc6;
		padding: 2px 10px;
		border-radius: 2rem;
		color: #606266;
		&:hover {
			color: #fff;
			background-color: #3dbcc6;
		}
		&:active {
			background-color: #2fa4ad;
		}
	}
	div {
		margin-right: 10px;
	}
}
</style>