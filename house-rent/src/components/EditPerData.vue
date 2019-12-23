<template>
	<div>
		<header class="header">
			<i class="el-icon-edit-outline"></i>
			<span>编辑个人资料</span>
		</header>
		<section class="edit-body" ref="preData">
			<el-upload
				ref="editUserAvator"
				class="user-avator"
				action="#"
				:show-file-list="false"
				:before-upload="beforeAvatarUpload"
				accept="image/*"
				:http-request="()=>{}"
			>
				<img :src="userAvaterCP || userAvater || avator " class="avatar" />
			</el-upload>
			<div class="edit-body__form">
				<MyInput placeholder="账号" lable="userName" v-model="userName" :readonly="true" />
				<div class="form-gender">
					<p class="form-gender__title">性别</p>
					<div class="form-gender__check">
						<label>
							<input
								name="gender"
								:checked="'0' === userGender?'checked':''"
								value="0"
								@change="userGender='0'"
								type="radio"
							/>
							<span>男</span>
						</label>
						<label>
							<input
								name="gender"
								:checked="'1' === userGender?'checked':''"
								value="1"
								@change="userGender='1'"
								type="radio"
							/>
							<span>女</span>
						</label>
						<label>
							<input
								name="gender"
								:checked="'2' === userGender?'checked':''"
								value="2"
								@change="userGender='2'"
								type="radio"
							/>
							<span>保密</span>
						</label>
					</div>
				</div>
				<div class="form-tonext">
					<MyInput placeholder="手机号" lable="telDeal" v-model="telDeal" :readonly="true" />
					<router-link class="form-tonext--to" to="/userDetail/editPhone">更改手机号</router-link>
				</div>
				<Mybutton class="form-but" @clickTo="subUpdate" title="保存" />
			</div>
		</section>
	</div>
</template>

<script>
	import { mapActions, mapGetters, mapMutations } from "vuex";
	import { uploadAvator } from "@/api/user";
	export default {
		data() {
			let avator = require("@/assets/avator.jpg");
			return {
				avator,
				userGender: "0",
				updateStatus: true,
				imgFile: null, // 头像文件
				ntfObj: { duration: 1500, title: "资料修改", showClose: false },
				userAvaterCP: null,
				statusEdit: false
			};
		},
		computed: {
			...mapGetters(["userId", "telDeal", "userName", "userAvater"])
		},
		methods: {
			...mapMutations(["upAvator"]),
			beforeAvatarUpload(file) {
				this.statusEdit = true;
				this.imgFile = file;
				var fileReader = new FileReader();
				fileReader.readAsDataURL(this.imgFile);
				// 读取操作完成触发
				fileReader.onload = e => {
					this.userAvaterCP = e.target.result;
				};
			},
			updateAvator() {
				let fromData = new FormData();
				fromData.append("user_id", this.userId);
				fromData.append("file", this.imgFile);
				this.$myLoadding.open(this.$refs.preData);
				uploadAvator(fromData).then(res => {
					let hintObj = { ...this.ntfObj, message: res.msg };
					if (res.status) {
						this.upAvator(res.url);
						this.$notify.success(hintObj);
						this.statusEdit = false;
					} else {
						this.$notify.error(hintObj);
					}
					this.$myLoadding.hide();
				});
			},
			editUserAvator() {},
			subUpdate() {
				if (this.statusEdit) {
					this.$msgBox
						.confirm("确认修改头像", "资料修改", {
							confirmButtonText: "确认",
							cancelButtonText: "放弃"
						})
						.then(() => {
							this.updateAvator();
						})
						.catch(() => {});
				} else {
					this.$notify.warning({
						message: "你未更改信息",
						...this.ntfObj
					});
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
	.user-avator {
		width: 12rem;
		height: 12rem;
		border-radius: 50%;
		border: 0.2rem solid $fontLightColor;
		margin: 0 auto;
		overflow: hidden;
		img {
			height: 100%;
			width: 100%;
		}
	}
	.edit-body {
		position: relative;
		padding-top: 5rem;
		&__form {
			width: 35rem;
			margin: 0 auto;
		}
	}
	.form-but {
		margin-top: 1rem;
	}
	.form-gender {
		margin-bottom: 2rem;
		&__title {
			color: #0000008a;
			font-size: 1.2rem;
			margin-bottom: 8px;
		}
		&__check {
			label {
				display: inline-block;
				margin-right: 30px;
				input {
					vertical-align: middle;
					margin-right: 6px;
				}
			}
		}
	}
	.form-tonext {
		display: flex;
		align-items: center;
		justify-content: space-between;
		&--to {
			color: $fontLightColor;
		}
	}
	::v-deep .el-upload {
		width: 100%;
		height: 100%;
	}
</style>