<template>
	<div>
		<header-nav />
		<div class="body">
			<header class="body__header">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item>相寓租房</el-breadcrumb-item>
					<el-breadcrumb-item>个人设置</el-breadcrumb-item>
					<!-- <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item> -->
				</el-breadcrumb>
			</header>
			<div class="body__check">
				<div v-for="(item, index) in searchField" :key="index" class="check-line">
					<div v-text="item.title" class="check-line__title"></div>
					<ul class="check-line__con">
						<li
							v-for="(value, indexC) in item.items"
							:key="indexC"
							v-text="value"
							class="check-line__alone"
						></li>
						<li v-if="item.title === '价格'" class="input-price">
							<input v-model="startP" @input="judgeNum($event, 'startP')" type="text" />
							<span class="input-price--min">-</span>
							<input v-model="endP" @input="judgeNum($event, 'endP')" type="text" />
							<span class="input-price--ch">元</span>
							<span @click="getPriceSec" class="input-price--confim">确定</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			let searchField = [
				{
					title: "位置",
					items: ["不限", "高新区", "双流区"]
				},
				{
					title: "价格",
					items: [
						"不限",
						"1500元以下",
						"1500~2000元",
						"1500~2000元",
						"2000~2500元",
						"2500~3000元",
						"3000元以上"
					]
				},
				{
					title: "居室",
					items: ["不限", "一居室", "二居室", "三居室", "四居室以上"]
				},
				{
					title: "类型",
					items: ["不限", "押一付一", "押一付二", "押一付三"]
				}
			];
			let feature = {
				title: "特色",
				items: [
					{
						title: "朝向",
						items: ["不限", "东", "南", "西", "北"]
					},
					{
						title: "面积",
						items: [
							"10㎡以下",
							"10~12㎡以下",
							"12~15㎡以下",
							"15~20㎡以下",
							"20㎡以上"
						]
					},
					{
						title: "楼层",
						items: [
							"5层以下",
							"5~10层",
							"10~15层",
							"16~20层",
							"20层以上"
						]
					}
				]
			};
			return {
				searchField,
				startP: null,
				endP: null
			};
		},
		computed: {
			startPreg() {
				if (/^\d+$/.test(this.startP)) {
					this.startP = oldV + newV + "";
				}
				console.log(/^\d+$/.test(newV));
				this.startP = oldV;
			}
        },
        methods: {
            judgeNum(e, name) {
                if(!/^\d+|\.$/.test(e.target.value)){
                    this[name] = ''
                }
            },
            getPriceSec(){
                // if()
            }
        },
	};
</script>

<style lang="scss" scoped>
	$hoverColor: #00bfc8;
	$fontLightColor: #3dbcc6;
	.body {
		width: 116.8rem;
		margin: 0 auto;
		&__header {
			height: 5rem;
			display: flex;
			align-items: center;
		}
		&__check {
			// border: 1px solid #e5e5e5;
		}
	}
	.check-line {
		font-size: 1.5rem;
		padding-top: 1.5rem;
		display: flex;
		&__title {
			font-weight: bold;
			width: 6rem;
		}
		&__con {
			flex-grow: 1;
			display: flex;
			flex-wrap: wrap;
			border-bottom: 1px solid #e5e5e5;
		}
		&__alone {
			color: rgba(0, 0, 0, 0.6);
			font-size: 1.5rem;
			margin-right: 2rem;
			margin-bottom: 1.5rem;
			cursor: pointer;
			&:hover {
				text-decoration: underline;
			}
		}
	}
	.check-color {
		color: $fontLightColor;
	}
	.input-price {
		color: rgba(0, 0, 0, 0.6);
		display: flex;
		height: auto;
		input:focus {
			outline: none;
		}
		input {
			border: 1px solid #e5e5e5;
			border-radius: 2px;
			width: 46px;
			padding: 2px 2px 2px 5px;
			height: 16px;
			color: rgba(0, 0, 0, 0.6);
		}
		&--min {
			margin: 0 4px;
		}
		div {
			width: 30px;
		}
		&--confim {
			font-size: 1.4rem;
			color: $fontLightColor;
			margin-left: 2rem;
			cursor: pointer;
		}
	}
</style>