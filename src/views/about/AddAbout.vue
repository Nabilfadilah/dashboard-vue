<template>
  <div class="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
    <h1 class="text-2xl font-bold mb-4">Tambah Data About</h1>

    <form @submit.prevent="addData">
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Nama</label>
        <input
          v-model="name"
          type="text"
          required
          class="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input
          v-model="email"
          type="email"
          required
          class="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Alamat</label>
        <textarea
          v-model="address"
          required
          class="mt-1 p-2 w-full border rounded-md"
        ></textarea>
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700"
          >No Telepon</label
        >
        <input
          v-model="phone"
          type="text"
          required
          class="mt-1 p-2 w-full border rounded-md"
        />
      </div>

      <div class="flex justify-between">
        <router-link
          to="/about"
          class="px-4 py-2 bg-gray-500 text-white rounded-md"
          >Kembali</router-link
        >
        <button
          type="submit"
          class="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Simpan
        </button>
      </div>
    </form>
  </div>
</template>
  
  <script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      email: "",
      address: "",
      phone: "",
    };
  },
  methods: {
    async addData() {
      try {
        await axios.post("http://localhost:5001/api/about", {
          name: this.name,
          email: this.email,
          address: this.address,
          phone: this.phone,
        });
        this.$router.push("/about"); // Redirect ke halaman About setelah sukses
      } catch (error) {
        console.error("Error adding data:", error);
      }
    },
  },
};
</script>
  