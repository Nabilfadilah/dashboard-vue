<template>
  <div class="w-screen h-screen flex">
    <!-- Sidebar -->
    <div
      :class="[
        'h-full bg-gray-800 text-white transition-all duration-300 fixed md:relative z-50 w-16',
      ]"
    >
      <!-- Logo dan Title -->
      <div class="h-16 bg-gray-900 flex items-center justify-center">
        <h3 class="font-bold text-lg">A</h3> <!-- Bisa ganti jadi ikon -->
      </div>

      <!-- Menu -->
      <nav class="py-4 px-2">
        <ul class="space-y-2">
          <li v-for="item in menuItems" :key="item.name" class="group relative">
            <router-link
              :to="item.path"
              class="flex items-center justify-center p-3 rounded-md hover:bg-gray-700 transition"
              active-class="bg-gray-900 text-white font-bold"
            >
              <font-awesome-icon :icon="item.icon" class="w-4 h-4" />
            </router-link>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col md:ml-0" :class="{ 'ml-64': sidebarOpen }">
      <!-- Header -->
      <header class="h-16 bg-gray-900 text-white flex items-center px-4 shadow-md fixed w-full md:w-auto md:relative z-40">
        <!-- Hamburger Menu -->
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
          <button @click="toggleDropdown" class="focus:outline-none flex items-center space-x-2">
            <font-awesome-icon icon="user-circle" class="w-6 h-6" />
            <span v-if="dropdownOpen">▼</span>
          </button>

          <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-md">
            <router-link to="/profile" class="block px-4 py-2 hover:bg-gray-200">Profile</router-link>
            <button @click="logout" class="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
              Logout
            </button>
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
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faBars, faUserCircle, faCog, faHome, faInfoCircle, faUser, faEnvelope);

export default {
  name: "HomeView",
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      sidebarOpen: window.innerWidth >= 768, // Buka sidebar di layar besar
      dropdownOpen: false,
      menuItems: [
        { name: "", path: "/about", icon: "info-circle" },
        { name: "", path: "/profile", icon: "user" },
        { name: "", path: "/loan", icon: "envelope" },
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
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
    handleResize() {
      this.sidebarOpen = window.innerWidth >= 768;
    },
  },
};
</script>


<style>
/* Animasi Sidebar */
</style>
