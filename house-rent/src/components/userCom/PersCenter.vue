<template>
	<!-- 1未生效  2待签字 3已生效  4 失效 -->
	<div>
		<header class="header">
			<div class="header__left">
				<img :src="userAvater || avator" alt />
			</div>
			<div class="header__right">
				<div>
					<p class="header__right--name">{{userName || telDeal}}</p>
					<p class="header__right--hint">{{timeHint}}</p>
				</div>
				<div class="header__right__next">
					<router-link to="/userDetail/editInfo">修改资料&nbsp;</router-link>
					<i class="el-icon-arrow-right"></i>
				</div>
			</div>
		</header>
		<section class="contract">
			<div class="contract-title">
				<div class="contract-title__h">
					<i class="el-icon-document"></i>
					<span>我的合同</span>
				</div>
			</div>
			<div class="contract-box" ref="contract">
				<el-tabs type="border-card" @tab-click="({index})=>{tabsIndex = index}">
					<el-tab-pane>
						<div slot="label" class="per-heder-box">
							<el-badge :is-dot="conRemind.some(item=>item.Mge_type == 3)" class="per-heder-badge">生效中</el-badge>
						</div>
						<div v-if="contractList.length == 0" class="contract--hint">
							<div class="contract--no">
								<p class="contract--no__title">您还没有履行中的合同，快去签约吧！～</p>
								<router-link class="contract--no__next" to="/h">去找房</router-link>
							</div>
						</div>
						<el-table
							v-else
							:data="contractList"
							ref="orderTable0"
							@selection-change="(value)=>{checkOrderCon = value}"
							height="380"
							@row-click="choiceCurrRow"
						>
							<el-table-column label="签约房源地址">
								<template slot-scope="scope">
									<el-badge :is-dot="conRemind.some(item=>item.Link_id == scope.row.Con_id)" class="besinfo">
										<router-link
											style="color: #606266"
											:to="`/hdetail?House_id=${scope.row.House_id}`"
											title="查看房屋详情"
										>{{scope.row.House_address}}</router-link>
									</el-badge>
								</template>
							</el-table-column>
							<el-table-column label="合同签约时区" width="260px">
								<template slot-scope="scope">
									<span>{{getTimeCh(scope.row.Con_startTime)}}</span>
									<span>~</span>
									<span>{{getTimeCh(scope.row.Con_endTime)}}</span>
								</template>
							</el-table-column>
							<el-table-column label="操作" width="300px">
								<template slot-scope="scope">
									<div class="user-do">
										<div @click="conDetialInfo(scope.row.Con_path)" class="user-do--base user-do--ok">查看合同</div>
										<router-link
											class="user-do--base user-do--ok"
											:to="`/userDetail/myOrder?con_id=${scope.row.Con_id}&house_id=${scope.row.House_id}`"
										>查看账单</router-link>
										<div
											:class="['user-do--base',scope.row.retreatStu || scope.row.reletStu? 'user-do--no':'user-do--ok']"
											@click="throwLease(scope.row, true)"
										>{{scope.row.retreatStu?'已发起':'退租'}}</div>
										<div
											:class="['user-do--base',scope.row.reletStu || scope.row.retreatStu? 'user-do--no':'user-do--ok']"
											@click="throwLease(scope.row)"
										>{{scope.row.reletStu?'已发起':'续租'}}</div>
									</div>
								</template>
							</el-table-column>
						</el-table>
					</el-tab-pane>
					<el-tab-pane>
						<div slot="label" class="per-heder-box">
							<el-badge :is-dot="conRemind.some(item=>item.Mge_type == 2)" class="per-heder-badge">待签字</el-badge>
						</div>
						<div v-if="contractList.length == 0" class="contract--hint">
							<div class="contract--no">
								<p class="contract--no__title">您还没有创建合同，快去签约吧！～</p>
								<router-link class="contract--no__next" to="/h">去找房</router-link>
							</div>
						</div>
						<el-table
							v-else
							:data="contractList"
							ref="orderTable1"
							@selection-change="(value)=>{checkOrderCon = value}"
							height="380"
							@row-click="choiceCurrRow"
						>
							<el-table-column label="签约房源地址">
								<template slot-scope="scope">
									<el-badge :is-dot="conRemind.some(item=>item.Link_id == scope.row.Con_id)" class="besinfo">
										<router-link
											style="color: #606266"
											:to="`/hdetail?House_id=${scope.row.House_id}`"
											title="查看房屋详情"
										>{{scope.row.House_address}}</router-link>
									</el-badge>
								</template>
							</el-table-column>
							<el-table-column label="合同签约时区" width="260px">
								<template slot-scope="scope">
									<span>{{getTimeCh(scope.row.Con_startTime)}}</span>
									<span>~</span>
									<span>{{getTimeCh(scope.row.Con_endTime)}}</span>
								</template>
							</el-table-column>
							<el-table-column label="操作" width="300px">
								<template slot-scope="scope">
									<div class="user-do">
										<div @click="conDetialInfo(scope.row.Con_path)" class="user-do--base user-do--ok">查看模板</div>
										<div @click="canvEvent(scope.row.Con_id)" class="user-do--base user-do--ok">上传签名</div>
									</div>
								</template>
							</el-table-column>
						</el-table>
					</el-tab-pane>
					<el-tab-pane>
						<div slot="label" class="per-heder-box">
							<el-badge :is-dot="conRemind.some(item=>item.Mge_type == 4)" class="per-heder-badge">已失效</el-badge>
						</div>
						<el-table
							:data="contractList"
							ref="orderTable2"
							@selection-change="(value)=>{checkOrderCon = value}"
							height="380"
							@row-click="choiceCurrRow"
						>
							<el-table-column label="签约房源地址">
								<template slot-scope="scope">
									<el-badge :is-dot="conRemind.some(item=>item.Link_id == scope.row.Con_id)" class="besinfo">
										<router-link
											style="color: #606266"
											:to="`/hdetail?House_id=${scope.row.House_id}`"
											title="查看房屋详情"
										>{{scope.row.House_address}}</router-link>
									</el-badge>
								</template>
							</el-table-column>
							<el-table-column label="合同签约时区" width="260px">
								<template slot-scope="scope">
									<span>{{getTimeCh(scope.row.Con_startTime)}}</span>
									<span>~</span>
									<span>{{getTimeCh(scope.row.Con_endTime)}}</span>
								</template>
							</el-table-column>
							<el-table-column label="操作" width="300px">
								<template slot-scope="scope">
									<div class="user-do">
										<div @click="conDetialInfo(scope.row.Con_path)" class="user-do--base user-do--ok">查看合同</div>
										<div
											class="user-do--base user-do--ok"
											@click="showMyOrder(scope.row.Con_id, scope.row.House_id)"
										>查看账单</div>
										<div
											:class="['user-do--base',scope.row.reletStu? 'user-do--no':'user-do--ok']"
											@click="throwLease(scope.row)"
										>续租</div>
									</div>
								</template>
							</el-table-column>
						</el-table>
					</el-tab-pane>
				</el-tabs>
			</div>
			<el-dialog
				:visible.sync="writeName"
				ref="myWrite"
				:before-close="closeWriteName"
				class="mywrite"
			>
				<div class="mywrite-box">
					<header class="mywrite-title">电子签名</header>
					<div class="mywrite-con">
						<canvas ref="mycanvas" width="500" height="300"></canvas>
					</div>
					<div class="mywrite-menu">
						<Mybutton @clickTo="ctx.clearRect(0, 0, 500, 300)" title="重写" />
						<Mybutton title="图片下载" />
						<Mybutton title="上传" @clickTo="upToContract" />
					</div>
				</div>
			</el-dialog>
			<el-dialog :visible.sync="rentOtherS" width="50%">
				<header class="rent-header">{{rentType == 'retreat'?'退租申请':'续租申请'}}</header>
				<div class="rent-conta">
					<div class="rent-hou">
						<div class="rent-info">
							<div>房源</div>
							<div>{{`${getTimeCh(rentData.Con_startTime)}~${getTimeCh(rentData.Con_endTime)}`}}</div>
						</div>
						<div class="house-info">
							<router-link class="house-info__img" :to="`/hdetail?House_id=${rentHouse.House_id}`">
								<img :src="rentHouse.House_coverPic" alt />
							</router-link>
							<div class="house-info__d">
								<router-link class="house-info__t" :to="`/hdetail?House_id=${rentHouse.House_id}`">
									<span>{{rentHouse.House_title}}&nbsp;{{rentHouse.House_address}}</span>
								</router-link>
								<p>
									<span>{{rentHouse.House_area}}平方米</span>
									<span>|</span>
									<span>{{rentHouse.House_shape}}</span>
								</p>
							</div>
						</div>
					</div>
					<div v-if="rentType == 'retreat'" class="rent-retreat">
						<div class="rent-retreat-price">
							<span>当前时间应退租金:&nbsp;&nbsp;</span>
							<span>{{rentPrice}}</span>
						</div>
						<div class="rent-retreat-time">
							<p>退租时间</p>
							<el-date-picker :clearable="false" v-model="rentRetDate" type="date" placeholder="退租时间"></el-date-picker>
						</div>
						<Mybutton class="rent-retreat-but" @clickTo="upRentInfo(3)" title="提交退租申请" />
					</div>
					<div v-else class="rent-retreat">
						<div class="rent-retreat-time">
							<p>续租时间</p>
							<el-date-picker :clearable="false" v-model="rentRetDate" type="datetime" placeholder="续租时间"></el-date-picker>
						</div>
						<Mybutton class="rent-retreat-but" @clickTo="upRentInfo(2)" title="提交续租申请" />
					</div>
				</div>
			</el-dialog>
		</section>
	</div>
</template>

<script>
	import { saveAs } from "file-saver";
	import { mapGetters, mapState, mapActions } from "vuex";
	import {
		queryCtractIn,
		dowloadFile,
		addBespeak,
		queryRentStu,
		getConIdByOrder,
		getRefund
	} from "@/api/user";
	import { upConName, houseDetail } from "@/api/house";
	export default {
		data() {
			let avator = require("@/assets/avator.jpg");
			return {
				avator,
				contractList: [],
				writeName: false,
				cavMouseDown: false,
				ctx: null,
				currConId: null,
				currConFielSrc: null,
				showConFIle: true,
				haveData: false,
				rentOtherS: false, // 框
				rentRetDate: new Date(), // 退租时间
				rentType: null, // 续租退租类别
				tabsIndex: "0",
				rentHouse: {},
				rentData: {},
				arrMsgConId: [],
				rentPrice: null
			};
		},
		computed: {
			...mapGetters(["userId", "userName", "telDeal", "userAvater", "tel"]),
			...mapState({
				conRemind: state => state.user.conRemind,
				payRemind: state => state.user.payRemind
			}),
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
			...mapActions(["delRemind"]),
			// 获取合同
			getCtractIn() {
				this.$myLoadding.open(this.$refs.contract);
				queryCtractIn({ user_id: this.userId, noLoading: true }).then(
					async res => {
						if (res.status) {
							this.haveData = true;
							switch (this.tabsIndex) {
								case "0":
									this.contractList = res.data.filter(item =>
										/Y/.test(item.Con_isSigned)
									);
									break;
								case "1":
									this.contractList = res.data.filter(item =>
										/N/.test(item.Con_isSigned)
									);
									break;
								case "2":
									this.contractList = res.data.filter(item =>
										/S/.test(item.Con_isSigned)
									);
									break;
							}
							let arrResult = await Promise.all(
								this.contractList.map(item => {
									return queryRentStu({
										user_id: this.userId,
										house_id: item.House_id
									});
								})
							);
							this.contractList.forEach((item, index) => {
								Object.assign(item, arrResult[index]);
							});
							this.contractList.sort(
								(a, b) =>
									new Date(b.Con_startTime) -
									new Date(a.Con_startTime)
							);
						}
						this.$myLoadding.hide();
					}
				);
			},
			// 签名
			canvEvent(id) {
				this.writeName = true;
				this.currConId = id;
				setTimeout(() => {
					let timer = setTimeout(() => {
						this.ctx = this.$refs.mycanvas.getContext("2d");
						this.$refs.mycanvas.onmousedown = e => {
							this.cavMouseDown = true;
							this.ctx.beginPath();
							this.ctx.moveTo(e.offsetX, e.offsetY);
						};
						this.$refs.mycanvas.onmouseup = e => {
							this.cavMouseDown = false;
						};

						document.body.addEventListener(
							"mousemove",
							this.drawingLine
						);
						clearTimeout(timer);
					});
				}, 1000);
			},
			drawingLine(e) {
				if (this.cavMouseDown) {
					this.ctx.lineTo(e.offsetX, e.offsetY);
					this.ctx.stroke();
				}
				e.preventDefault();
			},
			dataURLtoBlob(dataurl) {
				let arr = dataurl.split(","),
					mime = arr[0].match(/:(.*?);/)[1],
					bstr = atob(arr[1]),
					n = bstr.length,
					u8arr = new Uint8Array(n);
				while (n--) {
					u8arr[n] = bstr.charCodeAt(n);
				}
				return new Blob([u8arr], { type: mime });
			},
			// 签名上传
			upToContract() {
				this.$myLoadding.open("", "合同签名合成中", true);
				let dataUrl = this.$refs.mycanvas.toDataURL();
				this.$refs.mycanvas.toBlob(blobObj => {
					let formData = new FormData();
					formData.append("signFile", blobObj);
					formData.append("con_id", this.currConId);
					upConName(formData).then(res => {
						let hint = {
							duration: 1500,
							title: "签名",
							showClose: false,
							message: res.msg
						};
						console.log(res);
						this.$myLoadding.hide();
						this.writeName = false;
						this.ctx.clearRect(0, 0, 500, 300);
						this.ctx = null;
						this.getCtractIn();
						if (res.status) {
							this.$notify.success(hint);
						} else {
							this.$notify.error(hint);
						}
					});
				});
			},
			// 关闭写字板
			closeWriteName(done) {
				this.writeName = false;
				this.ctx.clearRect(0, 0, 500, 300);
				done();
			},
			// 时间格式化
			getTwo(value) {
				return `${value}`.padStart(2, "0");
			},
			// 时间格式化
			getTimeCh(value) {
				let date = new Date(value);
				return `${date.getFullYear()}-${this.getTwo(
					date.getMonth() + 1
				)}-${this.getTwo(date.getDate())}`;
			},
			lookDetailCont() {},
			// 合同详情查看
			conDetialInfo(fileUrl) {
				let hint = {
					duration: 1500,
					title: "合同",
					message: "合同格式有误请联系管理员,可在订单中查看"
				};
				if (fileUrl) {
					if (["docx", "pdf"].includes(fileUrl.split(".").pop())) {
						window.open(
							`https://view.officeapps.live.com/op/view.aspx?src=${fileUrl}`
						);
					} else {
						this.$notify.error(hint);
					}
				} else {
					this.$notify.error(hint);
				}
			},
			// 退租续租
			throwLease(rentData, retreat) {
				if (!rentData.done) {
					this.rentData = rentData;
					this.rentOtherS = true;
					if (retreat) {
						this.rentType = "retreat";
					} else {
						this.rentType = null;
					}
					houseDetail(
						{ house_id: rentData.House_id, noLoading: true },
						res => {
							this.rentHouse = res.Data.House;
							console.log(res, "结果");
						}
					);
					this.getCurrRefund();
				} else {
					this.$notify.error({
						message:
							"不能重复预约，若需修改时间或取消，可前往我的预约中修改。",
						title: "退租续租",
						duration: 1000
					});
				}
			},
			// 查询退还金额
			getCurrRefund() {
				getRefund({
					con_id: this.rentData.Con_id,
					dayTime: `${this.getTimeCh(this.rentRetDate)} 00:00:00.000` 
				}).then(res => {
					if(res.status){
						this.rentPrice = res.price
					} else {
						this.$notify.error({
							duration: 1000,
							message: '服务器故障请稍后再试',
							title: '退租'
						})
					}
				});
			},
			// 提交退租续租申请
			upRentInfo(type) {
				if (this.rentRetDate < new Date()) {
					this.$notify.error({
						title: "预约时间",
						duration: 1000,
						showClose: true,
						message: "不能小于当前日期"
					});
				} else {
					this.$msgBox
						.confirm(
							`确认${type == 2 ? "续租" : "退租"}?`,
							`${type == 2 ? "续租" : "退租"}`,
							{
								confirmButtonText: "确定",
								cancelButtonText: "取消",
								type: "warning"
							}
						)
						.then(() => {
							let obj = {
								bespeak: JSON.stringify({
									Bs_type: type,
									User_id: this.userId,
									User_tel: this.tel,
									House_id: this.rentData.House_id,
									Admin_id: this.rentData.Admin_id,
									Bs_time: `${this.getTimeCh(
										this.rentRetDate
									)} 00:00:00.000`,
									Bs_isDeal: "N",
									Bs_content: `{'con_id':'${this.rentData.Con_id}'}`
								}),
								noLoading: true
							};
							this.rentOtherS = false;
							addBespeak(obj).then(res => {
								let hint = {
									title: "预约",
									duration: 1000,
									showClose: true,
									message: res.msg
								};
								if (res.status) {
									this.$notify.success(hint);
								} else {
									this.$notify.error(hint);
								}
								this.getCtractIn();
							});
						})
						.catch(() => {});
				}
			},
			// 根据订单id获取合同id
			queryConIdByMsg() {
				let res = Promise.all(
					this.payRemind.map(item => {
						return getConIdByOrder({ order_id: item.Link_id });
					})
				);
			},
			// 删除消息
			choiceCurrRow(row) {
				this.delLookMsg(row);
			},
			// 删除消息
			delLookMsg(row) {
				for (let i = 0; i < this.conRemind.length; i++) {
					if (this.conRemind[i].Link_id == row.Con_id) {
						this.delRemind({
							mge_id: this.conRemind[i].Mge_id,
							type: "con"
						});
						break;
					}
				}
			}
		},
		mounted() {
			this.getCtractIn();
		},
		beforeDestroy() {
			document.body.removeEventListener("mousemove", this.drawingLine);
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
				let [type, stu] = value.split("_");
				if (stu == "Y") {
					return "生效";
				} else if (stu == "N") {
					return "待完成";
				}
				return "已失效";
			}
		},
		watch: {
			tabsIndex(newV, oldV) {
				this.getCtractIn();
			}
		},
		created() {
			this.queryConIdByMsg();
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
		padding: 0 0 2rem 2rem;
		border-bottom: 1px solid #f1f1f1;
		&__left {
			width: 12rem;
			height: 12rem;
			border-radius: 50%;
			border: 0.2rem solid $fontLightColor;
			overflow: hidden;
			img {
				height: 100%;
				width: 100%;
			}
		}
		&__right {
			flex-grow: 1;
			display: flex;
			padding: 20px 0 0 40px;
			justify-content: space-between;
			&--name {
				font-size: 2rem;
				color: #000;
				margin-bottom: 1rem;
			}
			&--hint {
				color: $NoHover;
			}
			&__next {
				font-size: 1.4rem;
				color: $fontLightColor;
				a {
					color: $fontLightColor;
				}
			}
		}
	}
	.contract-box {
		position: relative;
	}
	.contract {
		&--hint {
			height: 380px;
		}
		&-title {
			padding: 3rem 0 2.4rem;
			display: flex;
			justify-content: space-between;
			&__h {
				line-height: 2.1rem;

				span {
					margin-left: 1.4rem;
				}
				font-size: 1.8rem;
			}
			color: #333;
			&__s {
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
		&--base {
			margin-right: 10px;
			font-size: 12px;
			display: block;
			flex-shrink: 0;
			transition: all 0.3s;
			border: 1px solid #3dbcc6;
			padding: 2px 10px;
			border-radius: 2rem;
			color: #00bfc8;
		}
		&--ok {
			cursor: pointer;
			&:hover {
				color: #fff;
				background-color: #3dbcc6;
			}
			&:active {
				background-color: #2fa4ad;
			}
		}
		&--no {
			cursor: default;
			background-color: rgba(0, 0, 0, 0.1);
			background-color: rgba(0, 0, 0, 0.1);
			color: #fff;
			border-color: #dcdee1;
		}
	}

	.mywrite {
		&-box {
		}
		&-title {
			font-size: 30px;
			font-weight: bold;
			width: fit-content;
			margin: 0 auto 20px;
		}
		&-con {
			width: fit-content;
			flex-shrink: 0;
			margin: 0 auto;
			border: 1px solid #dddddd;
		}
		&-menu {
			display: flex;
			width: fit-content;
			margin: 20px auto 0;
			div {
				width: 100px;
			}
			div:nth-of-type(2) {
				margin: 0 20px;
			}
		}
	}
	::v-deep .el-dialog__header {
		padding: 0;
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

	::v-deep .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
		color: #000;
	}
	::v-deep
		.el-tabs--border-card
		> .el-tabs__header
		.el-tabs__item:not(.is-disabled):hover {
		color: #000;
	}
	.house-info {
		&__img {
			display: block;
			width: 100%;
			img {
				width: 100%;
				height: 205px;
			}
		}
		&__d {
			padding-top: 10px;
		}
		&__t {
			display: inline-block;
			color: #606266;
			margin-bottom: 12px;
			&:hover {
				color: #3dbcc6;
			}
		}
	}
	.rent-header {
		font-size: 20px;
		color: #303133;
		margin-top: -10px;
		margin-bottom: 14px;
	}
	.rent-hou {
		width: 380px;
	}
	.rent-info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 15px;

		& > div:first-child {
			font-size: 16px;
			color: #303133;
		}
	}
	.rent-retreat {
		padding-left: 10px;
		height: fit-content;
		margin: auto;
		&-price {
			margin-bottom: 2rem;
			& > span:first-child {
				font-size: 16px;
				color: #303133;
			}
		}
		&-time {
			margin-bottom: 2rem;
		}
		&-but {
		}
	}
	.rent-conta {
		display: flex;
	}
	.per-heder-badge {
		line-height: initial;
	}
	.besinfo {
		margin: 5px;
	}
</style>