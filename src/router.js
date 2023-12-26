import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
/**
 * meta 参数说明
 *
 * hideBottomFooter 是否有底部导航，默认false(显示)
 *
 */
const routes = [{
    path: '/',
    redirect: {
      name: 'home'
    }
  },
  {
    name: 'home',
    component: () => import('./view/Home'),
  },
  // {
  //   name: 'info',
  //   component: () => import('./view/info'),
  // },
  // {
  //   name: 'rule',
  //   component: () => import('./view/rule'),
  // },
  // {
  //   name: 'desc',
  //   component: () => import('./view/desc'),
  // },
  // {
  //   path: '*',
  //   component: (resolve) => require(['./views/error404.vue'], resolve)
  // }
];
// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '')
})

const router = new Router({
  mode: 'history',
  base: '/ringfront/',
  routes
})

export {
  router
}