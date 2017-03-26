
import TasteNoseForm from './../client/components/TasteNoseForm.vue'
import { play } from 'vue-play'
import Vue from 'vue'
import NOSES from 'config/constants/NOSES'
import TASTES from 'config/constants/TASTE_TYPE'

Vue.component('taste-nose-form', TasteNoseForm)

play(TasteNoseForm)
  .name('TasteNoseForm')
  .displayName('TasteNoseForm')
  .add('default , nose', {
    template : `
      <div style="background-color:#1d242c">
        <taste-nose-form :values="noses"
        :val="currentValue" v-on:change="onChange"/>
      </div>`,
    data () {
      return {
        noses : NOSES,
        currentValue : []
      }
    },
    methods : {
      onChange(val){
        let currentIndex = this.currentValue.indexOf(val)

        if (currentIndex === -1) {
          this.currentValue.push(val)
        } else {
          this.currentValue.splice(currentIndex, 1)
        }
      }
    }
  })
  .add('default , teste', {
    template : `
      <div style="background-color:#1d242c">
        <taste-nose-form :values="tastes"
        :val="currentValue" v-on:change="onChange"/>
      </div>`,
    data () {
      return {
        tastes : TASTES,
        currentValue : []
      }
    },
    methods : {
      onChange(val){
        let currentIndex = this.currentValue.indexOf(val)

        if (currentIndex === -1) {
          this.currentValue.push(val)
        } else {
          this.currentValue.splice(currentIndex, 1)
        }
      }
    }
  })
