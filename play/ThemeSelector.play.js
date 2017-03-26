import Vue from 'vue'

import ThemeSelector from './../client/components/ThemeSelector.vue'
import { play } from 'vue-play'
import THEME_CONFIG from 'config/constants/THEME_CONFIG'

Vue.component('theme-selector', ThemeSelector)

play(ThemeSelector)
  .name('ThemeSelector')
  .displayName('ThemeSelector')
  .add('default', {
    template : `
      <div style="background-color:#1d242c">
        <theme-selector :thumb="thumb" :name="name"
          :description_s="description_s" :rating="rating"
          @previewChange="onPreviewChange" />
      </div>
      `,
    data(){
      return {
        thumb : {
          theme : {
            type : THEME_CONFIG.THEME1
          },
          original : {
            public_id : 'c5zqiqf0r2a3utu3spvp'
          }
        },
        name : 'test george',
        description_s : 'test description',
        rating : 3
      }
    },
    methods : {
      onPreviewChange(val) {
        console.log(val)
        this.thumb.theme.type = val.type
        // this.formConfig.value = val
      }
    }
  })
