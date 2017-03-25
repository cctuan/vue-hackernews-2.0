import Vue from 'vue'
import PostItem from './../client/components/PostItem.vue'
import { play } from 'vue-play'

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

const PostList = () => {
  return Array(10).fill().map(() => postData)
}

Vue.component('post-item', PostItem)

play(PostItem)
  .name('PostItem Block')
  .displayName('PostItem Block')
  .add('default', {
    render(h) {
      return  h(PostItem, {
        props : {
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
      })
    }
  })
  .add('PostItem list', {
    template : `<div><post-item v-for="post in posts"  v-bind="post" /></div>`,
    data () {
      return {
        posts : PostList()
      }
    }
  })
  .add('long name and description', {
    render(h) {
      return  h(PostItem, {
        props : {
          name : 'test test test test test test test test test test test test test test test test test test test test test',
          description_s : 'test test test test test test test test test test test test test test test test test test test test testtest test test test test test test test test test test test test test test test test test test test testtest test test test test test test test test test test test test test test test test test test test test',
          rating : 1,
          _id : 'wer234rwfe',
          thumb : {
            current : {
              secure_url : 'https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/e15/11326728_909940382405585_636841396_n.jpg'
            }
          }
        }
      })
    }
  })
  .add('long series name and description', {
    render(h) {
      return  h(PostItem, {
        props : {
          name : 'fnelkjqrfjkberwkgjlnewkjrlnglkjerwngkljnwerlkjgnkeljrwmgnkljerwngklnewlkjrgnlkwergn',
          description_s : 'ewhfewnflkwenkflnerklgnlkewgnlkwenglkwernglknwerngmlnjerwkmgnkljwernglkwergkewhfewnflkwenkflnerklgnlkewgnlkwenglkwernglknwerngmlnjerwkmgnkljwernglkwergkewhfewnflkwenkflnerklgnlkewgnlkwenglkwernglknwerngmlnjerwkmgnkljwernglkwergk',
          rating : 1,
          _id : 'wer234rwfe',
          thumb : {
            current : {
              secure_url : 'https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/e15/11326728_909940382405585_636841396_n.jpg'
            }
          }
        }
      })
    }
  })
