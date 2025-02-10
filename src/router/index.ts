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
import MotorView from '@/views/motor/MotorView.vue'
import AddMotor from '@/views/motor/AddMotor.vue'
import EditMotor from '@/views/motor/EditMotor.vue'
import PengaturanView from '@/views/pengaturan/PengaturanView.vue'
import AddPengaturan from '@/views/pengaturan/AddPengaturan.vue'
import EditPengaturan from '@/views/pengaturan/EditPengaturan.vue'

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
      // profile
      { path: '', redirect: '/loan' }, // Redirect default ke /about
      {
        path: 'profile',
        name: 'profile',
        component: ProfileView,
      },

      // about
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

      // peminjaman
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

      // motor
      {
        path: 'motor',
        name: 'motor',
        component: MotorView,
      },
      {
        path: 'motor/add',
        name: 'add-motor',
        component: AddMotor,
      },
      {
        path: 'motor/:id/edit',
        name: 'edit-motor',
        component: EditMotor,
      },

      // setting
      {
        path: 'setting',
        name: 'setting',
        component: PengaturanView,
      },
      {
        path: 'setting/add',
        name: 'add-setting',
        component: AddPengaturan,
      },
      {
        path: 'setting/:id/edit',
        name: 'edit-setting',
        component: EditPengaturan,
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