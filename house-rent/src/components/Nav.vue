<template>
	<header class="nav-top">
		<div class="nav-cont">
			<div class="nav-cont__left">
				<div>PY租赁找房</div>
				<div>
					<i class="el-icon-location"></i>
					<span>成都</span>
				</div>
			</div>
			<div class="nav-cont__right">
				<ul>
					<li>
						<router-link to="/">首页</router-link>
					</li>
					<li>
						<router-link to="/h">租房</router-link>
					</li>
					<li>
						<span>小程序</span>
						<!-- <div></div> -->
					</li>
				</ul>
				<div>
					<div>
						<router-link to="/user/login">登录</router-link>
						<span>|</span>
						<router-link to="/user/register">注册</router-link>
					</div>
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
			loadScript(key) {
				var script = document.createElement("script");
				script.src = `http://api.map.baidu.com/api?v=2.0&ak=${key}&callback=getCity`;
				document.body.appendChild(script);
			},
			async getCity() {
				let result = await this.loadScript();
				var myCity = new BMap.LocalCity();
				myCity.get(result => {
					// var cityName = result.name;
					this.city =  result.name;
					// map.setCenter(cityName);
					// alert("当前定位城市:" + cityName);
				});
			}
		},
		mounted() {
			this.loadScript("UOXq0NThuRG9VD9723CxMcpkQxwhiKkk");
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
			}
			& > div:last-of-type {
				margin-left: 1rem;
				background-color: #a6adac;
				color: #fff;
				padding: 0.4rem 0.8rem;
				border-radius: 2em;
				cursor: pointer;
			}
		}
	}
</style>