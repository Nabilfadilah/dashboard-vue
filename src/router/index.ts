import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '@/views/ProfileView.vue'
import AboutView from '@/views/AboutView.vue'
import AddAbout from '@/views/AddAbout.vue'
import EditAbout from '@/views/EditAbout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '/profile',
          name: 'profile',
          component: ProfileView,
        },
        {
          path: '/about',
          name: 'about',
          component: AboutView
        },
        {
          path: '/about/add',
          name: 'add-about',
          component: AddAbout
        },
        {
          path: '/about/:id/edit',
          name: 'edit-about',
          component: EditAbout
        },
      ]
    },
  ],
})

export default router
