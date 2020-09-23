import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      children: [
        {
          name: 'Who Am I?',
          path: '',
          component: () => import('@/views/dashboard/pages/UserProfile'),
        },
        {
          name: 'Past Projects',
          path: 'past-projects',
          component: () => import('@/views/dashboard/pages/PastProjects'),
        },
        {
          name: 'Contact',
          path: 'contact',
          component: () => import('@/views/dashboard/pages/Contact'),
        },
        {
          name: 'COVID-19 Statistics Project',
          path: 'covid-project',
          component: () => import('@/views/dashboard/pages/Covid19Tracker'),
        },
        {
         name: 'Translink Bus Locator Project',
         path: 'translink-project',
         component: () => import('@/views/dashboard/pages/TranslinkBusLocator'),
       },
      ],
    },
  ],
})
