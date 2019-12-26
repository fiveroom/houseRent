<template>
	<div :class="['search-cont', searchFocus?'search-cont--focus':'search-cont--base']">
		<div class="mydropdown">房屋搜索</div>
		<div class="search-input">
			<input
				class="search-input__item"
				@focus="searchFocus=true"
				@input="$emit('input', $event.target.value)"
				@blur="searchFocus=false"
				type="text"
			/>
		</div>
		<div class="search-but" @click="$emit('clickTo')">
			<i class="el-icon-search"></i>
			<span>搜索</span>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			let searchTypeArr = [
				{
					field: "area_str",
					msg: "房屋地区"
				},
				{
					field: "shape_str",
					msg: "房屋类型"
				},
				{
					field: "months_str",
					msg: "房屋支付方式"
				}
			];
			return {
				keyWords: "默认值",
				searchFocus: false,
				searchTypeArr
			};
		},
		methods: {
			clickItem(index) {
				this.keyWords = this.searchTypeArr[index].msg;
			}
		}
	};
</script>

<style lang="scss" scoped>
	.search-cont {
		background-color: #fff;
		width: fit-content;
		height: 6rem;
		border-width: 1px;
		border-style: solid;
		border-color: transparent;
		display: flex;
		align-items: center;
		&--base {
			border-color: #ddd;
		}
		&--focus {
			border-color: #00c5b4;
		}
		.split-item {
			color: #666;
		}
	}
	.mydropdown {
		font-size: 1.8rem;
		display: flex;
		align-items: center;
		height: 100%;
		padding: 0 1rem;
		cursor: pointer;
		color: #666;
		&-item {
		}
	}
	.search-input {
		position: relative;
		border: 0;
		&__item {
			display: block;
			height: 100%;
			line-height: 20px;
			border: 0;
			font-size: 1.8rem;
			color: #000;
			width: 40rem;
			border: 0;
			text-indent: 2rem;
			&:focus {
				outline: none;
			}
		}
		&::before {
			content: "";
			width: 1px;
			position: absolute;
			height: 1.8rem;
			top: 50%;
			left: 0;
			transform: translateY(-50%);
			background-color: #e4e6e6;
		}
	}
	.search-but {
		font-size: 2rem;
		height: 100%;
		display: flex;
		align-items: center;
		padding: 0 2rem;
		background-color: #00c0c4;
		color: #fff;
		cursor: pointer;
		transition: all 0.3s;
		&:hover {
			background-color: #04afb3fc;
		}
	}
</style>