<template>
	<section class="login-from">
		<div class="login-from__left"></div>
		<div class="login-from__right" ref="fromRight">
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
							:upStatus="allowGetCode && loginCodeStatus"
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
							<Mybutton
								@clickTo="getResCode"
								class="code__get"
								:disabled="!userPhoneStatus"
								:authCode="true"
							/>
						</div>
					</el-tab-pane>
				</el-tabs>
				<Mybutton title="登录" @clickTo="loginWeb" />
				<div class="form__bootm">
					<router-link to="/user/register" replace>免费注册</router-link>
					<router-link to="/editCode">忘记密码</router-link>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import { mapActions, mapMutations } from "vuex";
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
			let hmg = { center: true, duration: 1000 };
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
				allowGetCode: true,
				activeName: "first",
				timeOut: 0,
				hmg
			};
		},
		components: {
			SlidVal
		},
		methods: {
			...mapActions(["loginUser"]),
			...mapMutations(['saveUser']),
			loginTo() {
				let obj = { loginInfo: this.userName, user_pwd: this.pwd };
				this.loginUser(obj).then(res => {
					let objHint = {
						duration: 1500,
						message: res.msg,
						title: "登录状态"
					};
					if (res.status) {
						this.$notify.success(objHint);
						if (window.history.length <= 2) {
							this.$router.push({ name: "home" });
						} else {
							this.$router.go(-1);
						}
					} else {
						this.$notify.warning(objHint);
					}
				});
			},
			// 手机验证码登录
			loginCode() {
				let boj = { telephone: this.userPhone, code: this.code };
				logByCode(boj).then(res => {
					console.log(res);
					let objHint = {
						duration: 1500,
						message: res.msg,
						title: "登录"
					};
					if (res.status) {
						this.saveUser(res.data)
						if (window.history.length <= 2) {
							this.$router.push({ name: "home" });
						} else {
							this.$router.go(-1);
						}
					} else {
						this.$notify.error(objHint);
					}
				});
			},
			handleClick(item) {},
			// 获取验证码
			getResCode(status) {
				this.allowGetCode = this.userPhoneStatus;
				if (status && this.userPhoneStatus) {
					let obj = { telephone: this.userPhone, noLoading: true};
					this.$myLoadding.open(this.$refs.fromRight);
					getCode(obj).then(res => {
						let objHint = {
							duration: 1500,
							message: res.msg,
							title: "验证码"
						};
						if (res.status) {
							this.$notify.success(objHint);
						} else {
							this.$notify.warning(objHint);
						}
						this.$myLoadding.hide();
					});
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
			position: relative;
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
		align-items: center;
		margin-bottom: 2rem;
		&__input {
			width: 17.4rem;
			text-align: center;
			input {
				font-size: 2rem;
			}
		}
		&__get {
			color: #fff;
			width: 124px;
			margin-bottom: 9px;
		}
	}
	.mytab {
		margin-top: 10rem;
	}
</style>
