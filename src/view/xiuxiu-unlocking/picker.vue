<template>
  <div>
    <picker :data='years' v-model='year1' @on-change='change'></picker>
	</div>
</template>

<script>
import { Picker } from 'vux'

	let years = []
	years.push({name:'请选择',value: '0'})
  years.push({name:'共享单车',value: '1'})
	years.push({name:'私人单车',value: '2'})
	
export default {
	name: 'mypicker',
  components: {
    Picker,
  },
  data () {
    return {
      years: [years],
      year1: [''],
			selectValue: ""
		}
	},
	methods: {
		change (value) {
			console.log('new value',value);
			this.selectValue = value;
			this.$emit('lisenToPick',this.selectValue);
		}
	}
}
</script>