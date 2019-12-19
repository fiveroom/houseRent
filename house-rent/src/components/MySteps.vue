<template>
	<div class="step">
		<div v-for="(item, index) in stepInfo" :key="index" class="step-item">
			<div :class="['title',active===index?'title--check':'']">
				<span>{{item.title}}</span>
			</div>
			<p :class="['step-des', active===index?'step-des--check':'']" v-text="item.description"></p>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			active: Number,
			stepInfo: Array
		}
	};
</script>

<style lang="scss" scoped>
$hoverColor: #00bfc8;
$fontLightColor: #3dbcc6;
$bacHoerClr: #3dbcc6;
$NoHover: #999999;
$checkFontColor: #636b74;
$noCheckFontColor: #dadce0;
.step {
	display: flex;
	justify-content: center;
	text-align: center;
	&-item {
        width: 220px;
		// flex-grow: 1;
	}
	&-des {
		padding-top: 20px;
		font-size: 1.6rem;
		color: $noCheckFontColor;
		&--check {
			color: $checkFontColor;
		}
	}
}
.title {
	margin: 0 auto;
	width: 98%;
	position: relative;
	padding-bottom: 20px;
	font-size: 28px;
	line-height: 40px;
	font-weight: 700;
	border-bottom: 2px solid $noCheckFontColor;
	transition: all 0.3s;
	color: $noCheckFontColor;
	&::after {
		transition: all 0.3s;
		position: absolute;
		height: 10px;
		content: "";
		width: 10px;
		border: 2px solid $noCheckFontColor;
		border-radius: 50%;
		left: 50%;
		transform: translateX(-50%);
		background-color: #ffffff;
		bottom: -8px;
	}
	&--check {
		color: $bacHoerClr;
		border-bottom-color: $bacHoerClr;
		&::after {
			background-color: $bacHoerClr;
			border-color: #ffffff;
		}
	}
}
</style>