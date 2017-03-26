
import RatingStar from './../client/components/RatingStar.vue'
import { play } from 'vue-play'
import Vue from 'vue'

Vue.component('rating-star', RatingStar)


play(RatingStar)
  .name('RatingStar')
  .displayName('RatingStar')
  .add('default', {
    template : `
      <div style="background-color:#1d242c">
        <rating-star @change="onChange"
          :items="items"
          :value="1"/>
      </div>`,
    data(){
      return {
        items : [
          {title: 't', value: 1},
          {title: 't', value: 1},
          {title: 't', value: 1},
          {title: 't', value: 1},
          {title: 't', value: 1}
        ]
      }
    },
    methods : {
      onChange(val){
        console.log(val)
      }
    }
  })
