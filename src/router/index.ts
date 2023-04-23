import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        default: () => import('../views/HomeView.vue')
      },
      meta: {
        hideLogoText: true
      }
    },
    {
      path: '/chat',
      name: 'Chat',
      components: {
        sider: () => import('../views/sider/MessageList.vue'),
        default: () => import('../views/main/ChatView.vue')
      }
    },
    {
      path: '/tools',
      name: 'Tools',
      component: () => import('@/views/main/ToolsView.vue')
    },
    // {
    //   path: '/draw',
    //   name: 'Draw',
    //   component: () => import('@/views/main/DrawView.vue')
    // },
    {
      path: '/tutorial',
      name: 'Tutorial',
      component: () => import('@/views/main/TutorialView.vue')
    },
    // {
    //   path: '/settings',
    //   name: 'Settings',
    //   component: () => import('@/views/main/SettingsView.vue')
    // },
    {
      path: '/about',
      name: 'About',
      component: () => import('@/views/main/AboutView.vue')
    }
  ]
})

export default router
