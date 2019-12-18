<template>
	<header class="nav-top">
		<div class="nav-cont">
			<div class="nav-cont__left">
				<div class="logo">
					<img :src="logoImg" alt />
				</div>
				<div class="city">
					<i class="el-icon-location"></i>
					<span v-text="city || '未知'"></span>
				</div>
				<ul class="menu">
					<li>
						<router-link to="/">首页</router-link>
					</li>
					<li>
						<router-link to="/h">租房</router-link>
					</li>
					<li>
						<span>小程序</span>
					</li>
				</ul>
			</div>
			<div class="nav-cont__right">
				<div v-if="!userId" class="nav-cont__right--nolog">
					<router-link to="/user/login">登录</router-link>
					<span class="baffle">|</span>
					<router-link to="/user/register">注册</router-link>
				</div>
				<div v-else class="nav-cont__right--nolog">
					<router-link to="/userDetail">{{userName || telDeal}}</router-link>
					<span class="baffle">|</span>
					<span>退出</span>
				</div>
			</div>
		</div>
	</header>
</template>

<script>
	import { mapGetters } from "vuex";
	export default {
		data() {
			const logoImg = require("@/assets/logo.png");
			return {
				logoImg
			};
		},
		computed: {
			...mapGetters(["userId", "userName", "telDeal", "city"]),
			name() {
				return this.data;
			}
		},
		methods: {
			getCurr() {
				this.$store.dispatch("getCurLocat").then(res => {
					if (!res.status) {
						console.log(res.msg);
					}
				});
			}
		},
		created() {
			this.city || this.getCurr();
		}
	};
</script>

<style lang="scss" scoped>
	.nav-top {
		z-index: 1;
		background-color: #fff;
		box-shadow: 0 0 10px 0 #aaa;
	}
	.nav-cont {
		color: #787878;
		width: 116.8rem;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		height: 7.5rem;
		&__left {
			display: flex;
			align-items: center;
			.logo {
				width: 13.6rem;
				height: 7.3rem;
				img {
					width: 100%;
					height: 100%;
				}
				flex-shrink: 0;
			}
			.city {
				flex-shrink: 0;
				margin-left: 1rem;
				background-color: rgba(0, 0, 0, 0.4);
				color: #fff;
				padding: 0.5rem 0.8rem;
				border-radius: 2em;
				cursor: pointer;
				-ms-flex-negative: 0;
				flex-shrink: 0;
				font-size: 1.2rem;
				span {
					display: inline-block;
					text-align: center;
					min-width: 4rem;
					padding: 0 4px;
					box-sizing: border-box;
				}
			}
			.menu {
				flex-shrink: 0;
				margin-left: 8rem;
				display: flex;
				a {
					transition: color 0.3s;
					color: #787878;
					&:hover {
						color: #000;
					}
				}
				li {
					transition: color 0.3s;
					margin-left: 5rem;
					cursor: pointer;
					&:hover {
						color: #000;
					}
				}
				font-size: 2rem;
				font-weight: bold;
			}
		}
		&__right {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			color: #787878;
			a {
				color: #787878;
				transition: color 0.3s;
				&:hover {
					color: #000;
				}
			}
			&--nolog {
				display: flex;
				.baffle {
					color: #000;
					margin: 0 0.8rem;
				}
				margin-left: 3rem;
			}
		}
	}
</style>