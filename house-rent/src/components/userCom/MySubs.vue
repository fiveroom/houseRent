<template>
	<div>
		<header class="header">
			<div class="header__l">
				<i class="myiconfont icon-shoucang"></i>
				<span>我的预约</span>
			</div>
			<div class="mybestype">
				<el-radio-group class="mybestype-l" v-model="basIndex">
					<el-badge is-dot class="mybadge" v-for="item in bespeakType" :key="item.index">
						<el-radio :label="item.index">{{item.name}}</el-radio>
					</el-badge>
				</el-radio-group>
				<span class="mybestype-spli">|</span>
				<el-radio-group class="mybestype-r" v-model="basType">
					<el-badge is-dot class="mybadge">
						<el-radio label="Y">已处理</el-radio>
					</el-badge>
					<el-badge is-dot class="mybadge">
						<el-radio label="N">未处理</el-radio>
					</el-badge>
					<el-badge is-dot v-show="basIndex==1" class="mybadge mybadge-no">
						<el-radio label="S">已看房</el-radio>
					</el-badge>
				</el-radio-group>
			</div>
		</header>
		<ul class="subs-box" ref="subsBox">
			<li v-if="!haveData" class="subs-box--no">
				<p class="subs-box--no__title">您还没有预约看房，快去添加吧！～</p>
				<router-link class="subs-box--no__next" to="/h">去找房</router-link>
			</li>
			<li v-else>
				<el-table
					:data="arrSubs"
					ref="collTable"
					height="500"
					@selection-change="(value)=>{checkSubs = value}"
				>
					<el-table-column type="selection"></el-table-column>
					<el-table-column :label="timeType" width="110px">
						<template slot-scope="scope">
							<span>{{getTimeCh(scope.row.bs_time)}}</span>
						</template>
					</el-table-column>
					<el-table-column label="预约房源" width="280px">
						<template slot-scope="scope">
							<div class="house-info">
								<router-link class="house-info__img" :to="`/hdetail?House_id=${scope.row.house_id}`">
									<img :src="scope.row.house_coverPic" alt />
								</router-link>
								<div class="house-info__d">
									<router-link class="house-info__t" :to="`/hdetail?House_id=${scope.row.house_id}`">
										<span>{{scope.row.house_title}}&nbsp;{{scope.row.house_address}}</span>
									</router-link>
									<p>
										<span>{{scope.row.house_area}}平方米</span>
										<span>|</span>
										<span>{{scope.row.house_shape}}</span>
									</p>
								</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="状态">
						<template slot-scope="scope">
							<div class="hint-status">
								<span>{{getDealStu(scope.row.bs_isDeal).msg}}</span>
								<div
									class="hint-status__icon"
									:style="{'background-color':getDealStu(scope.row.bs_isDeal).color}"
								>
									<i class="el-icon-check"></i>
								</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column label="工作人员电话">
						<template slot-scope="scope">
							<span>{{scope.row.admin_tel}}</span>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="110">
						<template slot-scope="scope">
							<div
								:class="['editdo',scope.row.bs_isDeal == 'N'?  'editdo--can':'']"
								:style="{}"
								@click="openDiag(scope.row)"
							>修改{{besTypeName}}时间</div>
						</template>
					</el-table-column>
				</el-table>
				<div class="eidt-mycol">
					<div class="eidt-mycol__do">
						<div @click="$refs.collTable.clearSelection()">取消</div>
						<div @click="removeColl">移除预约</div>
					</div>
				</div>
			</li>
		</ul>
		<el-dialog title="编辑预约信息" :visible.sync="editSbus" width="30%" :before-close="handleClose">
			<div class="subfrom-div-choice">
				<el-date-picker :clearable="false" v-model="subDate" type="datetime" placeholder="选择日期"></el-date-picker>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editSbus = false">取消</el-button>
				<el-button type="primary" @click="editSubsDo();editSbus = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import * as userApi from "@/api/user";
	import { mapGetters, mapState } from "vuex";
	export default {
		data() {
			let bespeakType = [
				{
					name: "看房",
					index: 1
				},
				{
					name: "续租",
					index: 2
				},
				{
					name: "退租",
					index: 3
				}
			];
			let besDealType = [
				{
					name: "已处理",
					index: "Y"
				},
				{
					name: "未处理",
					index: "N"
				},
				{
					name: "已看房",
					index: "S"
				}
			];
			return {
				arrSubs: [], // 我的收藏
				editCollect: false,
				choiceSubs: [],
				bespeakType,
				activeName: "first",
				editSubs: false,
				checkSubs: [],
				hintMs: { duration: 1000, title: "预约", showClose: false },
				editSbusId: null,
				editSbus: false,
				subDate: null, // 新的时间
				oldDate: null, // 旧的时间
				typeSubs: "0",
				haveData: false,
				basType: "Y",
				basIndex: 1,
				besDealType
			};
		},
		computed: {
			...mapGetters(["userId"]),
			...mapState({
				bsRemind: state => state.user.bsRemind,
				conRemind: state => state.user.conRemind
			}),
			timeType() {
				switch (this.basIndex) {
					case 1:
						return "预约时间";
					case 2:
						return "续租时间";
					case 3:
						return "退租时间";
				}
			},
			besTypeName() {
				switch (this.basIndex) {
					case 1:
						return "预约";
					case 2:
						return "续租";
					case 3:
						return "退租";
				}
			}
		},
		// 1,看房，2,续住，3,退租
		methods: {
			querySubs() {
				let obj = {
					noLoading: true,
					user_id: this.userId,
					bs_type: this.basIndex
				};
				this.arrSubs = [];
				this.$myLoadding.open(this.$refs.subsBox);
				userApi.queryBespeak(obj).then(res => {
					this.haveData = res.status;
					switch (this.basType) {
						case "Y":
							if (this.basIndex != 1) {
								this.arrSubs = res.data.filter(item => {
									return item.bs_isDeal != "N";
								});
							} else {
								this.arrSubs = res.data.filter(item => {
									return item.bs_isDeal == "Y";
								});
							}
							break;
						case "N":
							this.arrSubs = res.data.filter(item => {
								return item.bs_isDeal == "N";
							});
							break;
						case "S":
							this.arrSubs = res.data.filter(item => {
								return item.bs_isDeal == "S";
							});
							break;
					}
					this.arrSubs.sort((a, b) => {
						return new Date(b.bs_time) - new Date(a.bs_time);
					});
					this.$myLoadding.hide();
				});
			},
			async delMySubs() {
				this.$myLoadding.open(this.$refs.subsBox);
				let asyArr = this.checkSubs.map(item => {
					return userApi.delBespeak({
						bs_id: item.bs_id,
						noLoading: true
					});
				});
				let res = await Promise.all(asyArr);
				res.forEach(item => {
					if (!item.status) {
						this.$notify({ ...this.hintMs, message: item.msg });
					}
				});
				this.$myLoadding.hide();
				this.querySubs();
			},
			removeColl() {
				if (this.checkSubs.length == 0) {
					this.$notify.warning({
						...this.hintMs,
						message: "未选择预约消息"
					});
				} else if (
					this.checkSubs.some(item => {
						return item.bs_isDeal == "N";
					})
				) {
					this.$msgBox({
						title: "预约移除提示",
						message:
							"当前选择中存在未处理事件，若移除将不再处理。是否继续？",
						showCancelButton: true,
						confirmButtonText: "继续",
						cancelButtonText: "取消",
						beforeClose: (action, instance, done) => {
							if (action === "confirm") {
								done();
								this.delMySubs();
							} else {
								done();
							}
						}
					}).then(() => {});
					// this.delMySubs();
				} else {
					this.delMySubs();
				}
			},
			handleClose(done) {
				if (this.oldDate != this.subDate) {
					this.$msgBox({
						title: "提示",
						message: "是否保存修改",
						showCancelButton: true,
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						beforeClose: async (action, instance, done) => {
							if (action === "confirm") {
								await this.editSubsDo();
								instance.confirmButtonLoading = false;
								done();
							} else {
								done();
							}
						}
					}).then(action => {
						done();
					});
				}
				done();
			},
			editSubsDo() {
				let now = new Date();
				let date = new Date(this.subDate);
				if (date < now) {
					let hintObj = { ...this.hintMs, message: "不能小于当前时间" };
					this.$notify.error(hintObj);
				} else {
					date = `${date.getFullYear()}-${date.getMonth() +
						1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
					let obj = {
						bs_id: this.currBsId,
						bs_time: date,
						noLoading: true
					};
					this.$myLoadding.open(this.$refs.subsBox);
					userApi.updateBespeak(obj).then(res => {
						let hintObj = { ...this.hintMs, message: res.msg };
						if (res.status) {
							this.$notify.success(hintObj);
						} else {
							this.$notify.error(hintObj);
						}
						this.editSbusId = null;
						this.subDate = null;
						this.oldDate = null;
						this.currBsId = null;
						this.$myLoadding.hide();
						this.querySubs();
					});
				}
			},
			openDiag(row) {
				if (row.bs_isDeal == "N") {
					this.editSbusId = row.bs_id;
					this.editSbus = true;
					this.subDate = row.bs_time;
					this.oldDate = row.bs_time;
					this.currBsId = row.bs_id;
				}
			},
			getTwo(value) {
				return `${value}`.padStart(2, "0");
			},
			getTimeCh(value) {
				let date = new Date(value);
				return `${date.getFullYear()}-${this.getTwo(
					date.getMonth() + 1
				)}-${this.getTwo(date.getDate())} ${this.getTwo(
					date.getHours()
				)}:${this.getTwo(date.getMinutes())}:${this.getTwo(
					date.getSeconds()
				)}`;
			},
			getDealStu(value) {
				switch (value) {
					case "N":
						return { msg: "未处理", color: "#e6a23c" };
					case "Y":
						if (this.basIndex != 1) {
							return {
								msg: this.basIndex == 2 ? "已续租" : "已退租",
								color: "#67c23a"
							};
						}
						return { msg: "已处理", color: "#67c23a" };
					case "S":
						return { msg: "已看房", color: "#3dbcc6" };
					case "C":
						return { msg: "用户取消", color: "#e6a23c" };
					case "R":
						return { msg: "管理员拒绝", color: "#f56c6c" };
				}
			}
		},
		mounted() {
			this.querySubs();
		},
		watch: {
			basType(newValue, oldValue) {
				this.querySubs();
			},
			basIndex(newV, oldV) {
				if (newV != 1 && oldV == 1) {
					this.basType = "N";
				}
				this.querySubs();
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
		display: flex;
		padding-bottom: 3rem;
		&__l {
			font-size: 1.8rem;
			line-height: 2.1rem;

			span {
				margin-left: 15px;
			}
		}
		color: #333;
		border-bottom: 1px solid #f1f1f1;
		justify-content: space-between;
	}
	.mytab {
		position: relative;
	}
	.subs-box {
		min-height: 500px;
		position: relative;
	}
	.subs-box--no {
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
				color: #49ced8;
				padding: 0 14px;
				border-radius: 2em;
				border: 1px solid #3dbcc6;
				line-height: 28px;
				cursor: pointer;
				transition: all 0.2s;
				&:hover {
					color: #fff;
					background-color: #49ced8;
				}
				&:active {
					color: #fff;
					background-color: #43cbd4;
				}
			}
			div:first-child {
				margin-right: 15px;
			}
		}
		&-choice:active {
			border-color: #3dbcc6;
			& > option {
				border-color: #3dbcc6;
			}
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
	.editdo {
		width: 86px;
		text-align: center;
		border-radius: 2em;
		font-size: 12px;
		height: 24px;
		line-height: 22px;
		color: #fff;
		border: 1px solid transparent;
		background-color: rgba(0, 0, 0, 0.2);
		cursor: default;
		&--can {
			cursor: pointer;
			color: #3dbcc6;
			border-color: #3dbcc6;
			background-color: #fff;
			transition: all 0.2s;
			&:hover {
				color: #fff;
				background-color: #3dbcc6;
			}
		}
	}
	.house-info {
		font-size: 12px;
		display: flex;
		&__img {
			flex-shrink: 0;
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
			display: inline-block;
			width: 100px;
			color: #606266;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
			&:hover {
				color: #3dbcc6;
			}
		}
	}
	::v-deep .el-table--border::after,
	.el-table--group::after,
	.el-table::before {
		z-index: 0;
	}
	::v-deep .el-radio {
		margin-right: 5px;
	}
	.mybestype {
		transition: width 0.2s;
		&-r {
			margin-left: 10px;
		}
		&-l {
			margin-right: 10px;
		}
		&-spli {
			color: #9999a4;
		}
	}
	.mybadge {
		vertical-align: initial;
		margin-right: 20px;
		&-no {
			margin-right: 20px;
		}
	}
	::v-deep .mybadge.el-badge__content.is-fixed.is-dot {
		right: 20px !important;
	}
</style>