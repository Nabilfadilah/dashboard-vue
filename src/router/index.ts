import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '@/views/ProfileView.vue'
import AboutView from '@/views/AboutView.vue'
import AddAbout from '@/views/AddAbout.vue'
import EditAbout from '@/views/EditAbout.vue'
import PeminjamanView from '@/views/peminjaman/PeminjamanView.vue'
import AddPeminjaman from '@/views/peminjaman/AddPeminjaman.vue'
import EditPeminjaman from '@/views/peminjaman/EditPeminjaman.vue'

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
        {
          path: '/loan',
          name: 'loan',
          component: PeminjamanView,
        },
        {
          path: '/loan/add',
          name: 'add-loan',
          component: AddPeminjaman
        },
        {
          path: '/loan/:id/edit',
          name: 'edit-loan',
          component: EditPeminjaman
        },
      ]
    },
  ],
})

export default router
