<template>
    <div class="max-w-4xl mx-auto mt-2 p-6 bg-white shadow-lg rounded-lg">
        <h1 class="text-2xl font-bold mb-4 text-center">Tambah Data Peminjaman</h1>

        <form @submit.prevent="addData" enctype="multipart/form-data">
            <div class="grid grid-cols-2 gap-4">
                <!-- Nama -->
                <div>
                    <label class="block text-sm font-medium text-gray-700">Nama</label>
                    <input v-model="name" type="text" required class="mt-1 p-2 w-full border rounded-md" placeholder="Masukan nama" />
                </div>

                <!-- Email -->
                <div>
                    <label class="block text-sm font-medium text-gray-700">Email</label>
                    <input v-model="email" type="email" required class="mt-1 p-2 w-full border rounded-md" placeholder="Masukan email" />
                </div>

                <!-- Alamat (Lebar penuh) -->
                <div class="col-span-2">
                    <label class="block text-sm font-medium text-gray-700">Alamat</label>
                    <textarea v-model="address" required class="mt-1 p-2 w-full border rounded-md" placeholder="Masukan alamat"></textarea>
                </div>

                <!-- No Telepon -->
                <div>
                    <label class="block text-sm font-medium text-gray-700">No Telepon</label>
                    <input v-model="phone" type="tel" required pattern="[0-9]+"
                        class="mt-1 p-2 w-full border rounded-md" placeholder="Masukkan hanya angka" />
                </div>

                <!-- Tipe Motor -->
                <div>
                    <label class="block text-sm font-medium text-gray-700">Tipe Motor</label>
                    <input v-model="type_motor" type="text" required class="mt-1 p-2 w-full border rounded-md" placeholder="Masukan tipe motor" />
                </div>

                <!-- Tanggal Peminjaman -->
                <div>
                    <label class="block text-sm font-medium text-gray-700">Tanggal Peminjaman</label>
                    <input v-model="loan_date" type="date" required class="mt-1 p-2 w-full border rounded-md" />
                </div>

                <!-- Tanggal Akhir Peminjaman -->
                <div>
                    <label class="block text-sm font-medium text-gray-700">Tanggal Akhir Peminjaman</label>
                    <input v-model="loan_end_date" type="date" required class="mt-1 p-2 w-full border rounded-md" />
                </div>

                <!-- Total Pembayaran (Format Rupiah) -->
                <div>
                    <label class="block text-sm font-medium text-gray-700">Total Bayar</label>
                    <input v-model="total_paid" type="text" required
                        class="mt-1 p-2 w-full border rounded-md" placeholder="Rp." />
                </div>

                <!-- Image -->
                <div>
                    <label class="block text-sm font-medium text-gray-700">Image</label>
                    <input type="file" @change="onFileChange"  accept="image/*" class="mt-1 p-2 w-full border rounded-md" />
                </div>
            </div>

            <!-- Button -->
            <div class="flex justify-between mt-6">
                <router-link to="/loan" class="px-4 py-2 bg-gray-500 text-white rounded-md text-sm">Kembali</router-link>
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
            email: "",
            address: "",
            phone: "",
            type_motor: "",
            loan_date: new Date().toISOString(),
            loan_end_date: new Date().toISOString(),
            total_paid: 0,
            selectedImage: null
        }
    },

    methods: {
        onFileChange(e) {
            const file = e.target.files[0];
            this.selectedImage = file;
        },

        async addData() {
            const formData = new FormData();
            formData.append("name", this.name);
            formData.append("email", this.email);
            formData.append("address", this.address);
            formData.append("phone", this.phone);
            formData.append("type_motor", this.type_motor);
            formData.append("loan_date", this.loan_date);
            formData.append("loan_end_date", this.loan_end_date);
            formData.append("total_paid", this.total_paid);
            if (this.selectedImage) {
                formData.append("image", this.selectedImage);
            }

            try {
                await axios.post("http://localhost:5001/api/loan", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                this.$router.push("/loan"); // Redirect ke halaman loan setelah sukses
            } catch (error) {
                console.error("Error adding data:", error);
            }
        }
    }
}

</script>

<style></style>