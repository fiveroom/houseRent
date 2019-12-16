<template>
	<div class="contain">
		<div class="input-box">
			<label v-if="lable" :for="lable" :class="lableStyle" v-text="placeholder"></label>
			<input
				@focus="focusStatus = true"
				:id="lable"
				class="input-box__ipt"
				:type="type || 'text'"
				:value="value"
				@blur="verifyValue"
				@input="$emit('input', $event.target.value)"
			/>
			<div :class="['input-box__remind', remindStyle]">
				<i class="el-icon-warning mycolor"></i>
				<span v-text="judgeRequired?' 输入不能为空':` ${regStr && regStr.hint}`"></span>
			</div>
			<div :class="hintLineStyle"></div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			type: null,
			placeholder: null,
			lable: null,
			value: null,
			required: Boolean,
			regStr: Object,
			upStatus: Boolean
		},
		data() {
			return {
				focusStatus: false, // 获取焦点状态
				valueStatus: false, // 校验判断
				judgeRequired: false, // 必填判断
				reStatus: false
			};
		},
		watch: {
			upStatus(newV, oldV) {
				console.log("sdfa");
				this.verifyValue();
			}
		},
		computed: {
			haveValue() {
				if (this.value) {
					return this.value.trim();
				}
				return false;
			},
			hintLineStyle() {
				return {
					"input-box__hintline": true,
					"input-box__hintline--focus": this.focusStatus,
					"input-box__hintline--novalue": this.judgeRequired,
					"input-box__hintline--warning":
						!this.judgeRequired && this.valueStatus
				};
			},
			lableStyle() {
				return {
					"input-box__hint": true,
					"input-box__hint--top": this.haveValue || this.focusStatus,
					"input-box__hint--top input-box__hint--color": this.haveValue
				};
			},
			remindStyle() {
				return {
					"input-box__remind--novalue": this.judgeRequired,
					"input-box__remind--warning":
						!this.judgeRequired && this.valueStatus
				};
			}
		},
		methods: {
			handleInput(e) {
				this.$emit("input", e.target.value);
			},
			verifyValue() {
				this.focusStatus = false;
				this.judgeRequired =
					!this.haveValue && !this.focusStatus && this.required;
				if (this.regStr) {
					this.valueStatus = !this.regStr.reg.test(this.value);
				}
				this.$emit(
					"inputStatus",
					this.regStr ? !this.valueStatus : !this.judgeRequired
				);
			}
		}
	};
</script>

<style lang="scss" scoped>
.contain{
	padding:1.8rem 0 2rem 0;
}
.input-box {
	width: 100%;
	border-bottom: 1px solid #999999;
	position: relative;
	// padding-top: 1.8rem;
	// margin-bottom: 2rem;
	// input
	&__ipt {
		border: 0;
		width: 100%;
		font-size: 16px;
		height: 3.2rem;
		outline: none;
	}
	// lable
	&__hint {
		cursor: auto;
		position: absolute;
		bottom: 0.8rem;
		color: #c5c5c5;
		transition: all 0.3s;
		&--top {
			font-size: 1.2rem;
			bottom: 3.6rem;
		}
		&--color {
			color: rgba(0, 0, 0, 0.54);
		}
		&--bottom {
			font-size: 1.6rem;
			bottom: 0.8rem;
		}
	}
	// input底部
	&__hintline {
		position: absolute;
		bottom: -0.1rem;
		left: 50%;
		transform: translateX(-50%);
		height: 2px;
		width: 0;
		background-color: #2878ff;
		transition: all 0.3s;
		&--focus {
			width: 100%;
		}
		&--novalue {
			width: 100%;
			background-color: #ffca5a;
		}
		&--warning {
			width: 100%;
			background-color: #ff4a66;
		}
	}
	// 输入提示非空和规则
	&__remind {
		position: absolute;
		right: 0;
		color: #8e9198;
		font-size: 1.2rem;
		line-height: 1.2rem;
		bottom: -1.8rem;
		display: none;
		&--novalue {
			display: block;
			i {
				color: #ffca5a;
			}
		}
		&--warning {
			display: block;
			i {
				color: #ff4a66;
			}
		}
	}
}
</style>