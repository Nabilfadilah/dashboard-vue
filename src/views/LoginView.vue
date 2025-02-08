<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
            <h2 class="text-2xl font-bold mb-6 text-center">Admin Login</h2>
            <form @submit.prevent="login">
                <div class="mb-4">
                    <label class="block text-gray-700 mb-2">Email</label>
                    <input v-model="email" type="email" placeholder="Enter your email"
                        class="w-full px-3 py-2 border rounded-md focus:outline-none" required />
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 mb-2">Password</label>
                    <input v-model="password" type="password" placeholder="Enter your password"
                        class="w-full px-3 py-2 border rounded-md focus:outline-none" required />
                </div>
                <button type="submit"
                    class="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                    Login
                </button>
            </form>
            <div v-if="errorMessage" class="mt-4 text-red-500 text-center">
                {{ errorMessage }}
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: ""
    }
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("http://localhost:5001/api/auth/login", {
          email: this.email,
          password: this.password
        });
        localStorage.setItem("token", response.data.token);
        this.$router.push("/"); // Arahkan ke root, yang kemudian redirect ke /about
      } catch (error) {
        this.errorMessage = error.response?.data?.message || "Login gagal";
      }
    }
  }
}
</script>

<style></style>