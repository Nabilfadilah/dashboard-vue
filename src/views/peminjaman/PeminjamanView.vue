<template>
    <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Peminjaman Page</h1>

    <!-- Header Atas: Add, Search, dan Filter -->
    <div class="flex justify-between items-center mb-4">
      <router-link to="/loan/add" class="px-4 py-2 bg-green-600 text-white rounded-md text-sm">+ Tambah Data</router-link>

      <div class="flex space-x-2">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search..."
          class="px-3 py-2 border rounded-md"
        />
        
      </div>
    </div>

    <!-- Table List -->
    <div class="overflow-x-auto bg-white shadow-md rounded-lg">
      <table class="w-full border-collapse border">
        <thead class="bg-gray-200">
          <tr>
            <th class="border p-2">No</th>
            <th class="border p-2">Nama</th>
            <th class="border p-2">Email</th>
            <th class="border p-2">Alamat</th>
            <th class="border p-2">No Telepon</th>
            <th class="border p-2">Tipe Motor</th>
            <th class="border p-2">Tanggal Awal</th>
            <th class="border p-2">Tanggal Akhir</th>
            <th class="border p-2">Total Bayar</th>
            <th class="border p-2">Image</th>
            <th class="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in paginatedData" :key="user.id">
            <td class="border p-2">{{ (currentPage - 1) * itemsPerPage + index + 1 }}.</td>
            <td class="border p-2">{{ user.name }}</td>
            <td class="border p-2">{{ user.email }}</td>
            <td class="border p-2">{{ user.address }}</td>
            <td class="border p-2">{{ user.phone }}</td>
            <td class="border p-2">{{ user.type_motor }}</td>
            <td class="border p-2">{{ formatDate(user.loan_date) }}</td>
            <td class="border p-2">{{ formatDate(user.loan_end_date) }}</td>
            <td class="border p-2">{{ formatRupiah(user.total_paid) }}</td>
            
            <td class="border p-2">
              <img
                v-if="user.image"
                :src="`http://localhost:5001/uploads/${user.image}`"
                alt="Image"
                class="w-12 h-12 object-cover"
              />
              <span v-else>No Image</span>
            </td>

            <td class="border p-2 flex gap-2">
              <router-link :to="`/loan/${user.id}/edit`" class="px-3 py-1 bg-yellow-500 text-white rounded-md">Edit</router-link>
              <button @click="deleteUser(user.id)" class="px-3 py-1 bg-red-600 text-white rounded-md">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination dan Filter Per Page -->
    <div class="flex justify-between items-center mt-4">
      <select v-model="itemsPerPage" class="px-3 py-2 border rounded-md">
        <option value="5">5 per page</option>
        <option value="10">10 per page</option>
        <option value="20">20 per page</option>
      </select>

      <div class="flex space-x-2">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-3 py-1 bg-gray-600 text-white rounded-md disabled:opacity-50"
        >
          Prev
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 bg-gray-600 text-white rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
        users: [],
        searchQuery: "",
        filterOption: "", 
        itemsPerPage: 5,
        currentPage: 1, 
        };
    },

    props: {
        user: Object
    },

    computed: {
        filteredUsers() {
        let filtered = this.users;

        // filter berdasarkan search query
        if (this.searchQuery) {
            filtered = filtered.filter((user) =>
            user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }

        // filter berdasarkan dropdown (Admin/User)
        if (this.filterOption) {
            filtered = filtered.filter((user) => user.role === this.filterOption);
        }

        return filtered;
        },

        // pagination table
        paginatedData() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
            return this.filteredUsers.slice(start, start + this.itemsPerPage);
        },

        // menampilkan total data
        totalPages() {
            return Math.ceil(this.filteredUsers.length / Number(this.itemsPerPage));
        },
    },

    methods: {
        async fetchUsers() {
            try {
                const response = await axios.get("http://localhost:5001/api/loan");
                this.users = response.data;
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        },

        async deleteUser(id) {
            if (!confirm("Yakin ingin menghapus?")) return;
            try {
                await axios.delete(`http://localhost:5001/api/loan/${id}`);
                this.fetchUsers();
            } catch (error) {
                console.error("Error deleting user:", error);
                alert("Gagal menghapus data.");
            }
        },

        formatDate(dateString) {
            if (!dateString) return "-"; // Jika tanggal kosong
            const options = { day: "2-digit", month: "2-digit", year: "numeric" };
            return new Date(dateString).toLocaleDateString("id-ID", options);
        },

        formatRupiah(angka) {
            if (angka == null) return "Rp 0"; // Jika angka kosong/null
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR"
            }).format(angka);
        },

        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },

        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        
    },

    mounted() {
        this.fetchUsers();
    },
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}
</style>