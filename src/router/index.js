import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/Music-list',
    component: () => import( '@/views/Music-list.vue')
  },
  {
    path: '/music-list',
    name: 'music-list',
    component: () => import( '@/views/Music-list.vue')
  },
  {
    path: '/music-top',
    name: 'music-top',
    component: () => import( '@/views/Music-top.vue')
  },
  {
    path: '/music-search',
    name: 'music-search',
    component: () => import( '@/views/Music-search.vue')
  },
  {
    path: '/song',
    name: 'song',
    component: () => import( '@/views/Song.vue')
  },
  {
    path: '/playlist',
    name: 'playlist',
    component: () => import( '@/views/Playlist.vue')
  },
  {
    path: '/notfound',
    name: 'notfound',
    component: () => import('@/views/Notfound')
  },
  {
    path:'*',
    redirect:{
      name:'notfound'
    }
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
