<template>
	<div class="cen">
		<header class="header">
			<i class="el-icon-s-opportunity"></i>
			<span>我的聊天</span>
		</header>
		<section class="cenchat">
			<div class="cenchat-l">
				<header class="search-admin">
					<div class="search-admin__inp">
						<i class="el-icon-search search-admin__inp--ico"></i>
						<input placeholder="搜索" class="search-admin__text" type="text" />
					</div>
					<div class="search-admin__add">
						<i class="el-icon-plus"></i>
					</div>
				</header>
				<ScrollBar class="cenchat-scro">
					<ul>
						<li></li>
					</ul>
				</ScrollBar>
			</div>
			<div class="cenchat-r">
				<div class="content"></div>
				<div class="write"></div>
			</div>
		</section>
	</div>
</template>

<script>
	import ScrollBar from "@/components/wholeSit/ScrollBar";
	export default {
		components: {
			ScrollBar
		}
	};
</script>

<style lang="scss" scoped>
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
.cen {
	height: 570px;
}
.cenchat {
	height: calc(100% - 52px);
	display: flex;
	&-l {
		height: 100%;
		background-color: #ebe8e7;
		&::before{
			display: table;
			content: ""
		}
	}
	&-scro {
		height: 300px;
	}
}
.search-admin {
	flex-shrink: 0;
	width: fit-content;
	display: flex;
	margin: 20px 15px 20px 0;
	align-items: center;
	&__add{
		font-size: 16px;
		background-color: #dbd9d8;
		width: 25px;
		height: 25px;
		text-align: center;
		line-height: 25px;
		margin-left: 15px;
		border-radius: 4px;
		overflow: hidden;
	}
	&__inp {
		border-radius: 4px;
		overflow: hidden;
		display: flex;
		background-color: #dbd9d8;
		align-items: center;
		padding: 0 5px;
		&--ico {
			font-size: 13px;
		}
		input {
			background-color: #dbd9d8;
			border: 0;
			outline: none;
			font-size: 14px;
			line-height: 1.8;
			padding-left: 8px;
		}
	}
}
</style>