<template>
	<section class="login-from">
		<div class="login-from__left"></div>
		<div class="login-from__right">
			<div class="form">
				<el-tabs v-model="activeName" class="mytab" @tab-click="handleClick">
					<el-tab-pane label="账号手机号登录" name="first">
						<MyInput
							lable="userName"
							v-model="userName"
							:required="true"
							placeholder="账号或手机号"
							@inputStatus="(status)=>{userNameStatus = status}"
							:upStatus="loginStatus"
						/>
						<MyInput
							@inputStatus="(status)=>{pwdStatus = status}"
							:upStatus="loginStatus"
							lable="pwd"
							v-model="pwd"
							placeholder="密码"
							:required="true"
							type="password"
						/>
						<SlidVal class="form__slid" @slidStatus="(status)=>{slidStatus = status}" />
					</el-tab-pane>
					<el-tab-pane label="手机验证码登录" name="second">
						<MyInput
							lable="userPhone"
							v-model="userPhone"
							:regStr="userPhoneRex"
							:required="true"
							placeholder="手机号"
							@inputStatus="(status)=>{userPhoneStatus = status}"
							:upStatus="loginCodeStatus"
						/>
						<div class="code">
							<MyInput
								lable="code"
								v-model="code"
								:required="true"
								class="code__input"
								placeholder="验证码"
								@inputStatus="(status)=>{codeStatus = status}"
								:upStatus="getCodeStatus || loginCodeStatus"
							/>
							<div @click="getCodeJudge" class="code__get">
								<span>{{timeOut?`重新获取${timeOut}`:'获取验证码'}}</span>
							</div>
						</div>
					</el-tab-pane>
				</el-tabs>
				<Mybutton title="登录" @clickTo="loginWeb" />
				<div class="form__bootm">
					<router-link to="/user/register">免费注册</router-link>
					<router-link to="/editCode">忘记密码</router-link>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import { mapActions } from "vuex";
	import { login, getCode, logByCode } from "@/api/user";
	import SlidVal from "./SlidVal";
	export default {
		name: "login",
		data() {
			let userPhoneRex = {
				reg: /^1[3456789]\d{9}/,
				hint: "手机号码格式不正确"
			};
			let wrapStyle = {},
				wrapDown = false;
			return {
				code: null,
				codeStatus: false,
				getCodeStatus: true, // 点击获取验证码时判断
				userName: null,
				userNameStatus: false,
				userPhone: null,
				userPhoneStatus: false,
				userPhoneRex,
				pwd: null,
				pwdStatus: false,
				slidStatus: false,
				loginStatus: true,
				loginCodeStatus: true,
				activeName: "first",
				timeOut: 0
			};
		},
		components: {
			SlidVal
		},
		methods: {
			...mapActions(["loginUser"]),
			loginTo() {
				this.loginUser({
					loginInfo: this.userName,
					user_pwd: this.pwd
				}).then(res=>{
					if(res.status){
						this.$router.go('-1')
						console.log(sessionStorage);
					} else {
						console.log('登录失败');
					}
				});
			},
			// 手机验证码登录
			async loginCode() {
				console.log("验证码登录");
				let data = await logByCode(
					{
						telephone: this.userPhone,
						code: this.code
					},
					res => {
						console.log(res, "验证码验证");
					}
				);
			},
			handleClick(item) {},
			getCodeJudge() {
				this.loginCodeStatus = this.userPhoneStatus;
				if (!this.timeOut && this.userPhoneStatus) {
					getCode(
						{
							telephone: this.userPhone
						},
						res => {
							console.log(res, "验证码");
						}
					);
					this.timeOut = 60;
					let timer = setInterval(() => {
						this.timeOut--;
						if (this.timeOut === 0) {
							clearInterval(timer);
						}
					}, 1000);
				}
			},
			loginWeb() {
				this.getCodeStatus = false;
				if (this.activeName === "first") {
					this.loginStatus =
						this.userNameStatus && this.pwdStatus && this.slidStatus;
					this.loginStatus && this.loginTo();
				} else if (this.activeName === "second") {
					this.loginCodeStatus = this.userPhoneStatus && this.codeStatus;
					this.loginCodeStatus && this.loginCode();
				}
			}
		},
		created() {}
	};
</script>

<style lang="scss" scoped>
	.login-from {
		width: 100rem;
		height: 56rem;
		display: flex;
		border-radius: 0.8rem;
		overflow: hidden;
		box-shadow: 0 6px 20px 5px rgba(40, 120, 255, 0.1),
			0 16px 24px 2px rgba(0, 0, 0, 0.05);
		&__left {
			flex-shrink: 0;
			width: 44rem;
			background-color: skyblue;
		}
		&__right {
			flex-grow: 1;
			box-sizing: border-box;
		}
	}
	.form {
		width: 33rem;
		margin: 0 auto;
		&__title {
			font-size: 3.6rem;
			font-weight: bolder;
			color: #2878ff;
			margin: 81px 0 60px 0;
			text-align: center;
		}
		&__slid {
			margin: 2rem 0 3rem;
		}
		&__bootm {
			display: flex;
			font-size: 1.2rem;
			align-items: center;
			padding: 1rem 0;
			justify-content: space-between;
			a:first-of-type {
				color: #396afe;
			}
			a:last-of-type {
				color: #9fa2a8;
			}
		}
	}

	.code {
		display: flex;
		justify-content: space-between;
		margin-bottom: 2rem;
		&__input {
			width: 17.4rem;
			text-align: center;
			input {
				font-size: 2rem;
			}
		}
		&__get {
			cursor: pointer;
			background-color: skyblue;
			border-radius: 0.4rem;
			margin-left: 1.8rem;
			display: flex;
			align-items: center;
			color: #fff;
			padding: 0 1rem;
			height: 4rem;
			box-shadow: 0 1px 6px rgba(0, 0, 0, 0.117647),
				0 1px 4px rgba(0, 0, 0, 0.117647);
			&:hover {
				background-color: red;
			}
			&:active {
				box-shadow: 2px 5px 8px rgba(0, 0, 0, 0.2),
					-2px 0px 6px rgba(0, 0, 0, 0.2);
			}
			margin-top: 1.1rem;
		}
	}
	.mytab {
		margin-top: 10rem;
	}
</style>
