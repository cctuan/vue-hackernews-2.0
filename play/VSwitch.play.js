import Vue from 'vue'

import VSwitch from './../client/components/VSwitch.vue'
import { play } from 'vue-play'
Vue.component('v-switch', VSwitch)

play(VSwitch)
  .name('VSwitch')
  .displayName('VSwitch')
  .add('default', {
    template : `
      <div style="background-color:#1d242c">
        <v-switch :checked="switchOn" @change="onChange" :disabled="false"/>
      </div>
      `,
    data(){
      return {
        switchOn : true
      }
    },
    methods : {
      onChange(val) {
        console.log(val)
        this.switchOn = val
        // this.formConfig.value = val
      }
    }
  })
  .add('disbled', {
    template : `
      <div style="background-color:#1d242c">
        <v-switch :checked="switchOn" @change="onChange" :disabled="true"/>
      </div>
      `,
    data(){
      return {
        switchOn : true
      }
    },
    methods : {
      onChange(val) {
        console.log(val)
        this.switchOn = val
        // this.formConfig.value = val
      }
    }
  })
