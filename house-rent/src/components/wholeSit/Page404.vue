<template>
	<div class="err">
		<h1 class="err-h">404&nbsp;ERROR</h1>
		<div class="err-gif">
			<img :src="gif404" alt />
		</div>
		<div class="err-go">
			<router-link class="err-go__a" to="/">GO&nbsp;&nbsp;HOME</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			let gif404 = require("@/assets/404.gif");
			return {
				gif404
			};
		}
	};
</script>

<style lang="scss" scoped>
@keyframes colorC {
    0%{
        color: #666666;
        border-color: #666666;
    }
    100%{
        color: #3dbcc6;
        border-color: #3dbcc6;

    }
}
.err {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	&-h {
		font-size: 60px;
		font-weight: bolder;
		color: #494949;
	}
	&-gif,
	&-go {
		width: fit-content;
		margin: 0 auto;
	}
    &-gif{
        width: 250px;
        height: 250px;
        img{
            height: 100%;
            width: 100%;
        }
    }
	&-go {
        margin-top: 20px;
        border: 2px solid #666;
        border-radius: 2em;
        animation: colorC 1s infinite alternate;
        padding: 4px 14px;
		&__a {
			color: #666666;
            animation: colorC 1s infinite alternate;
		}
	}
}
</style>