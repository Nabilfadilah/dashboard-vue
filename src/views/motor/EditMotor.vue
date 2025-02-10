<template>
    <div class="max-w-4xl mx-auto mt-2 p-6 bg-white shadow-lg rounded-lg">
        <h1 class="text-2xl font-bold mb-4 text-center">Edit Data Motor</h1>
    
        <form @submit.prevent="updateData" enctype="multipart/form-data">
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
                <!-- Tampilkan preview gambar jika ada -->
                <div class="mb-4" v-if="currentImage">
                    <label class="block text-sm font-medium text-gray-700">Current Image</label>
                    <img :src="`http://localhost:5001/uploads/motor/${currentImage}`" alt="Current Image"
                        class="w-32 h-32 object-cover" />
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700">Ubah Image (opsional)</label>
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
        }
    },

    async created() {
        const motorId = this.$route.params.id;
        try {
            const response = await axios.get(`http://localhost:5001/api/motor/${motorId}`);
            const data = response.data;
            this.id = data.id;
            this.name = data.name;
            this.merk = data.merk;
            this.year = data.year;
            this.plat_nomor = data.plat_nomor;
            this.status = data.status;
            this.currentImage = data.image; // Asumsikan kolom image menyimpan nama file
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    },

    methods: {
        onFileChange(e) {
            const file = e.target.files[0];
            this.selectedImage = file;
        },

        async updateData() {
            const formData = new FormData();
            
            formData.append("name", this.name);
            formData.append("merk", this.merk);
            formData.append("year", this.year);
            formData.append("plat_nomor", this.plat_nomor);
            formData.append("status", this.status);
            
            // Jika ada file baru, masukkan ke formData
            if (this.selectedImage) {
                formData.append("image", this.selectedImage);
            }

            try {
                await axios.put(`http://localhost:5001/api/motor/${this.id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                this.$router.push("/motor"); // Redirect ke halaman motor setelah sukses
            } catch (error) {
                console.error("Error updating data:", error);
            }
        }
    }

}
</script>

<style></style>