import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '@/views/profile/ProfileView.vue'
import AboutView from '@/views/about/AboutView.vue'
import AddAbout from '@/views/about/AddAbout.vue'
import EditAbout from '@/views/about/EditAbout.vue'
import PeminjamanView from '@/views/peminjaman/PeminjamanView.vue'
import AddPeminjaman from '@/views/peminjaman/AddPeminjaman.vue'
import EditPeminjaman from '@/views/peminjaman/EditPeminjaman.vue'
import LoginView from '@/views/LoginView.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/',
    component: HomeView,
    meta: { requiresAuth: true }, // Semua child route di sini memerlukan otentikasi
    children: [
      { path: '', redirect: '/about' }, // Redirect default ke /about
      {
        path: 'profile',
        name: 'profile',
        component: ProfileView,
      },
      {
        path: 'about',
        name: 'about',
        component: AboutView,
      },
      {
        path: 'about/add',
        name: 'add-about',
        component: AddAbout,
      },
      {
        path: 'about/:id/edit',
        name: 'edit-about',
        component: EditAbout,
      },
      {
        path: 'loan',
        name: 'loan',
        component: PeminjamanView,
      },
      {
        path: 'loan/add',
        name: 'add-loan',
        component: AddPeminjaman,
      },
      {
        path: 'loan/:id/edit',
        name: 'edit-loan',
        component: EditPeminjaman,
      },
    ]
  },
  // (Opsional) Route Not Found
  {
    path: '/:catchAll(.*)',
    redirect: '/login'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Navigation guard untuk mengecek otentikasi
router.beforeEach((to, from, next) => {
  // Jika route memerlukan otentikasi (requiresAuth) dan token tidak ada, redirect ke login
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('token')
    if (!token) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router