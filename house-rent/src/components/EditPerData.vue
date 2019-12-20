<template>
	<div>
		<header class="header">
			<i class="el-icon-edit-outline"></i>
			<span>编辑个人资料</span>
		</header>
		<section class="edit-body">
			<div class="user-avator">
				<img :src="userAvater || avator" alt />
			</div>
			<div class="edit-body__form">
				<MyInput
					placeholder="账号"
					lable="userNameBk"
					v-model="userNameBk"
					:required="true"
					@inputStatus="(status)=>{userNameBkStatus = status}"
					:upStatus="updateStatus"
					:regStr="userNameRex"
				/>
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
					<MyInput placeholder="手机号" lable="telDealBk" v-model="telDealBk" :readonly="true" />
					<router-link class="form-tonext--to" to="/userDetail/editPhone">更改手机号</router-link>
				</div>
				<div class="form-tonext">
					<MyInput placeholder="邮箱" lable="emailBk" v-model="userEmailBk" :readonly="true" />
					<router-link class="form-tonext--to" to="/userDetail/editEmail">更改邮箱号</router-link>
				</div>
				<Mybutton class="form-but" @clickTo="updateInfo" title="保存" />
			</div>
		</section>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from "vuex";
	import * as userApi from "@/api/user";
	export default {
		data() {
			let avator = require("@/assets/avator.jpg");
			let userNameRex = {
				reg: /^([a-zA-Z0-9_-]|[\u4E00-\u9FA5]){4,16}$/,
				hint: "4位以上，特殊字符可包含-_"
			};
			return {
				avator,
				telDealBk: null,
				userNameBk: null,
				userNameRex,
				userNameBkStatus: null,
				userGender: "0",
				userEmailBk: null,
				updateStatus: true
			};
		},
		computed: {
			...mapGetters([
				"userId",
				"telDeal",
				"userName",
				"userEmail",
				"userAvater"
			])
		},
		methods: {
			...mapActions(["updateUser"]),
			cpValue() {
				this.telDealBk = this.telDeal;
				this.userNameBk = this.userName;
				this.userEmailBk = this.userEmail;
				this.userNameBkStatus = !!this.userName;
				console.log(this.userAvater);
			},
			updateInfo() {
				this.updateStatus = this.userNameBkStatus;
				if (this.updateStatus) {
					this.updateUser({
						user_name: this.userNameBk,
						user_gender: this.userGender
					}).then(res => {
						console.log(res, "更新个人信息");
					});
				}
			}
		},

		created() {
			this.cpValue();
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
</style>