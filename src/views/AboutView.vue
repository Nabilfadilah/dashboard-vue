<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">About Page</h1>

    <!-- Header Atas: Add, Search, dan Filter -->
    <div class="flex justify-between items-center mb-4">
      <!-- <button class="px-4 py-2 bg-blue-600 text-white rounded-md">Add</button> -->
      <router-link to="/about/add" class="px-4 py-2 bg-green-600 text-white rounded-md">+ Tambah Data</router-link>

      <div class="flex space-x-2">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search..."
          class="px-3 py-2 border rounded-md"
        />
        <select v-model="filterOption" class="px-3 py-2 border rounded-md">
          <option value="">All</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
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
            <th class="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in filteredUsers" :key="user.id">
            <td class="border p-2">{{ index + 1 }}.</td>
            <td class="border p-2">{{ user.name }}</td>
            <td class="border p-2">{{ user.email }}</td>
            <td class="border p-2">{{ user.address }}</td>
            <td class="border p-2">{{ user.phone }}</td>
            <td class="border p-2">
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
    };
  },
  computed: {
    filteredUsers() {
      return this.users.filter((user) =>
        user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get("http://localhost:5001/api/about");
        this.users = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    async deleteUser(id) {
      await axios.delete(`http://localhost:5001/api/about/${id}`);
      this.fetchUsers();
    },
    async addData() {
      await axios.post("http://localhost:5001/api/about", {
        name: "New User",
        email: "newuser@example.com",
        address: "Somewhere",
        phone: "08123456789",
      });
      this.fetchUsers();
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
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


<!-- <script>
export default {
  data() {
    return {
      searchQuery: "",
      filterOption: "",
      itemsPerPage: 5,
      currentPage: 1,
      users: [
        { id: 1, name: "Alice", email: "alice@example.com", address: "Jakarta", phone: "08123456789" },
        { id: 2, name: "Bob", email: "bob@example.com", address: "Bandung", phone: "08129876543" },
        { id: 3, name: "Charlie", email: "charlie@example.com", address: "Surabaya", phone: "08234567890" },
        { id: 4, name: "David", email: "david@example.com", address: "Yogyakarta", phone: "08567890123" },
        { id: 5, name: "Emma", email: "emma@example.com", address: "Bali", phone: "08123456789" },
        { id: 6, name: "Frank", email: "frank@example.com", address: "Medan", phone: "08223456789" },
        { id: 7, name: "Grace", email: "grace@example.com", address: "Makassar", phone: "08111222333" },
      ],
    };
  },
  computed: {
    filteredUsers() {
      let filtered = this.users;

      // Filter berdasarkan search query
      if (this.searchQuery) {
        filtered = filtered.filter((user) =>
          user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      // Filter berdasarkan dropdown (misal: user atau admin, disesuaikan dengan data)
      if (this.filterOption) {
        filtered = filtered.filter((user) => user.role === this.filterOption);
      }

      return filtered;
    },
    paginatedData() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredUsers.slice(start, start + this.itemsPerPage);
    },
    totalPages() {
      return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    },
  },
  methods: {
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
};
</script> -->
