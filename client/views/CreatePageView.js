import ItemList from '../components/ItemList.vue'

import MainView from '../views/MainView.vue'
import MainPostView from '../views/MainPostView.vue'
import PostView from '../views/PostView.vue'
import EditView from '../views/EditView.vue'
import QuickEditView from '../views/QuickEditView.vue'
import PreviewEditView from '../views/PreviewEditView.vue'

// This is a factory function for dynamically creating root-level list views,
// since they share most of the logic except for the type of items to display.
// They are essentially higher order components wrapping ItemList.vue.
export function createListView (type) {
  let ToRenderComponent = null
  switch (type) {
    case 'main-post': {
      ToRenderComponent = MainPostView
      break
    }
  }
  return {
    name: `${type}`,
    // this will be called during SSR to pre-fetch data into the store!
    preFetch (store, context, router) {
      // console.log(context.user)
      return store.dispatch('FETCH_LIST_DATA', { type })
    },

    render (h) {
      return h(ItemList, { props: { type }})
    }
  }
}
