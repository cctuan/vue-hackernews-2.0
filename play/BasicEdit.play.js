import Vue from 'vue'
import BasicEdit from './../client/components/BasicEdit.vue'
import { play } from 'vue-play'

import COLORS from 'config/constants/COLOR'
import CLARITIES from 'config/constants/CLARITY'
import NOSES from 'config/constants/NOSES'
import STRONGS from 'config/constants/STRONGS'
import TASTES from 'config/constants/TASTE_TYPE'
import WINE_BODYS from 'config/constants/WINE_BODY'
import TANNINS from 'config/constants/TANNIN'
import SWEETNESS from 'config/constants/SWEETNESS'
import ACIDS from 'config/constants/ACID'
import * as types from 'config/constants/MISSING_FORM_TYPE'

const postData = {
  name : 'test1234',
  description_s : 'testrewre',
  rating : 1,
  _id : 'wer234rwfe',
  thumb : {
    current : {
      secure_url : 'https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/e15/11326728_909940382405585_636841396_n.jpg'
    }
  }
}

Vue.component('basic-edit', BasicEdit)

play(BasicEdit)
  .name('BasicEdit')
  .displayName('BasicEdit')
  .add('default', {
    template : `
      <div style="background-color:#1d242c">
        <basic-edit :post="post" :warnMsg="warnMsg"/>
        <button @click="onShowWarningMsg">Verify</button>
        <button @click="() => {}">Hide</button>
      </div>
      `,
    data() {
      return {
        warnMsg: {},
        post : {
          name : 'drink',
          updatedAt : Date.now(),
          rating : 4,
          description_s : 'drink is best',
          thumb : {
            current : {},
            original : {}
          }
        }
      }
    },
    methods : {
      onShowWarningMsg(){
        this.warnMsg = {
          [types.MISSING_RATING] : true,
          [types.MISSING_NAME] : true,
          [types.MISSING_DES_S] : true,
          [types.MISSING_TYPE] : true
        }
      }
    }
  })
