/*
 * 根实例
 */

function isValueNumber(value) {
	return(/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value + '');
}

/*此处的默认值Infinity是无限大和无限小*/
Vue.component('input-number', {
	template: '\
		<div class="input-number">\
			<input \
				type="text" \
				:value="currentValue" \
				@keyup.down="handleDown(1)" \
				@keyup.up="handleUp(1)" \
				@change="handleChange"> \
			<button \
				@click="handleDown(1)" \
				:disable="currentValue<=min">-</button> \
			<button \
				@click="handleUp(1)" \
				:disable="currentValue>=max">+</button> \
			<button \
				@click="handleDown(currentStep)" \
				:disable="currentValue<=min">-10</button> \
			<button \
				@click="handleUp(currentStep)" \
				:disable="currentValue>=max">+10</button> \
		</div>',
	props: {
		max: {
			type: Number,
			default: Infinity
		},
		min: {
			type: Number,
			default: -Infinity
		},
		value: {
			type: Number,
			default: 0
		},
		step: {
			type: Number,
			default: 1
		}
	},
	data: function() {
		return {
			currentValue: this.value,
			currentStep: this.step
		}
	},
	watch: {
		currentVaule: function(val) {
			this.$emit('input', val);
			this.$emit('on-change', val);
		},
		value: function(val) {
			this.updateValue(val);
		}
	},
	methods: {
		handleDown: function(step) {
			if(this.currentValue - step <= this.min) {
				this.currentValue = this.min;
				return;
			}
			this.currentValue -= step;
		},
		handleUp: function(step) {
			if(this.currentValue + step >= this.max) {
				this.currentValue = this.max;
				return;
			}
			this.currentValue += step;
		},
		updateValue: function(val) {
			if(val > this.max) val = this.max;
			if(val < this.min) val = this.min;
			this.currentValue = val;
		},
		handleChange: function(event) {
			var val = event.target.value.trim();
			var max = this.max;
			var min = this.min;
			if(isValueNumber(val)) {
				val = Number(val);
				this.currentValue = val;
				if(val > max) {
					this.currentValue = max;
				} else if(val < min) {
					this.currentValue = min;
				}
			} else {
				event.target.value = this.currentValue;
			}
		}
	},
	mounted: function() {
		this.updateValue(this.value);
	}
});