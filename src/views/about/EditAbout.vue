<template>
  <div class="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
    <h1 class="text-2xl font-bold mb-4">Edit Data About</h1>

    <form @submit.prevent="updateData">
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
          Simpan Perubahan
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
        id: null,
        name: "",
        email: "",
        address: "",
        phone: "",
        };
    },

    async created() {
        const aboutId = this.$route.params.id;
        try {
            const response = await axios.get(`http://localhost:5001/api/about/${aboutId}`);
            const data = response.data;
            this.id = data.id;
            this.name = data.name;
            this.email = data.email;
            this.address = data.address;
            this.phone = data.phone;
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    },

    methods: {
        async updateData() {
            try {
                await axios.put(`http://localhost:5001/api/about/${this.id}`, {
                name: this.name,
                email: this.email,
                address: this.address,
                phone: this.phone,
                });
                this.$router.push("/about"); // Redirect ke halaman About setelah sukses
            } catch (error) {
                console.error("Error updating data:", error);
            }
        },      
    }

};
</script>

<style>
</style>