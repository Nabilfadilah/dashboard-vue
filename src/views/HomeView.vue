<template>
  <div class="w-screen h-screen flex">
    <!-- Sidebar -->
    <div
      :class="[
        'h-full bg-gray-800 text-white transition-all duration-300',
        sidebarOpen ? 'w-64 fixed md:relative' : 'w-16 md:relative',
        sidebarOpen ? 'left-0' : '-left-64 md:left-0',
      ]"
    >
      <!-- Logo dan Title -->
      <div class="h-16 bg-gray-900 flex items-center px-4">
        <h3 v-if="sidebarOpen" class="font-bold text-lg">Admin Dashboard</h3>
      </div>

      <!-- Menu -->
      <nav class="py-4 px-4">
        <ul class="space-y-4">
          <li v-for="item in menuItems" :key="item.name">
            <router-link
              :to="item.path"
              class="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700 transition"
            >
              <font-awesome-icon :icon="item.icon" class="w-5 h-5" />
              <span v-if="sidebarOpen" class="uppercase">{{ item.name }}</span>
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- Settings -->
      <div class="absolute bottom-4 left-4">
        <router-link
          to="/settings"
          class="flex items-center space-x-3 p-2 hover:bg-gray-700 transition"
        >
          <font-awesome-icon icon="cog" class="w-5 h-5" />
          <span v-if="sidebarOpen">Settings</span>
        </router-link>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header
        class="h-16 bg-gray-900 text-white flex items-center px-4 shadow-md"
      >
        <!-- Hamburger Menu -->
        <!-- Pastikan tombol bisa berfungsi di layar kecil -->
        <button
          @click="toggleSidebar"
          class="text-white focus:outline-none md:hidden"
        >
          <font-awesome-icon :icon="['fas', 'bars']" class="w-6 h-6" />
        </button>

        <!-- Search Bar -->
        <div class="ml-4 flex-1">
          <input
            type="text"
            placeholder="Search..."
            class="w-full max-w-xs px-3 py-1 rounded-md bg-gray-700 text-white outline-none"
          />
        </div>

        <!-- User Dropdown -->
        <div class="relative">
          <button
            @click="toggleDropdown"
            class="focus:outline-none flex items-center space-x-2"
          >
            <font-awesome-icon icon="user-circle" class="w-6 h-6" />
            <span v-if="dropdownOpen">▼</span>
          </button>

          <div
            v-if="dropdownOpen"
            class="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-md"
          >
            <router-link to="/profile" class="block px-4 py-2 hover:bg-gray-200"
              >Profile</router-link
            >
            <router-link to="/logout" class="block px-4 py-2 hover:bg-gray-200"
              >Logout</router-link
            >
          </div>
        </div>
      </header>

      <!-- Content -->
      <main class="flex-1 bg-gray-100">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faUserCircle,
  faCog,
  faHome,
  faInfoCircle,
  faUser,
  faEnvelope,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Tambahkan ikon ke library
library.add(
  faBars,
  faUserCircle,
  faCog,
  faHome,
  faInfoCircle,
  faUser,
  faEnvelope,
  faDownload
);

export default {
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      sidebarOpen: true,
      dropdownOpen: false,
      menuItems: [
        { name: "Home", path: "/", icon: "home" },
        { name: "About", path: "/about", icon: "info-circle" },
        { name: "Profile", path: "/profile", icon: "user" },
        { name: "Peminjaman", path: "/loan", icon: "envelope" },
        { name: "Download", path: "/download", icon: "download" },
      ],
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
  },
};
</script>

<style>
/* Animasi Sidebar */
</style>
