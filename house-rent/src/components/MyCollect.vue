<template>
	<div>
		<header class="header">
			<div>
				<i class="myiconfont icon-shoucang"></i>
				<span>我的收藏</span>
			</div>
			<span class="edit-collect" @click="editCollect=!editCollect">管理收藏</span>
		</header>
		<ul class="collect-box" ref="collectBox">
			<li v-if="arrCollect.length == 0" class="collect-box--no">
				<p class="collect-box--no__title">您还没有收藏房源，快去添加吧！～</p>
				<router-link class="collect-box--no__next" to="/h">去找房</router-link>
			</li>
			<li v-else>
				<el-table
					:data="arrCollect"
					ref="collTable"
					height="400"
					@selection-change="value=>choiceCollect=value"
				>
					<!-- @selection-change="(value)=>{checkOrderCon = value}" -->
					<el-table-column v-if="editCollect" type="selection"></el-table-column>
					<el-table-column label="房源信息">
						<template slot-scope="scope">
							<div class="house-info">
								<router-link class="house-info__img" :to="`/hdetail?House_id=${scope.row.House_id}`">
									<img :src="scope.row.House_coverPic" alt />
								</router-link>
								<div class="house-info__d">
									<router-link class="house-info__t" :to="`/hdetail?House_id=${scope.row.House_id}`">
										<span>{{scope.row.House_title}}&nbsp;{{scope.row.House_address}}</span>
									</router-link>
									<p>
										<span>{{scope.row.House_floor}}</span>
										<span>|</span>
										<span>{{scope.row.House_area}}平方米</span>
										<span>|</span>
										<span>{{scope.row.House_shape}}</span>
									</p>
								</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="价格" width="100">
						<template slot-scope="scope">
							<span>{{scope.row.House_rent}}元/月</span>
						</template>
					</el-table-column>
					<el-table-column label="状态" width="100">
						<template slot-scope="scope">
							<span>{{scope.row.House_isRented | getName}}</span>
						</template>
					</el-table-column>
					<el-table-column label="收藏人数" width="100">
						<template slot-scope="scope">
							<span>{{scope.row.houseCollectNumM}}</span>
						</template>
					</el-table-column>
				</el-table>
				<div class="eidt-mycol">
					<div class="eidt-mycol__do">
						<div @click="$refs.collTable[0].clearSelection()">取消</div>
						<div @click="removeColl">移除收藏</div>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import { queryOwnCollect, deleteOwnCollectBatch } from "@/api/user";
	import { queryHouseCollectAmount } from "@/api/house";
	import { mapGetters } from "vuex";
	import { async } from "q";
	export default {
		data() {
			return {
				arrCollect: [], // 我的收藏
				editCollect: false,
				choiceCollect: []
			};
		},
		computed: {
			...mapGetters(["userId"])
		},
		methods: {
			getOwnCollect() {
				this.$myLoadding.open(this.$refs.collectBox);
				queryOwnCollect({ user_id: this.userId, noLoading: true }).then(
					async res => {
						let arrHouseId = res.data.map(item => {
							return queryHouseCollectAmount({
								house_id: item.House_id,
								noLoading: true
							});
						});
						let resArr = await Promise.all(arrHouseId);
						res.data.forEach((item, index) => {
							item.houseCollectNumM = resArr[index].num;
						});
						this.arrCollect = res.data;
						this.arrCollect.sort((a,b)=>{
							// return a. 
						
						})
						this.$myLoadding.hide();
					}
				);
			},
			removeColl() {
				if (this.choiceCollect.length > 0) {
					let obj = {
						house_idStr: this.choiceCollect
							.map(item => item.House_id)
							.join(),
						user_id: this.userId,
						noLoading: true
					};
					deleteOwnCollectBatch(obj).then(res => {
						let hint = {
							title: "收藏",
							duration: 1500,
							message: res.msg
						};
						if (res.status) {
							this.$notify.success(hint);
						} else {
							this.$notify.error(hint);
						}
						this.getOwnCollect();
						this.editCollect = false;
					});
				}
			}
		},
		mounted() {
			this.getOwnCollect();
		},
		filters: {
			getName(value) {
				if (value === "N") {
					return "未出租";
				} else {
					return "已出租";
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
		display: flex;
		justify-content: space-between;
		span {
			margin-left: 15px;
		}
	}
	.edit-collect {
		color: #3dbcc6;
		font-size: 14px;
		cursor: pointer;
	}
	.collect-box {
		min-height: 500px;
		position: relative;
	}
	.collect-box--no {
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
	.house-info {
		display: flex;
		&__img {
			display: block;
			height: 91px;
			width: 137px;
			img {
				width: 100%;
				height: 100%;
			}
		}
		&__d {
			margin-left: 15px;
		}
		&__t {
			color: #606266;
			&:hover {
				color: #3dbcc6;
			}
		}
	}

	::v-deep .el-table {
		font-size: 12px;
	}
	.eidt-mycol {
		margin-top: 15px;
		display: flex;
		height: 30px;
		justify-content: flex-end;
		transition: height 0.1s;
		overflow: hidden;
		&__do {
			font-size: 0;
			div {
				display: inline-block;
				font-size: 14px;
				color: #23527c;
				padding: 0 14px;
				border-radius: 2em;
				border: 1px solid #3dbcc6;
				line-height: 28px;
				cursor: pointer;
				transition: all 0.2s;
				&:hover {
				}
				&:active {
					color: #fff;
					background-color: #3dbcc6;
				}
			}
			div:first-child {
				margin-right: 15px;
			}
		}
	}
</style>