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
							:key="0"
							:data-sole="`0-${item.key}`"
							v-text="item.items[0]"
							:class="['check-line__alone', addLight(0, item.key)?'check-line__alone--choice':'']"
							@click="addSearchKey($event, 0)"
						></li>
						<li class="check-line__option">
							<div
								v-for="(value, indexC) in item.items.slice(1)"
								:key="indexC+1"
								:data-sole="`${indexC+1}-${item.key}`"
								:class="['check-line__alone', addLight(indexC+1, item.key)?'check-line__alone--choice':'']"
								v-text="value"
								@click="addSearchKey($event, indexC+1)"
							></div>
						</li>
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
	import { mapActions, mapGetters } from "vuex";
	import * as houseApi from "@/api/house";
	export default {
		data() {
			let searchField = [
				{
					key: "locat",
					title: "位置",
					items: ["不限"]
				},
				{
					key: "room",
					title: "居室",
					items: ["不限", "套一", "套二", "套三"]
				},
				{
					key: "price",
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
					key: "type",
					title: "类型",
					items: ["不限", "押一付一", "押一付二", "押一付三"]
				}
			];
			let choiceSearchKey = [
				{
					key: "locat",
					searchKey: "area_str",
					item: ["0-locat"]
				},
				{
					key: "price",
					searchKey: "rent_str",
					item: ["0-price"]
				},
				{
					key: "room",
					searchKey: "shape_str",
					item: ["0-room"]
				},
				{
					key: "type",
					searchKey: "months_str",
					item: ["0-type"]
				}
			];
			let reqData = {
				area_str: [],
				rent_str: [],
				shape_str: [],
				months_str: []
			};
			let arrHouses = [];
			return {
				searchField,
				choiceSearchKey,
				startP: null,
				endP: null,
				reqData,
				arrHouses
			};
		},
		computed: {
			...mapGetters(["city"])
		},
		methods: {
			...mapActions(["getCurLocat"]),
			judgeNum(e, name) {
				if (!/^\d+(\.{1}\d+){0,1}$/.test(e.target.value)) {
					this[name] = "";
				}
			},
			getPriceSec() {
				// if()
			},
			addSearchKey(e, indexC) {
				let [index, key] = e.target.dataset.sole.split("-");
				let arrItem = [];
				let indexA = null;
				let minItem = `0-${key}`;
				for (let i = 0; i < this.choiceSearchKey.length; i++) {
					if (this.choiceSearchKey[i].key === key) {
						arrItem = this.choiceSearchKey[i].item;
						indexA = i;
						break;
					}
				}
				if (key == "price") {
					arrItem = [e.target.dataset.sole];
				} else {
					let resNow = arrItem.indexOf(e.target.dataset.sole);
					if (resNow === -1) {
						arrItem.push(e.target.dataset.sole);
					} else {
						arrItem.splice(resNow, 1);
					}
					let resMin = arrItem.indexOf(minItem);
					if (index === "0") {
						arrItem = [minItem];
					} else if (resMin != -1) {
						arrItem.splice(arrItem.indexOf(minItem), 1);
					}
					if (arrItem.length === 0) {
						arrItem = [minItem];
					}
				}
				this.choiceSearchKey[indexA].item = arrItem;
				this.dealData();

				console.log(this.reqData);
			},
			addLight(indexC, key) {
				let arrItem = [];
				for (let i = 0; i < this.choiceSearchKey.length; i++) {
					if (this.choiceSearchKey[i].key === key) {
						arrItem = this.choiceSearchKey[i].item;
						break;
					}
				}
				return arrItem.includes(`${indexC}-${key}`);
			},
			// 获取请求参数
			dealData() {
				for (let m of this.searchField) {
					for (let n of this.choiceSearchKey) {
						if (n.key === m.key) {
							let indexItem = n.item.map(item => item.split("-")[0]);
							this.reqData[n.searchKey] = [];
							m.items.forEach((item, index) => {
								if (indexItem.includes(index + "")) {
									this.reqData[n.searchKey] = this.reqData[
										n.searchKey
									].concat(this.dealFormat(n.key, item, index));
								}
							});
						}
					}
				}
				this.getArrHouse();
			},
			// 处理数据格式
			dealFormat(key, data, index) {
				if (data == "不限") {
					return "";
				} else if (key === "price") {
					let arrNum = data.match(/(\d+)/g);
					if (data.includes("上")) {
						arrNum.push("999999");
					} else if (data.includes("下")) {
						arrNum.unshift("0");
					}
					return arrNum;
				} else if (key === "type") {
					return index + "";
				}
				return data;
			},
			getArrHouse() {
				for (let key of Object.keys(this.reqData)) {
					this.reqData[key] = this.reqData[key].join();
				}
				houseApi.searchHouse(this.reqData, data => {
					console.log(data, "房子信息");
					this.reqData = {
						area_str: [],
						rent_str: [],
						shape_str: [],
						months_str: []
					};
				});
			},
			// 获取区
			getDistrict() {
				this.$store
					.dispatch("dealDistrict", {
						keywords: this.city || "成都"
					})
					.then(data => {
						if (data.status) {
							this.searchField[0].items = ["不限"].concat(
								data.msg.map(item => item.name)
							);
						}
					});
			}
		},
		created() {
			this.getDistrict();
			this.getArrHouse()
		}
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
			flex-shrink: 0;
			font-weight: bold;
			width: 6rem;
		}
		&__con {
			flex-grow: 1;
			display: flex;
			border-bottom: 1px solid #e5e5e5;
		}
		&__alone {
			flex-shrink: 0;
			color: rgba(0, 0, 0, 0.6);
			font-size: 1.5rem;
			margin-right: 2rem;
			margin-bottom: 1.5rem;
			cursor: pointer;
			&:hover {
				text-decoration: underline;
			}
			&--choice {
				color: $fontLightColor;
			}
		}
		&__option {
			display: flex;
			flex-wrap: wrap;
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