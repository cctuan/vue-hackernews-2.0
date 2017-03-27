
import Vue from 'vue'
import VueRouter from 'vue-router'
import directives from './../client/plugins/directives'
import * as filters from './../client/filters'

import "material-design-lite/material.min.css"
Vue.use(VueRouter)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

directives.install(Vue)
Vue.component('router-link', {
  template : `<a><slot></slot></a>`
})
const load = requireContext => {
  return requireContext.keys().map(requireContext)
}

load(require.context('./', true, /.play.js$/))
