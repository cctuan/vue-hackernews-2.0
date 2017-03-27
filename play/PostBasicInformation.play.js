import Vue from 'vue'
import PostBasicInformation from './../client/components/PostBasicInformation.vue'
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

Vue.component('post-basic-information', PostBasicInformation)

play(PostBasicInformation)
  .name('PostBasicInformation')
  .displayName('PostBasicInformation')
  .add('default', {
    template : `
      <div style="background-color:#1d242c">
        <post-basic-information :name="name" :updatedAt="updatedAt"
          :description_s="description_s" :meta="meta" :rating="rating"/>
      </div>
      `,
    data() {
      return {
        name : 'drink',
        updatedAt : Date.now(),
        rating : '4',
        description_s : 'drink is best',
        meta : {
          color : COLORS[0].val,
          clarity : CLARITIES[0].val,
          nose : {
            type: [
              2, 15, 17, ,19
            ],
            strong: STRONGS[0].val,
          },
          taste : {
            body : WINE_BODYS[0].val,
            danie : TANNINS[0].val,
            sweet : SWEETNESS[0].val,
            acid : ACIDS[0].val,
            type : [
              1,3,20
            ]
          },
          other : {
            price : 123,
            year: 2011,
          }
        }
      }
    }
  })
  .add('long name', {
    template : `
      <div style="background-color:#1d242c">
        <post-basic-information :name="name" :updatedAt="updatedAt"
          :description_s="description_s" :meta="meta" :rating="rating"/>
      </div>
      `,
    data() {
      return {
        name : 'drinkfewf efw ewfkwjefnkjwqnfkjlnwqelfkn elkwqfnl',
        updatedAt : Date.now(),
        rating : '4',
        description_s : 'drinkfewf efw ewfkwjefnkjwqnfkjlnwqelfkn elkwqfnldrinkfewf efw ewfkwjefnkjwqnfkjlnwqelfkn elkwqfnldrinkfewf efw ewfkwjefnkjwqnfkjlnwqelfkn elkwqfnldrinkfewf efw ewfkwjefnkjwqnfkjlnwqelfkn elkwqfnldrinkfewf efw ewfkwjefnkjwqnfkjlnwqelfkn elkwqfnldrinkfewf efw ewfkwjefnkjwqnfkjlnwqelfkn elkwqfnl',
        meta : {
          color : COLORS[0].val,
          clarity : CLARITIES[0].val,
          nose : {
            type: [
              2, 15, 17, ,19
            ],
            strong: STRONGS[0].val,
          },
          taste : {
            body : WINE_BODYS[0].val,
            danie : TANNINS[0].val,
            sweet : SWEETNESS[0].val,
            acid : ACIDS[0].val,
            type : [
              1,3,20
            ]
          },
          other : {
            price : 123,
            year: 2011,
          }
        }
      }
    }
  })
  .add('no rating', {
    template : `
      <div style="background-color:#1d242c">
        <post-basic-information :name="name" :updatedAt="updatedAt"
          :description_s="description_s" :meta="meta" :rating="rating"/>
      </div>
      `,
    data() {
      return {
        name : 'drinkfewf efw ewfkwjefnkjwqnfkjlnwqelfkn elkwqfnl',
        updatedAt : Date.now(),
        rating : null,
        description_s : 'drinkfewf efw ewfkwjefnkjwqnfkjlnwqelfkn elkwqfnldrinkfewf efw ewfkwjefnkjwqnfkjlnwqelfkn elkwqfnldrinkfewf efw ewfkwjefnkjwqnfkjlnwqelfkn elkwqfnldrinkfewf efw ewfkwjefnkjwqnfkjlnwqelfkn elkwqfnldrinkfewf efw ewfkwjefnkjwqnfkjlnwqelfkn elkwqfnldrinkfewf efw ewfkwjefnkjwqnfkjlnwqelfkn elkwqfnl',
        meta : {
          color : COLORS[0].val,
          clarity : CLARITIES[0].val,
          nose : {
            type: [
              2, 15, 17, ,19
            ],
            strong: STRONGS[0].val,
          },
          taste : {
            body : WINE_BODYS[0].val,
            danie : TANNINS[0].val,
            sweet : SWEETNESS[0].val,
            acid : ACIDS[0].val,
            type : [
              1,3,20
            ]
          },
          other : {
            price : 123,
            year: 2011,
          }
        }
      }
    }
  })
  .add('no nose', {
    template : `
      <div style="background-color:#1d242c">
        <post-basic-information :name="name" :updatedAt="updatedAt"
          :description_s="description_s" :meta="meta" :rating="rating"/>
      </div>
      `,
    data() {
      return {
        name : 'drinkfewf efw ewfkwjefnkjwqnfkjlnwqelfkn elkwqfnl',
        updatedAt : Date.now(),
        rating : null,
        description_s : 'drinkfewf efw ewfkwjefnkjwqnfkjlnwqelfkn elkwqfnldrinkfewf efw ewfkwjefnkjwqnfkjlnwqelfkn elkwqfnldrinkfewf efw ewfkwjefnkjwqnfkjlnwqelfkn elkwqfnldrinkfewf efw ewfkwjefnkjwqnfkjlnwqelfkn elkwqfnldrinkfewf efw ewfkwjefnkjwqnfkjlnwqelfkn elkwqfnldrinkfewf efw ewfkwjefnkjwqnfkjlnwqelfkn elkwqfnl',
        meta : {
          color : COLORS[0].val,
          clarity : CLARITIES[0].val,
          taste : {
            body : WINE_BODYS[0].val,
            danie : TANNINS[0].val,
            sweet : SWEETNESS[0].val,
            acid : ACIDS[0].val,
            type : [
              1,3,20
            ]
          },
          other : {
            price : 123,
            year: 2011,
          }
        }
      }
    }
  })
  .add('no taste', {
    template : `
      <div style="background-color:#1d242c">
        <post-basic-information :name="name" :updatedAt="updatedAt"
          :description_s="description_s" :meta="meta" :rating="rating"/>
      </div>
      `,
    data() {
      return {
        name : 'drinkfewf efw ewfkwjefnkjwqnfkjlnwqelfkn elkwqfnl',
        updatedAt : Date.now(),
        rating : null,
        description_s : 'drinkfewf efw ewfkwjefnkjwqnfkjlnwqelfkn elkwqfnldrinkfewf efw ewfkwjefnkjwqnfkjlnwqelfkn elkwqfnldrinkfewf efw ewfkwjefnkjwqnfkjlnwqelfkn elkwqfnldrinkfewf efw ewfkwjefnkjwqnfkjlnwqelfkn elkwqfnldrinkfewf efw ewfkwjefnkjwqnfkjlnwqelfkn elkwqfnldrinkfewf efw ewfkwjefnkjwqnfkjlnwqelfkn elkwqfnl',
        meta : {
          color : COLORS[0].val,
          clarity : CLARITIES[0].val,
          other : {
            price : 123,
            year: 2011,
          },
          nose : {
            type: [
              2, 15, 17, ,19
            ],
            strong: STRONGS[0].val,
          },
        }
      }
    }
  })
  .add('no meta', {
    template : `
      <div style="background-color:#1d242c">
        <post-basic-information :name="name" :updatedAt="updatedAt"
          :description_s="description_s" :meta="meta" :rating="rating"/>
      </div>
      `,
    data() {
      return {
        name : 'drinkfewf efw ewfkwjefnkjwqnfkjlnwqelfkn elkwqfnl',
        updatedAt : Date.now(),
        rating : null,
        description_s : 'drinkfewf efw ewfkwjefnkjwqnfkjlnwqelfkn elkwqfnldrinkfewf efw ewfkwjefnkjwqnfkjlnwqelfkn elkwqfnldrinkfewf efw ewfkwjefnkjwqnfkjlnwqelfkn elkwqfnldrinkfewf efw ewfkwjefnkjwqnfkjlnwqelfkn elkwqfnldrinkfewf efw ewfkwjefnkjwqnfkjlnwqelfkn elkwqfnldrinkfewf efw ewfkwjefnkjwqnfkjlnwqelfkn elkwqfnl',
        meta: null
      }
    }
  })
