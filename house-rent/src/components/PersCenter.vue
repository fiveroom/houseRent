<template>
	<div>
		<header class="header">
			<div class="header__left">
				<img :src="userAvater || avator" alt />
			</div>
			<div class="header__right">
				<div>
					<p class="header__right--name">{{userName || telDeal}}</p>
					<p class="header__right--hint">{{timeHint}}</p>
				</div>
				<div class="header__right__next">
					<router-link to="/userDetail/editInfo">修改资料&nbsp;</router-link>
					<i class="el-icon-arrow-right"></i>
				</div>
			</div>
		</header>
		<section class="contract">
			<p class="contract-title">
				<i class="el-icon-document"></i>
				<span>我的合同</span>
			</p>
			<div>
				<div v-if="contractList.length === 0" class="contract--no">
					<p class="contract--no__title">您还没有履行中的合同，快去签约吧！～</p>
					<router-link class="contract--no__next" to="/h">去找房</router-link>
				</div>
				<div v-else></div>
			</div>
		</section>
	</div>
</template>

<script>
	import { mapGetters } from "vuex";

	export default {
		data() {
			let avator = require("@/assets/avator.jpg");
			return {
				avator,
				contractList: []
			};
		},
		computed: {
			...mapGetters(["userId", "userName", "telDeal", "userAvater"]),
			timeHint() {
				let time = new Date().getHours();
				switch (true) {
					case 0 <= time && time < 6:
						return "凌晨好";
					case 6 <= time && time < 11:
						return "上午好";
					case 11 <= time && time < 13:
						return "中午好";
					case 13 <= time && time < 18:
						return "下午好";
					case 18 <= time && time < 23:
						return "晚上好";
					default:
						return "你好";
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	$hoverColor: #00bfc8;
	$fontLightColor: #3dbcc6;
	$bacHoerClr: #3dbcc6;
	$NoHover: #999999;
	.header {
		display: flex;
		padding: 0 0 4rem 2rem;
		border-bottom: 1px solid #f1f1f1;
		&__left {
			width: 12rem;
			height: 12rem;
			border-radius: 50%;
			border: 0.2rem solid $fontLightColor;
			overflow: hidden;
			img {
				height: 100%;
				width: 100%;
			}
		}
		&__right {
			flex-grow: 1;
			display: flex;
			padding: 20px 0 0 40px;
			justify-content: space-between;
			&--name {
				font-size: 2rem;
				color: #000;
				margin-bottom: 1rem;
			}
			&--hint {
				color: $NoHover;
			}
			&__next {
				font-size: 1.4rem;
				color: $fontLightColor;
				a {
					color: $fontLightColor;
				}
			}
		}
	}
	.contract {
		&-title {
			padding: 3rem 0 2.4rem;
			font-size: 1.8rem;
			line-height: 2.1rem;
			color: #333;
			span {
				margin-left: 1.4rem;
			}
		}
		&--have {
			border-bottom: 1px solid #f1f1f1;
		}
		&--no {
			height: 200px;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
		}
	}
	.contract--no {
		&__title {
			font-size: 16px;
			color: #999;
		}
		&__next {
			display: block;
			background-color: #fff;
			min-width: 180px;
			width: auto;
			height: 50px;
			font-size: 1.8rem;
			line-height: 4.6rem;
			text-align: center;
			border: 2px solid #3dbcc6;
			border-radius: 33px;
			box-sizing: border-box;
			color: $hoverColor;
            padding: 0 30px;
            transition: all .2s;
            margin-top: 2rem;
			&:hover {
                background-color: $bacHoerClr;
                color: #fff;
            }
		}
	}
</style>