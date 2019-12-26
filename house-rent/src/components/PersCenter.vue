<template>
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
			<p class="contract-title">
				<i class="el-icon-document"></i>
				<span>我的合同</span>
			</p>
			<div class="contract-box" ref="contract">
				<div v-if="contractList.length === 0" class="contract--no">
					<p class="contract--no__title">您还没有履行中的合同，快去签约吧！～</p>
					<router-link class="contract--no__next" to="/h">去找房</router-link>
				</div>
				<el-table
					v-else
					:data="contractList"
					:border="true"
					ref="orderTable"
					@selection-change="(value)=>{checkOrderCon = value}"
				>
					<el-table-column prop="Con_id" label="合同编号"></el-table-column>
					<el-table-column prop="House_address" label="签约房源地址"></el-table-column>
					<el-table-column label="签约日期">
						<template slot-scope="scope">
							<div>{{getTimeCh(scope.row.Con_startTime)}}</div>
						</template>
					</el-table-column>
					<el-table-column label="到期时间">
						<template slot-scope="scope">
							<div>{{getTimeCh(scope.row.Con_endTime)}}</div>
						</template>
					</el-table-column>
					<el-table-column label="合同状态">
						<template slot-scope="scope">
							<div>{{scope.row.Con_isSigned | judegStatus}}</div>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="350px">
						<template slot-scope="scope">
							<div class="user-do">
								<div class="user-do--base user-do--ok" @click="downFile(scope.row.Con_path)">下载合同</div>
								<router-link :to="`/userDetail/contractDetail?con_id${scope.row.Con_id}`" class="user-do--base user-do--ok">查看详情</router-link>
								<div
									@click="canvEvent(scope.row.Con_isSigned, scope.row.Con_id)"
									:class="['user-do--base', /N/.test(scope.row.Con_isSigned)?'user-do--ok':'user-do--no']"
								>上传签名</div>
								<router-link
									class="user-do--base user-do--ok"
									:to="`/userDetail/myOrder?Con_id=${scope.row.Con_id}`"
								>查看订单</router-link>
							</div>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<el-dialog :visible.sync="showConImage">
				<img width="100%" :src="showConImageUrl" alt />
			</el-dialog>
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
		</section>
	</div>
</template>

<script>
	import { saveAs } from "file-saver";
	import { mapGetters } from "vuex";
	import { queryCtractIn, dowloadFile } from "@/api/user";
	import { upConName } from "@/api/house";
	export default {
		data() {
			let avator = require("@/assets/avator.jpg");
			return {
				avator,
				showConImage: false,
				showConImageUrl: null,
				contractList: [],
				writeName: false,
				cavMouseDown: false,
				ctx: null,
				currConId: null
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
			downFile(fileSrc, num) {
				// this.createIframe(imgSrc);
				window.open(fileSrc)
			},
			// 签名
			canvEvent(status, id) {
				if (/N/.test(status)) {
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
				}
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
			upToContract() {
				this.$myLoadding.open("", "合同上传中", true);
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
						this.ctx = null;
						this.ctx.clearRect(0, 0, 500, 300);
						this.getCtractIn();
						if (res.status) {
							this.$notify.success(hint);
						} else {
							this.$notify.error(hint);
						}
					});
				});
			},
			closeWriteName(done) {
				this.writeName = false;
				this.ctx.clearRect(0, 0, 500, 300);
				done();
			},
			getTwo(value){
				return `${value}`.padStart(2, '0');
			},
			getTimeCh(value) {
				let date = new Date(value);
				return `${date.getFullYear()}-${this.getTwo(date.getMonth() + 1)}-${this.getTwo(date.getDate())}`;
			},
			lookDetailCont(){

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
				let [type, stu] = value.split('_');
				if (stu == "Y") {
					return "生效";
				}
				return "待完成";
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
		padding: 0 0 4rem 2rem;
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
		&--base {
			font-size: 12px;
			display: block;
			flex-shrink: 0;
			transition: all 0.3s;
			border: 1px solid #3dbcc6;
			padding: 2px 10px;
			border-radius: 2rem;
			color: #606266;
		}
		&--ok {
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
		&--no {
			background-color: rgba(0, 0, 0, 0.1);
			border-color: #606266;
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
</style>