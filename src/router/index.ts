import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/subscriptions',
      name: 'list',
      component: () => import('@/views/SubscriptionList.vue')
    },
    {
      path: '/subscriptions/:uuid',
      name: 'edit',
      component: () => import('@/views/SubscriptionEdit.vue'),
      props: true
    },
    {
      path: '/subscriptions/new',
      name: 'new',
      component: () => import('@/views/SubscriptionCreate.vue')
    },
    {
      path: '/',
      redirect: '/subscriptions'
    }
  ]
})

export default router
