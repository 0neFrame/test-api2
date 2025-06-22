import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../layout/DefaultLayout.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('../views/HomeView.vue'),
          meta: { title: 'Главная страница' },
        },
      ],
    },
    {
      path: '/auth',
      name: 'Auth',
      component: () => import('../views/AuthView.vue'),
      meta: { title: 'Авторизация' },
    },
    { path: '/:pathMatch(.*)*', component: () => import('../views/NotFoundView.vue') },
  ],
})

router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('token') && to.name !== 'Auth') {
    next({ name: 'Auth' })
    return
  }

  document.title = to.meta?.title ?? 'Ой-ой...'

  next()
})

export default router
