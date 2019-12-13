<template>
	<header class="nav-top">
		<div class="nav-cont">
			<div class="nav-cont__left">
				<div>PY租赁找房</div>
				<div>
					<i class="el-icon-location"></i>
					<span v-text="city"></span>
				</div>
			</div>
			<div class="nav-cont__right">
				<ul class="page-feature">
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
				<div class="user-feature">
					<div class="user-feature__nolog">
						<router-link to="/user/login">登录</router-link>
						<span class="baffle">|</span>
						<router-link to="/user/register">注册</router-link>
					</div>
					<div></div>
				</div>
			</div>
		</div>
	</header>
</template>

<script>
	export default {
		data() {
			return {
				city: null
			};
		},
		methods: {
			getCity(key) {
				var myCity = new BMap.LocalCity();
				myCity.get(result => {
					this.city = result.name;
				});
			}
		},
		created() {
			this.getCity();
		}
	};
</script>

<style lang="scss" scoped>
	.nav-top {
		position: absolute;
		top: 0;
		left: 0;
		height: 6rem;
		width: 100%;
		z-index: 1;
		background-color: rgba(0, 0, 0, 0.06);
	}
	.nav-cont {
		color: #787878;
		width: 116.8rem;
		background-color: #fff;
		height: 100%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		&__left {
			display: flex;
			align-items: center;
			& > div:first-of-type {
				padding: 10px 0;
				background: skyblue;
				color: #fff;
				font-weight: bold;
				font-size: 2rem;
				flex-shrink: 0;
			}
			& > div:last-of-type {
				margin-left: 1rem;
				background-color: #a6adac;
				color: #fff;
				padding: 0.4rem 0.8rem;
				border-radius: 2em;
				cursor: pointer;
				flex-shrink: 0;
			}
		}
		&__right {
			display: flex;
			align-items: center;
			justify-content: flex-end;
		}
	}
	.user-feature {
		display: flex;
		a {
			color: #787878;
		}
		.baffle {
			margin: 0 0.8rem;
		}
		margin-left: 3rem;
	}
	.page-feature {
		display: flex;
		a {
			color: #787878;
		}
		li {
			margin-left: 1.5rem;
		}
	}
</style>