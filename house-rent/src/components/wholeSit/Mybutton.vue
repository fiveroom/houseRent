<template>
	<div
		ref="formBut"
		:class="['but',disabled || authDisabled?'':'but--down']"
		@mousedown="addWrap"
		@mouseup="delWrap"
	>
		<div v-if="authCode" class="authcode">{{timeCount?`${timeCount}秒后重发`:'' || hintInfo}}</div>
		<span v-else v-text="title"></span>
		<div v-show="showWrap" class="wrap-box">
			<div :style="wrapStyle" :class="['wrap',wrapDown?'wrap--one':'']"></div>
			<div :style="wrapStyle" :class="['wrap',wrapDown?'wrap--two':'']"></div>
		</div>
		<div v-show="disabled || authDisabled || exsitPhone" class="but-disabled"></div>
	</div>
</template>

<script>
	/**
	 *
	 * 事件
	 * clickTo 点击后执行
	 */
	import { mapGetters } from "vuex";
	import { queryTel } from "@/api/user";
	export default {
		props: {
			title: null,
			disabled: Boolean,
			authCode: Boolean, // 开启验证码模式
			telePhone: String,
			autoJudge: Boolean
		},
		data() {
			return {
				wrapStyle: {},
				wrapDown: false,
				hintInfo: "获取验证码",
				timeCount: 0,
				authDisabled: false,
				exsitPhone: false
			};
		},
		computed: {
			showWrap() {
				if (!this.authCode) {
					return !this.authDisabled;
				}
				return !this.disabled;
			}
		},
		watch: {
			autoJudge(newV, oldV) {
				this.getRegisCode();
			}
		},
		methods: {
			// 按钮按下
			addWrap(e) {
				this.wrapDown = true;
				let percent =
					(
						e.offsetX /
						parseInt(getComputedStyle(this.$refs.formBut).width)
					).toFixed(2) *
						100 +
					"%";
				this.wrapStyle = {
					left: percent,
					transform: `translateX(-${percent})`
				};
			},
			// 按钮松开
			delWrap() {
				this.wrapDown = false;
				this.wrapStyle = {};
				if (this.authCode) {
					this.dealAuth();
				} else {
					this.$emit("clickTo");
				}
			},
			async dealAuth() {
				await this.getRegisCode();
				if (!this.disabled && !this.exsitPhone) {
					if (this.timeCount === 0) {
						this.$emit("clickTo", true);
						this.timeCount = 5;
						this.authDisabled = true;
						let timer = setInterval(() => {
							this.timeCount--;
							if (this.timeCount === 0) {
								clearInterval(timer);
								this.authDisabled = false;
							}
						}, 1000);
					} else {
						this.$emit("clickTo", false);
					}
				} else {
					this.$emit("clickTo", false);
				}
			},
			// 注册手机号判断
			async getRegisCode() {
				if (this.telePhone && !this.disabled) {
					let obj = { telephone: this.telePhone, noLoading: true };
					await queryTel(obj).then(res => {
						if (res.status) {
							this.exsitPhone = true;
						} else {
							this.exsitPhone = false;
						}
					});
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	@keyframes addWrap {
		0% {
			width: 0;
		}
		100% {
			width: 100%;
		}
	}

	.but {
		height: 4rem;
		display: flex;
		background-color: #2878ff;
		color: #fff;
		font-weight: bolder;
		border-radius: 0.4rem;
		position: relative;
		cursor: pointer;
		span {
			margin: auto;
		}
		box-shadow: 0 1px 6px rgba(0, 0, 0, 0.117647),
			0 1px 4px rgba(0, 0, 0, 0.117647);
		&--down:hover {
			background-color: #246ce5;
		}
		&--down:active {
			box-shadow: 2px 5px 8px rgba(0, 0, 0, 0.2),
				-2px 0px 6px rgba(0, 0, 0, 0.2);
		}
		&-disabled {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			background-color: rgba(255, 255, 255, 0.3);
		}
	}
	.authcode {
		margin: auto;
		font-size: 15px;
		font-weight: 400;
	}
	.wrap-box {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}
	.wrap {
		position: absolute;
		height: 100%;
		top: 0;
		width: 0;
		background-color: rgba(255, 255, 255, 0.1);
		&--one {
			animation: addWrap 0.3s forwards;
		}
		&--two {
			animation: addWrap 0.2s forwards;
		}
	}
</style>