<template>
	<div>
		<header class="header">
			<i class="el-icon-edit-outline"></i>
			<span>编辑个人资料</span>
		</header>
		<section class="edit-body">
			<div class="user-avator">
				<img :src="avator" alt />
			</div>
			<div class="edit-body__form">
				<MyInput
					placeholder="账号"
					lable="userNameBk"
					v-model="userNameBk"
					:required="true"
					@inputStatus="(status)=>{userNameBkStatus = status}"
					:upStatus="updateStatus"
				/>
				<div class="form-gender">
					<p class="form-gender__title">性别</p>
					<div class="form-gender__check">
						<label>
							<input name="gender" value="0" type="radio" />
							<span>男</span>
						</label>
						<label>
							<input name="gender" value="1" type="radio" />
							<span>女</span>
						</label>
						<label>
							<input name="gender" value="2" type="radio" />
							<span>保密</span>
						</label>
					</div>
				</div>
				<div class="form-tonext">
					<MyInput placeholder="手机号" lable="telDealBk" v-model="telDealBk" :readonly="true" />
					<router-link class="form__phone--to" to="/userDetail/editPhone">更改手机号</router-link>
				</div>
				<div class="form-tonext">
					<MyInput placeholder="邮箱" lable="emailBk" v-model="userEmailBk" :readonly="true" />
					<router-link class="form__phone--to" to="/userDetail/editEmail">更改邮箱号</router-link>
				</div>
				<Mybutton class="form-but" @clickTo="updateInfo" title="保存" />
				<div></div>
				<div></div>
			</div>
		</section>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from "vuex";
	export default {
		data() {
			let avator = require("@/assets/avator.jpg");
			return {
				avator,
				telDealBk: null,
				userNameBk: null,
				userNameBkStatus: false,
				userGender: null,
				userEmailBk: null,
				updateStatus: true
			};
		},
		computed: {
			...mapGetters(["userId", "telDeal", "userName", "userEmail"])
		},
		methods: {
			cpValue() {
				this.telDealBk = this.telDeal;
				this.userNameBk = this.userName;
				this.userEmailBk = this.userEmail;
			},
			updateInfo() {
				
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