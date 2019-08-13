var app = new Vue({
	el: '#app',
	data: {
		isCheckAll: false,
		list: [{
				name: '电子产品',
				isCheckType: false,
				list: [{
						id: 1,
						name: 'iPhone 7',
						price: 6188,
						count: 1,
						isCheck: true
					},
					{
						id: 2,
						name: 'iPad Pro',
						price: 5888,
						count: 1,
						isCheck: true
					},
					{
						id: 3,
						name: 'MacBook Pro',
						price: 21488,
						count: 1,
						isCheck: false
					}
				]
			},
			{
				name: '生活用品',
				isCheckType: false,
				list: [{
						id: 1,
						name: '海尔洗衣机',
						price: 1999,
						count: 1,
						isCheck: false
					},
					{
						id: 2,
						name: '美的空调',
						price: 3676,
						count: 1,
						isCheck: false
					},
					{
						id: 3,
						name: '晾衣架',
						price: 176,
						count: 1,
						isCheck: false
					}
				]
			},
			{
				name: '果蔬',
				isCheckType: false,
				list: [{
						id: 1,
						name: '苹果(箱)',
						price: 150,
						count: 1,
						isCheck: false
					},
					{
						id: 2,
						name: '车厘子(盒)',
						price: 100,
						count: 1,
						isCheck: false
					}
				]
			}

		]
	},
	computed: {
		totalPrice: function() {
			var total = 0;
			for(types of this.list) {
				for(goods of types.list) {
					if(goods.isCheck) {
						total += goods.price * goods.count;
					}
				}
			}
			return total.toString().replace(/\B(?=(\d{3})+$)/g, ',');
		}
	},
	methods: {
		handleReduce: function(index, subindex) {
			if(this.list[index].list[subindex].count === 1) return;
			this.list[index].list[subindex].count--;
		},
		handleAdd: function(index, subindex) {
			console.log(this.list[index]);
			this.list[index].list[subindex].count++;
		},
		handleRemove: function(index, subindex) {
			this.list[index].list.splice(subindex, 1);
			//删除整个分类
			if(this.list[index].list.length===0){
				this.list.splice(index,1);
			}
		},
		isSelectGoods: function(index, subindex) {
			var good = this.list[index].list[subindex];
			good.isCheck = !good.isCheck;
			//判断某一分类所有商品是否选中
			for(var i = 0; i < this.list.length; i++) {
				var type = this.list[i];
				for(var j = 0; j < type.list.length; j++) {
					if(type.list[j].isCheck == false) {
						type.isCheckType = false;
						break;
					}
					if(j == type.list.length - 1 && type.list[j].isCheck == true) {
						type.isCheckType = true;
					}
				}
			}
			//判断所有商品是否选中
			for(var i = 0; i < this.list.length; i++) {
				if(this.list[i].isCheckType == false) {
					this.isCheckAll = false;
					break;
				}
				if(i == this.list.length - 1 && this.list[i].isCheckType == true) {
					this.isCheckAll = true;
				}
			}
		},
		isSelectType: function(index) {
			this.list[index].isCheckType = !this.list[index].isCheckType;
			for(goods of this.list[index].list) {
				goods.isCheck = this.list[index].isCheckType;
			}
			//判断是否所有分类选中
			for(var i = 0; i < this.list.length; i++) {
				if(this.list[i].isCheckType == false) {
					this.isCheckAll = false;
					break;
				}
				if(i == this.list.length - 1 && this.list[i].isCheckType == true) {
					this.isCheckAll = true;
				}
			}
		},
		isSelectAll: function() {
			this.isCheckAll = !this.isCheckAll;
			for(types of this.list) {
				types.isCheckType = this.isCheckAll;
				for(goods of types.list) {
					goods.isCheck = this.isCheckAll;
				}
			}
		}
	}
});