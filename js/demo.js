/*作用域插槽*/
Vue.component('my-list', {
	props: {
		books: {
			type: Array,
			default: function() {
				return [];
			}
		}
	},
	template: '\
	<ul>\
		<slot name="book"\
			v-for="book in books"\
			:book-name="book.name">\
		</slot>\
	</ul>'
});
var app = new Vue({
	el: '#app',
	data: {
		books: [{
				name: '<Vue.js实践>'
			},
			{
				name: '<JavaScript语言精粹>'
			},
			{
				name: '<JavaScript高级程序设计>'
			}
		]
	}
});

/*访问slot，$slots*/
Vue.component('child-component', {
	template: '\
	<div class="container">\
		<div class="header">\
			<slot name="header"></slot>\
		</div>\
		<div class="main">\
			<slot></slot>\
		</div>\
		<div class="footer">\
			<slot name="footer"></slot>\
		</div>\
	</div>',
	mounted: function() {
		var header = this.$slots.header;
		var main = this.$slots.default;
		var footer = this.$slots.footer;
		console.log("header:", header);
		console.log("footer:", footer);
		console.log(footer[0].elm.innerHTML);
	}
});
var app1 = new Vue({
	el: '#app1'
});

/*7.5.1 递归组件*/
Vue.component('child-component-b', {
	name: 'child-component-b',
	props: {
		count: {
			type: Number,
			default: 1
		}
	},
	template: '\
	<div class="child">\
		<p>循环</p>\
		<child-component-b\
			:count="count+1"\
			v-if="count<3"></child-component-b>\
	</div>',
});
var app2 = new Vue({
	el: '#app2'
});

/*7.5.2 内联模板*/
Vue.component('child-component-c', {
	props: ['message'],
	data: function() {
		return {
			msg: '在子组件中声明的数据'
		}
	}
});
var app3 = new Vue({
	el: '#app3',
	data: {
		message: '在父组件声明的数据'
	}
});

/*7.5.3 动态组件*/
var Home={
	template:'<p>Welcome home!</p>'
};
var app4 = new Vue({
	el: '#app4',
	components: {
		comA: {
			template: '<div>组件A</div>'
		},
		comB: {
			template: '<div>组件B</div>'
		},
		comC: {
			template: '<div>组件C</div>'
		}
	},
	data: {
		currentView: Home
	},
	methods: {
		handleChangeView:function(component){
			this.currentView='com'+component;
		}
	}
});

/*7.5.4 异步组件*/
Vue.component('child-component-d',function(resolve,reject){
	window.setTimeout(function(){
		resolve({
			template:'<div>我是异步渲染的</div>'
		});
	},2000);
})
var app5=new Vue({
	el:'#app5'
})