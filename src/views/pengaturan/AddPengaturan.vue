<template>
    <div class="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h1 class="text-2xl font-bold mb-4">Tambah Data Pengaturan</h1>

        <form @submit.prevent="addData">
            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">Nama</label>
                <input v-model="name" type="text" required class="mt-1 p-2 w-full border rounded-md" />
            </div>

            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">Durasi Peminjaman</label>
                <input v-model="max_borrow_duration" type="number" required class="mt-1 p-2 w-full border rounded-md" />
            </div>

            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">Biaya Denda Harian</label>
                <input v-model="daily_fine_fee" type="number" step="0.01" required
                    class="mt-1 p-2 w-full border rounded-md" />
            </div>

            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">Kontak Admin</label>
                <input v-model="contact_admin" type="text" required class="mt-1 p-2 w-full border rounded-md" />
            </div>

            <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700">Alamat Rental</label>
                <input v-model="address_rental" type="text" required class="mt-1 p-2 w-full border rounded-md" />
            </div>

            <div class="flex justify-between">
                <router-link to="/about" class="px-4 py-2 bg-gray-500 text-white rounded-md">Kembali</router-link>
                <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md">
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
            max_borrow_duration: "",
            daily_fine_fee: "",
            contact_admin: "",
            address_rental: "",
        };
    },
    methods: {
        async addData() {
            try {
                const payload = {
                    name: this.name,
                    max_borrow_duration: Number(this.max_borrow_duration), // Pastikan angka
                    daily_fine_fee: parseFloat(this.daily_fine_fee), // Pastikan angka
                    contact_admin: this.contact_admin,
                    address_rental: this.address_rental,
                };

                console.log("Data yang dikirim:", payload); // Tambahkan log ini

                await axios.post("http://localhost:5001/api/setting", payload);
                this.$router.push("/setting");
            } catch (error) {
                console.error("Error adding data:", error);
            }
        }

    },
};
</script>