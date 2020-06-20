import Vue from 'vue'
import VueRouter from 'vue-router'
import Rank from 'components/rank/rank'
import Recommend from 'components/recommend/recommend'
import Search from 'components/search/search'
import Singer from 'components/singer/singer'
import SingerDetail from 'components/singer-detail/singer-detail'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    component: Recommend
  },
  {
    path: '/singer',
    component: Singer,
    children: [
      {
        path: ':id/',
        component: SingerDetail
      }
    ]
  },
  {
    path: '/rank',
    component: Rank
  },
  {
    path: '/search',
    component: Search
  }
]

const router = new VueRouter({
  routes
})

export default router
