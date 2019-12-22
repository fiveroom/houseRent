<template>
	<div>
		<header-nav />
		<div class="body">
			<!-- 面包屑 -->
			<header class="body__header">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item>相寓租房</el-breadcrumb-item>
					<el-breadcrumb-item>个人设置</el-breadcrumb-item>
					<!-- <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item> -->
				</el-breadcrumb>
			</header>

			<!-- 搜索选择 -->
			<div class="body__check">
				<SearchHouse class="search-bytitle" v-model="searchValue" @clickTo="searchHouseByT" />
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
				<div class="user-check">
					<div
						:class="['user-check__item', dealChoice.length != 0?'user-check__item--have':'user-check__item--no']"
					>
						<div class="user-check__item--title">你已选择:</div>
						<div class="user-check__con">
							<div class="user-check__con--one" v-for="item in dealChoice" :key="item.index">
								<span>{{item.content}}</span>
								<i @click="delSearchKey(item.index)" class="el-icon-close"></i>
							</div>
						</div>
					</div>
					<ul class="user-check__sort">
						<li
							:class="[choiceSort == 0 ?'user-check__sort-li--check':'', 'user-check__sort-li']"
							@click="defaultSort"
						>默认排序</li>
						<li
							:class="[choiceSort == 1 ?'user-check__sort-li--check':'', 'user-check__sort-li']"
							@click="priceSort"
						>
							<span>价格</span>
							<i :class="['el-icon-sort-down', priceIndex == 1 ? 'user-check__sort-li--no':'']"></i>
							<i :class="['el-icon-sort-up', priceIndex == 0 ? 'user-check__sort-li--no':'']"></i>
						</li>
						<li
							:class="[choiceSort == 2 ?'user-check__sort-li--check':'', 'user-check__sort-li']"
							@click="areaSort"
						>
							<span>面积</span>
							<i :class="['el-icon-sort-down', areaIndex == 1 ? 'user-check__sort-li--no':'']"></i>
							<i :class="['el-icon-sort-up', areaIndex == 0 ? 'user-check__sort-li--no':'']"></i>
						</li>
					</ul>
				</div>
			</div>
			<section class="arrhouses" ref="arrHouse">
				<!-- 房源信息 -->
				<div v-if="arrHouses.length!=0" class="houses">
					<div class="houses-item" v-for="item in arrHouses" :key="item.House_id">
						<router-link class="houses__img" :to="`/hdetail?House_id=${item.House_id}`">
							<img :src="item.House_coverPic" alt />
						</router-link>
						<div class="houses__body">
							<!-- 标题 -->
							<router-link
								class="houses__title"
								:to="`/hdetail?House_id=${item.House_id}`"
							>{{item.House_title}}</router-link>
							<!-- 价格 -->
							<div class="houses__price">
								<div class="houses__price-des">
									<p>{{item.House_shape}}</p>
									<p>{{item.House_months | getChname}}</p>
									<p>朝{{item.House_direction}}</p>
								</div>
								<div class="houses__price-num">
									<span>￥</span>
									<span>{{item.House_rent}}</span>
									<span>元/月</span>
								</div>
							</div>
							<!-- 其他信息 -->
							<div class="houses__size">
								<span>{{item.House_area}}㎡</span>
								<span class="houses__size__split">|</span>
								<span>{{item.House_floor}}层</span>
							</div>
							<p class="houses__detail">{{item.House_detail}}</p>
							<!-- 地理位置 -->
							<div class="houses__locat">
								<i class="el-icon-location-outline"></i>
								<span>{{item.House_address}}</span>
							</div>
						</div>
					</div>
				</div>
				<div v-else class="nohouse">
					<div class="nohouse-img">
						<img :src="noHouseImg" alt />
					</div>
					<p>未找到对应房源，换个条件试试</p>
				</div>
			</section>
		</div>
		<Footer />
	</div>
</template>

<script>
	import { mapActions, mapGetters } from "vuex";
	import { Loading } from "element-ui";
	import * as houseApi from "@/api/house";
	import SearchHouse from "@/components/SearchHouse";
	export default {
		data() {
			let searchField = [
				{
					key: "locat",
					title: "位置",
					items: ["不限"]
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
					key: "room",
					title: "居室",
					items: ["不限", "套一", "套二", "套三"]
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
			let noHouseImg = require("@/assets/img/no-house.png");
			return {
				searchField,
				choiceSearchKey,
				startP: "",
				endP: "",
				reqData,
				arrHouses,
				noHouseImg,
				choiceSort: 0,
				priceIndex: 1,
				areaIndex: 1,
				searchValue: null
			};
		},
		computed: {
			...mapGetters(["city"]),
			// 选取的条件
			dealChoice() {
				let items = [];
				this.choiceSearchKey.forEach((item, index) => {
					item.item.forEach((con, itemIndex) => {
						console.log(con.split("-")[0], "sdaffffff");
						if (con.split("-")[0] != "0" && con.split("-")[0] != "p" && con.split("-")[0] != "s") {
							items.push({
								content: this.getCh(index, con),
								index: `${item.key}-${index}-${itemIndex}`
							});
						} else if (con.split("-")[0] == "p") {
							if (!this.startP) {
								this.startP = 0;
							}
							if (!this.endP) {
								this.endP = 999999;
							}
							items.push({
								content: `${this.startP}~${this.endP}元`,
								index: `p-price`
							});
						} else if(con.split("-")[0] == "s"){
							items.push({
								content: this.searchValue,
								index: `s-title`
							});
						}
					});
				});
				return items;
			}
		},
		methods: {
			...mapActions(["getCurLocat"]),
			// 验证价格搜索
			judgeNum(e, name) {
				if (!/^\d+([.]{0,1})([.]{1}|\d+){0,1}$/.test(this[name])) {
					this[name] = "";
				}
			},
			// 处理价格搜索
			getPriceSec() {
				let endP = parseInt(this.endP);
				let startP = parseInt(this.startP);
				endP = Number.isNaN(endP) ? 999999 : endP;
				startP = Number.isNaN(startP) ? 0 : startP;
				if (endP < startP) {
					let value = this.endP;
					this.endP = this.startP;
					this.startP = this.endP;
				}
				if (endP === "999999" && startP === 0) {
					this.dealData();
				} else {
					this.choiceSearchKey[1].item = ["p-price"];
					if (endP < startP) {
						this.dealData([endP, startP]);
					} else {
						this.dealData([startP, endP]);
					}
				}
			},
			getCh(index, item) {
				return this.searchField[index].items[item.split("-")[0]];
			},
			// 点击添加关键词 index-key
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
			},
			// 点击添加高亮
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
			dealData(other) {
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
				if (other) {
					this.reqData["rent_str"] = other;
				}
				console.log(this.reqData);
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
			// 获取当前条件的房源
			getArrHouse() {
				for (let key of Object.keys(this.reqData)) {
					this.reqData[key] = this.reqData[key].join();
				}
				this.reqData.noLoading = true;
				this.$myLoadding.open(this.$refs.arrHouse);
				houseApi.searchHouse(this.reqData, data => {
					if (data.Code == "200") {
						this.arrHouses = data.Data._Items;
					}
					this.$myLoadding.hide();
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
			},
			// 删除已选择的条件
			delSearchKey(item) {
				let arrItem = item.match(/(\d+)/g);
				if (!arrItem) {
					this.choiceSearchKey[1].item = ["0-price"];
					this.endP = null;
					this.startP = null;
					let index = this.choiceSearchKey[0].item.indexOf('s-title')
					if(index != -1){
						this.choiceSearchKey[0].item.splice(index, 1);
						this.searchValue = null
					}
				} else {
					let index = item.match(/(\d+)/g).map(ind => parseInt(ind));
					this.choiceSearchKey[index[0]].item.splice(index[1], 1);
					if (this.choiceSearchKey[index[0]].item.length == 0) {
						this.choiceSearchKey[index[0]].item.push(
							`0-${item.split("-")[0]}`
						);
					}
				}
				this.dealData();
			},
			// 默认排序
			defaultSort() {
				this.choiceSort = 0;
				this.dealData();
			},
			// 价格排序
			priceSort() {
				this.choiceSort = 1;
				if (this.priceIndex === 1) {
					this.arrHouses.sort((a, b) => b.House_rent - a.House_rent);
					this.priceIndex = 0;
				} else {
					this.arrHouses.sort((a, b) => a.House_rent - b.House_rent);
					this.priceIndex = 1;
				}
			},
			// 面积排序
			areaSort() {
				this.choiceSort = 2;
				if (this.areaIndex === 1) {
					this.arrHouses.sort(
						(a, b) => parseInt(b.House_area) - parseInt(a.House_area)
					);
					this.areaIndex = 0;
				} else {
					this.arrHouses.sort(
						(a, b) => parseInt(a.House_area) - parseInt(b.House_area)
					);
					this.areaIndex = 1;
				}
			},
			searchHouseByT() {
				let data = { house_title: this.searchValue };
				this.$myLoadding.open(this.$refs.arrHouse);
				this.choiceSearchKey[0].item.push('s-title');
				houseApi.queryByT(data).then(res => {
					this.arrHouses = res.data;
					this.$myLoadding.hide();
				});
			}
		},
		created() {
			this.getDistrict();
			this.getArrHouse();
		},
		filters: {
			getChname(value) {
				switch (true) {
					case value == "1":
						return "押一付一";
					case value == "2":
						return "押一付二";
					case value == "3":
						return "押一付三";
					default:
						return "";
				}
			}
		},
		mounted() {},
		components: {
			SearchHouse
		}
	};
</script>

<style lang="scss" scoped>
$hoverColor: #00bfc8;
$fontLightColor: #3dbcc6;
$noCheckFontColor: #dadce0;
$baseFontColor: #00000099;
@keyframes showChoice {
	0% {
		transform: scale(0);
	}
	50% {
		transform: scale(1.2);
	}
	100% {
		transform: scale(1);
	}
}
.body {
	width: 116.8rem;
	margin: 0 auto;
	&__header {
		height: 5rem;
		display: flex;
		align-items: center;
	}
	&__check {
		margin-bottom: 3rem;
	}
}
.search-bytitle{

}
.check-line {
	font-size: 1.5rem;
	padding-top: 1.5rem;
	display: flex;
	&__title {
		flex-shrink: 0;
		font-weight: bold;
		width: 7rem;
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
.user-check {
	margin-top: 3rem;
	border-bottom: 1px solid #e5e5e5;
	&__sort {
		display: flex;
		justify-content: flex-end;
		font-size: 1.6rem;
		&-li {
			margin-left: 4rem;
			position: relative;
			padding-bottom: 1rem;
			cursor: pointer;
			color: #00000099;
			i:nth-of-type(2) {
				transform: translateX(-8px);
			}
		}
		&-li--check:not(i) {
			color: $fontLightColor;
		}
		&-li--no {
			color: #00000099;
		}
		&-li--check::after {
			position: absolute;
			height: 2px;
			left: 0;
			bottom: -1px;
			width: 100%;
			content: "";
			background-color: $fontLightColor;
		}
	}
	&__item {
		display: flex;
		&--title {
			flex-shrink: 0;
			font-size: 13px;
			color: #00000099;
			width: 7rem;
			height: 23px;
			line-height: 23px;
		}
		overflow: hidden;
		transition: all 0.3s;
		&--no {
			height: 0;
			padding: 0;
		}
		&--have {
			height: auto;
			padding: 3rem 0;
		}
	}
	&__con {
		display: flex;
		flex-wrap: wrap;
		&--one {
			transform: scale(0);
			animation: showChoice 0.5s 0.3s forwards;
			margin: 0 10px 15px 0;
			background-color: #3dbcc626;
			font-size: 12px;
			padding: 4px 5px;
			border-radius: 4px;
			box-sizing: border-box;
			line-height: 12px;
			border: 1px solid $fontLightColor;
			color: $fontLightColor;
			i {
				cursor: pointer;
			}
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
	&--ch {
		margin-left: 5px;
	}
}
.nohouse {
	margin: 100px auto 0;
	width: fit-content;
	text-align: center;
	&-img {
		width: 150px;
		height: 150px;
		img {
			height: 100%;
			width: 100%;
		}
	}
	color: $noCheckFontColor;
	p {
		margin-top: 10px;
		font-size: 12px;
	}
}
.houses {
	&-item {
		float: left;
		width: 37rem;
		margin-right: 2.6rem;
		border-radius: 5px;
		overflow: hidden;
		border: 1px solid rgba(0, 0, 0, 0.12);
		margin-bottom: 2rem;
		transition: all 0.3s;
		&:hover {
			transform: translateY(-2px);
			box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
		}
	}
	&-item:nth-child(3n) {
		margin-right: 0;
	}
	&__img {
		display: block;
		height: 270px;
		width: 100%;
		img {
			width: 100%;
			height: 100%;
		}
	}
	&__title {
		font-size: 1.7rem;
		font-weight: bold;
		margin: 2rem 0 0.6rem 0;
		color: #000;
		transition: color 0.1s;
		&:hover {
			color: $hoverColor;
		}
	}
	&__body {
		height: 132px;
		padding: 1.6rem;
	}
	&__size,
	&__detail {
		font-size: 12px;
		padding-top: 8px;
		color: #00000066;
		&__split {
			margin: 0 5px;
		}
	}
	&__detail {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	&__locat {
		margin-top: 8px;
		border-radius: 10px;
		border: 1px solid $fontLightColor;
		box-sizing: border-box;
		color: $fontLightColor;
		width: fit-content;
		padding: 0 6px;
		font-size: 12px;
		line-height: 20px;
		transition: all 0.2s;
		cursor: pointer;
		&:hover {
			color: #fff;
			background-color: $fontLightColor;
		}
	}
}
.houses__price {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-top: 10px;
	&-des {
		display: flex;
		p {
			border-radius: 6px;
			padding: 2px 6px;
			font-size: 12px;
			border: 1px solid $fontLightColor;
			box-sizing: border-box;
			color: $fontLightColor;
			margin-right: 10px;
		}
	}
	&-num {
		font-size: 2rem;
		line-height: 2rem;
		color: $fontLightColor;
	}
}
.arrhouses {
	position: relative;
}
.arrhouses::after {
	content: "";
	display: block;
	clear: both;
}
</style>