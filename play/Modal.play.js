
import Modal from './../client/components/Modal.vue'

import { play } from 'vue-play'
import Vue from 'vue'

Vue.component('modal', Modal)

play(Modal)
  .name('Modal')
  .displayName('Modal')
  .add('default', {
    template : `
      <div :style="styleObj" >
        <modal v-if="showModal" @close="onModalClose">
          <button slot="body" @click="onModalClose">CLOSE</button>
        </modal>
        <button @click="showModal=true">Launch Modal dialog</button>
      </div>
    `,
    data(){
      return {
        showModal : false,
        styleObj : {
          width : '100%',
          position : 'absolute',
          height : '300px'
        }
      }
    },
    methods: {
      onModalClose(){
        console.log(' modal is closed.')
        this.showModal = false
      }
    }
  })
