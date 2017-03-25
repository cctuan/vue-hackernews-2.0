
import SearchInput from './../client/components/SearchInput.vue'
import { play } from 'vue-play'
import Vue from 'vue'

Vue.component('search-input', SearchInput)

play(SearchInput)
  .name('SearchInput')
  .displayName('SearchInput')
  .add('default', {
    template : `<div style="background-color:#1d242c"><search-input @change="onChange"/></div>`,
    methods : {
      onChange(val){
        console.log(val)
      }
    }
  })
