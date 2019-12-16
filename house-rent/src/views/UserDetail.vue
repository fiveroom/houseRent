<template>
	<div>
		<header-nav />
		<section class="user-container">
			<div class="user-deal">
				<header>
					<el-breadcrumb separator-class="el-icon-arrow-right">
						<!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
						<el-breadcrumb-item>活动管理</el-breadcrumb-item>
						<el-breadcrumb-item>活动列表</el-breadcrumb-item>
						<el-breadcrumb-item>活动详情</el-breadcrumb-item>
					</el-breadcrumb>
				</header>
				<section>
					<nav>
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
					<section>
						<router-view />
					</section>
				</section>
			</div>
		</section>
		<!-- <Footer /> -->
	</div>
</template>

<script>
	export default {};
</script>

<style lang="scss" scoped>
	.user-container {
		height: calc(100vh - 75px);
		background-color: #f8f8f8;
	}
	.user-deal {
		width: 116.8rem;
		margin: 0 auto;
	}
</style>