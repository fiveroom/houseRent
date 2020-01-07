<template>
	<div class="user-detail">
		<div class="user-detail__con">
			<header-nav />
			<div class="user-deal">
				<header class="user-deal__header">
					<el-breadcrumb separator-class="el-icon-arrow-right">
						<el-breadcrumb-item>相寓租房</el-breadcrumb-item>
						<el-breadcrumb-item>个人设置</el-breadcrumb-item>
						<el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
					</el-breadcrumb>
				</header>
				<section class="user-deal__body">
					<nav class="body body__left">
						<ul>
							<li v-for="(item, index) in menu" :key="index">
								<h2 class="body__left--h2" v-text="item.title"></h2>
								<ul>
									<li class="body__left--item" v-for="(child, childIndex) in item.items" :key="childIndex">
										<el-badge :is-dot="judgeMsg(child.url)">
											<router-link
												:to="child.url"
												:class="['item__a',child.url === nowRouteP?'item__a--light':'' ]"
											>
												{{child.title}}
												<i class="side"></i>
											</router-link>
										</el-badge>
									</li>
								</ul>
							</li>
						</ul>
					</nav>
					<div class="body__right">
						<transition name="show">
							<router-view class="container" />
						</transition>
					</div>
				</section>
			</div>
		</div>
		<Footer />
		<RightSide />
	</div>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		data() {
			const menu = [
				{
					title: "个人设置",
					items: [
						{
							title: "个人中心",
							url: "/userDetail/persCenter"
						},
						{
							title: "我的收藏",
							url: "/userDetail/myCollect"
						},
						{
							title: "修改手机号",
							url: "/userDetail/editPhone"
						},
						{
							title: "修改密码",
							url: "/userDetial/editPwd"
						}
					]
				},
				{
					title: "租客服务",
					items: [
						// {
						// 	title: "我的合同",
						// 	url: "/userDetail/myContract"
						// },
						{
							title: "我的预约",
							url: "/userDetail/mySubs"
						},
						// {
						// 	title: "我的消息",
						// 	url: "/userDetail/myMsg"
						// },
						{
							title: "我的聊天",
							url: "/userDetail/myChat"
						}
						// {
						// 	title: "订单交易记录",
						// 	url: "/userDetail/myOrderRecord"
						// }
					]
				},
				{
					title: "意见/建议",
					items: [
						{
							title: "意见反馈",
							url: "#"
						}
					]
				}
			];
			return {
				menu
			};
		},

		computed: {
			...mapState({
				bsRemind: state => state.user.bsRemind,
				conRemind: state => state.user.conRemind,
				payRemind: state => state.user.payRemind,
			}),
			nowRouteP() {
				if (this.$route.fullPath === "/userDetail") {
					return "/userDetail/persCenter";
				}
				return this.$route.fullPath;
			},
			showTitle() {}
		},
		methods: {
			judgeMsg(url) {
				switch(url){
					case '/userDetail/mySubs':
						return !!this.bsRemind.length;
					case '/userDetail/persCenter':
						return !!this.conRemind.length;
					case '/userDetail/persCenter':
						return !!this.payRemind.length;
					default:
						return false
				}
			}
		},
	};
</script>

<style lang="scss" scoped>
	$hoverColor: #00bfc8;
	$fontLightColor: #3dbcc6;
	.user-detail {
		&__con {
			background-color: #f8f8f8;
			padding-bottom: 4rem;
			box-sizing: border-box;
		}
	}
	.user-deal {
		width: 116.8rem;
		margin: 0 auto;
		&__header {
			height: 5rem;
			display: flex;
			align-items: center;
		}
		&__body {
			display: flex;
			min-height: 63rem;
		}
	}
	::v-deep .el-breadcrumb__inner {
		color: #999999;
		font-size: 1.2px;
	}
	.body__left {
		width: 20rem;
		padding: 15px 30px 30px 0;
		background: #fff;
		box-sizing: border-box;
		flex-shrink: 0;
		&--h2 {
			font-size: 1.8rem;
			position: relative;
			padding: 0.5rem 0 0.5rem 3rem;
			margin-top: 1rem;
			color: #333;
			font-weight: 400;
		}
		&--item {
			font-weight: normal;
			position: relative;
			padding: 5px 0 5px 30px;
			margin-top: 10px;
			font-size: 1.4rem;
			transition: color 0.3s;
			& > a:hover > i {
				background-color: $fontLightColor;
			}
		}
	}
	.item__a {
		color: #666;
		&:hover {
			color: $fontLightColor;
		}
		&:hover > i {
			background-color: $fontLightColor;
		}
		&--light {
			color: $fontLightColor;
			i {
				background-color: $fontLightColor;
			}
		}
	}
	.body__right {
		margin-left: 20px;
		// padding: 30px;
		background-color: #fff;
		flex-grow: 1;
		overflow: hidden;
		position: relative;
		padding: 30px 0;
	}
	// 添加
	.container {
		width: 888px;
		padding: 0 30px;
		background-color: #fff;
		opacity: 1;
	}
	.side {
		transition: background-color 0.3s;
		position: absolute;
		height: 1.9rem;
		top: 50%;
		left: -30px;
		transform: translateY(-50%);
		width: 2px;
	}
	.show-enter,
	.show-leave-to {
		position: absolute;
		top: 30px;
		left: 0;
		opacity: 0;
	}
	.show-enter-active,
	.show-leave-active {
		transition: all 0.5s;
	}
</style>