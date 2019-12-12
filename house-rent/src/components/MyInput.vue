<template>
	<div class="input-box">
		<label :for="id" :class="['input-box__hint', {'input-box--top': haveValue || focusStatus}]" v-text="placeholder"></label>
		<input @focus="focusStatus = focusStatus ? true : false" :id="id" class="input-box__ipt" :type="type || 'text'" />
		<div class="input-box__focus"></div>
	</div>
</template>

<script>
	export default {
        props: ["type", "placeholder", "id"],
        data(){
            return {
                focusStatus: false,
                haveValue: false
            }
        }
	};
</script>

<style lang="scss" scoped>
@keyframes lineColor {
	0% {
		width: 0;
	}
	100% {
		width: 100%;
	}
}
@keyframes minFont {
	0% {
		transform: scale(1)
	}
	100% {
		transform: scale(0.8)
	}
}
.input-box {
	width: 100%;
	border: 1px solid #999999;
	position: relative;
	padding-top: 38px;
	&__ipt {
		border: 0;
		width: 100%;
		font-size: 16px;
		height: 32px;
		outline: none;
		&:focus + div {
			position: absolute;
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);
			width: 0;
			height: 2px;
			background-color: #2878ff;
			animation: lineColor 0.3s forwards;
			// animation-fill-mode: ;
		}
	}
	&__hint {
		cursor: auto;
		position: absolute;
		left: 2px;
		bottom: 8px;
		color: #9e9e9e;
	}
	&--top {
        // animation: minFont .3s forwards;
	}
}
</style>