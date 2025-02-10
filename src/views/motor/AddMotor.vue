<template>
    <div class="max-w-4xl mx-auto mt-2 p-6 bg-white shadow-lg rounded-lg">
        <h1 class="text-2xl font-bold mb-4 text-center">Tambah Data Motor</h1>

        <form @submit.prevent="addData" enctype="multipart/form-data">
            <div class="grid grid-cols-2 gap-4">
                <!-- Nama -->
                <div>
                    <label class="block text-sm font-medium text-gray-700">Nama Motor</label>
                    <input v-model="name" type="text" required class="mt-1 p-2 w-full border rounded-md" placeholder="Masukan nama" />
                </div>

                <!-- Merk motor -->
                <div>
                    <label class="block text-sm font-medium text-gray-700">Merk Motor</label>
                    <input v-model="merk" type="text" required class="mt-1 p-2 w-full border rounded-md" placeholder="Masukan merk" />
                </div>

                <!-- Tahun Motor -->
                <div>
                    <label class="block text-sm font-medium text-gray-700">Tahun Motor</label>
                    <input v-model="year" type="number" required class="mt-1 p-2 w-full border rounded-md" placeholder="Masukan tahun" />
                </div>

                <!-- Plat Nomor -->
                <div>
                    <label class="block text-sm font-medium text-gray-700">Plat Nomor Motor</label>
                    <input v-model="plat_nomor" type="text" required class="mt-1 p-2 w-full border rounded-md" placeholder="Masukan plat nomor" />
                </div>

                <!-- Status -->
                <div>
                    <label class="block text-sm font-medium text-gray-700">Status Motor</label>
                    <select v-model="status" required class="mt-1 p-2 w-full border rounded-md">
                        <option value="tersedia">Tersedia</option>
                        <option value="dipinjam">Dipinjam</option>
                        <option value="tidak tersedia">Tidak Tersedia</option>
                    </select>
                </div>

                <!-- Image -->
                <div>
                    <label class="block text-sm font-medium text-gray-700">Image</label>
                    <input type="file" @change="onFileChange" accept="image/*" class="mt-1 p-2 w-full border rounded-md" />
                </div>
            </div>

            <!-- Button -->
            <div class="flex justify-between mt-6">
                <router-link to="/motor" class="px-4 py-2 bg-gray-500 text-white rounded-md text-sm">Kembali</router-link>
                <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm">Simpan</button>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            name: "",
            merk: "",
            year: "",
            plat_nomor: "",
            status: "",
            selectedImage: null
        };
    },

    methods: {
        onFileChange(e) {
            this.selectedImage = e.target.files[0];
        },

        async addData() {
            const formData = new FormData();
            formData.append("name", this.name);
            formData.append("merk", this.merk);
            formData.append("year", this.year);
            formData.append("plat_nomor", this.plat_nomor);
            formData.append("status", this.status);

            if (this.selectedImage) {
                formData.append("image", this.selectedImage);
            }

            try {
                await axios.post("http://localhost:5001/api/motor", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                this.$router.push("/motor");
            } catch (error) {
                console.error("Error adding data:", error);
            }
        }
    }
}
</script>
