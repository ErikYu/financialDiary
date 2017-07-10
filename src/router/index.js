import Vue from 'vue'
import Router from 'vue-router'

import create from '@/components/create/create'
import diary from '@/components/diary/diary'
import chart from '@/components/chart/chart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: diary
    },
    {
      path: '/diary',
      name: 'diaryRoute',
      component: diary
    },
    {
      path: '/create',
      name: 'createRoute',
      component: create
    },
    {
      path: '/chart',
      name: 'chartRoute',
      component: chart
    }
  ]
})
