import Vue from 'vue'
import Router from 'vue-router'
import store from './store/store'

import auth from './routes/auth'
import user from './routes/user'
import company from './routes/company'
import branch from './routes/branch'
import group from './routes/group'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    auth,
    {
      path: '/',
      component: () => import('./views/Entry.vue'),
      children: [
        { path: '', name: 'home', component: () => import('./views/Home.vue') },
        company,
        group,
        user,
        branch,
        {
          path: '*',
          name: '404',
          component: () => import('./views/404.vue')
        }
      ],
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  store.getters.error.reset()
  if (to.matched.some(record => record.meta.requiresAuth)) {
    !store.getters['auth/loggedIn'] ? next({ name: 'login' }) : next()
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    store.getters['auth/loggedIn'] ? next({ name: 'home' }) : next()
  } else {
    next()
  }
})

export default router
