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
        // Dashboard
        {
          name: 'Home',
          path: '',
          component: () => import('@/views/dashboard/Dashboard'),
        },
        // Pages
        {
          name: 'Who Am I?',
          path: 'profile',
          component: () => import('@/views/dashboard/pages/UserProfile'),
        },
        {
          name: 'Past Projects',
          path: 'past-projects',
          component: () => import('@/views/dashboard/component/PastProjects'),
        },
        {
          name: 'Contact',
          path: 'contact',
          component: () => import('@/views/dashboard/component/Contact'),
        },
        {
          name: 'COVID-19 Statistics',
          path: 'covid-project',
          component: () => import('@/views/dashboard/tables/RegularTables'),
        },
        {
         name: 'Translink Bus Locator Project',
         path: 'translink-project',
         component: () => import('@/views/dashboard/component/Notifications'),
       },
      ],
    },
  ],
})
