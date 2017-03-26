import Vue from 'vue'

import FormSlider from './../client/components/FormSlider.vue'
import { play } from 'vue-play'
Vue.component('form-slider', FormSlider)

play(FormSlider)
  .name('FormSlider')
  .displayName('FormSlider')
  .add('default', {
    template : `
      <div style="background-color:#1d242c">
        <form-slider v-bind="formConfig" :value="formConfig.value"
          v-on:change="onChange"/>
      </div>
      `,
    data() {
      let formConfig = {
        title : 'test slider',
        values : [0,1,2],
        value : 1,
        step : 1,
        min : 0,
        max : 2
      }
      return {
        formConfig
      }
    },
    methods : {
      onChange(val) {
        this.formConfig.value = val
      }
    }
  })
