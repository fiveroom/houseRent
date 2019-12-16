<template>
	<div class="user-detail">
		<div class="user-detail__con">
				<header-nav />
				<section class="user-container">
					<div class="user-deal">
						<header class="user-deal__header">
							<el-breadcrumb separator-class="el-icon-arrow-right">
								<!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
								<el-breadcrumb-item>活动管理</el-breadcrumb-item>
								<el-breadcrumb-item>活动列表</el-breadcrumb-item>
								<el-breadcrumb-item>活动详情</el-breadcrumb-item>
							</el-breadcrumb>
						</header>
						<section class="user-deal__body">
							<nav class="body__left">
								<ul>
									<li>
										<h2>个人设置</h2>
										<ul>
											<li>个人中心</li>
											<li>我的收藏</li>
											<li>修改手机号</li>
											<li>修改密码</li>
										</ul>
									</li>
									<li>
										<h2>租客服务</h2>
										<ul>
											<li>我的合同</li>
											<li>租房问题</li>
										</ul>
									</li>
									<li>
										<h2>意见/建议</h2>
										<ul>
											<li>意见反馈</li>
										</ul>
									</li>
								</ul>
							</nav>
							<section class="body__right">
								<router-view />
							</section>
						</section>
					</div>
				</section>
			<div class="user-detail__empt"></div>
		</div>
		<Footer class="user-detail__footer" />
	</div>
</template>

<script>
	export default {};
</script>

<style lang="scss" scoped>
.user-detail {
	height: 100%;
	&__con {
		background-color: #f8f8f8;
		min-height: 100%;
	}
	&__footer {
		margin-top: -100px;
	}
	&__empt {
		height: 100px;
	}
}
.user-container {
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
	}
}
::v-deep .el-breadcrumb__inner {
	color: #999999;
	font-size: 1.2px;
}
.body__left {
	width: 20rem;
	min-height: 70rem;
	padding: 15px 30px 30px 0;
	background: #fff;
	box-sizing: border-box;
}
.body__right {
}
</style>