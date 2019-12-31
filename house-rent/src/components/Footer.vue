<template>
	<footer class="footer">
		<div class="container">
			<div class="foot-top">
				<div class="foot-top__dl">
					<dl>
						<dt>XXX</dt>
						<dd>xxxxx</dd>
						<dd>xxxxx</dd>
						<dd>xxxxx</dd>
						<dd>xxxxx</dd>
					</dl>
					<dl>
						<dt>XXX</dt>
						<dd>xxxxx</dd>
						<dd>xxxxx</dd>
					</dl>
					<dl>
						<dt>XXX</dt>
						<dd>xxxxx</dd>
						<dd>xxxxx</dd>
						<dd>xxxxx</dd>
						<dd>xxxxx</dd>
					</dl>
				</div>
				<ul class="foot-top__ul">
					<li>
						<div class="hover-div">
							<div class="mini-img">
								<div class="mini-img--hid">
									<img :src="require('@/assets/img/weixin.png')" alt />
								</div>
								<div class="mini-img--hid">
									<img :src="require('@/assets/img/weixinLight.png')" alt />
								</div>
							</div>
							<p class="mini-img__name">小程序找房</p>
							<div
								class="hover-div__box"
								:style="{'backgroundImage': `url(${require('@/assets/img/box.png')})`}"
							>
								<img :src="weixin" alt />
							</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="foot-bot">
				<div>相寓</div>
				<div>
					<div>&reg;2019相寓&nbsp;蜀ICP备19030264号-1</div>
				</div>
			</div>
		</div>
	</footer>
</template>

<script>
	export default {
		data() {
			let weixin = require("@/assets/house.jpg");
			return {
				weixin
			};
		}
	};
</script>

<style lang="scss" scoped>
	.footer {
		margin-top: 5rem;
		padding: 4rem 0 5.4rem 0;
		background-color: rgb(33, 33, 33);
		.container {
			width: 116.8rem;
			margin: 0 auto;
		}
	}
	.foot-top {
		display: flex;
		justify-content: space-between;
		margin-bottom: 2.5rem;
		&__dl {
			display: flex;
			dl {
				margin-right: 6rem;
				&:last-of-type {
					margin-right: 0;
				}
			}
			dt {
				display: block;
				color: #aeaeae;
				padding: 0 0 45px;
				font-size: 20px;
			}
			dd {
				color: #fff;
				font-size: 22px;
				white-space: nowrap;
				font-weight: 700;
			}
		}
		&__ul {
			li {
				display: flex;
				height: 100%;
				flex-direction: column;
				justify-content: flex-end;
			}
		}
	}
	.mini-img {
		position: relative;
		width: 46px;
		height: 46px;
		margin: 0 auto 5px;
		&__name {
			color: #aeaeae;
			text-align: center;
			font-size: 14px;
		}
		&--hid {
			transition: opacity 0.3s;
			position: absolute;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			opacity: 1;
		}
		& > div:first-of-type {
			z-index: 0;
		}
		& > div:last-of-type {
			z-index: 2;
			opacity: 0;
		}
	}
	.hover-div {
		cursor: pointer;
		position: relative;
		transition: opacity 0.3s;
		&__box {
			position: absolute;
			width: 115px;
			height: 120px;
			background-repeat: no-repeat;
			left: 50%;
			transform: translateX(-50%);
			top: -126px;
			opacity: 0;
			transition: opacity 0.3s;
			img {
				width: 100%;
				height: 100%;
			}
		}
		&:hover > .mini-img > div:last-of-type,
		&:hover > &__box {
			opacity: 1;
		}
		&:hover > .mini-img__name {
			color: #fff;
		}
	}
	.foot-bot {
		display: flex;
		align-items: center;
		padding-top: 2rem;
		& > div:first-of-type {
			height: 32px;
			font-size: 32px;
			color: #fff;
			line-height: 32px;
		}
		& > div:last-of-type {
			margin-left: 2rem;
			color: #fff;
			font-size: 12px;
		}
		border-top: 1px dashed rgba(255, 255, 255, 0.1);
	}
</style>