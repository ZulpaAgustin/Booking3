<template>
  <div class="container-fluid">
    <section>
      <Panel />
    </section>
    <div class="main-content">
      <h1 class="text text-center">Daftar Peminjam</h1>
      <div class="search-container">
      <form @submit.prevent="fetchBookings">
        <i class="fa fa-search search-icon"></i>
        <input type="text" id="searchInput" placeholder="Cari Nama..." v-model="keyword">
      </form>
    </div>
      <table class="table mt-3 mt-4">
            <thead class="table-dark">
              <tr>
                <td>No</td>
                <td>Pemesan</td>
                <td>Tanggal</td>
                <td>Acara</td>
                <td>Jam Mulai</td>
                <td>Jam Selesai</td>
                <td>Bayar</td>
                <td>Status</td>
                <td>Terima</td>
                <td>Tolak</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(booking, i) in bookings" :key="i">
                <td>{{ i + 1 }}</td>
                <td>{{ booking.namaPeminjam }}</td>
                <td>{{ booking.tanggal }}</td>
                <td>{{ booking.acara }}</td>
                <td>{{ booking.jamMulai }}</td>
                <td>{{ booking.jamSelesai }}</td>
                <td>{{ booking.totalHarga }}</td>
                <td>{{ booking.status }}</td>
                <td><i class="bi bi-check-square-fill" @click="updateStatus(booking.id, 'Terima')"></i></td>
                <td><i class="bi bi-x-square-fill" @click="updateStatus(booking.id, 'Tolak')"></i></td>
              </tr>
            </tbody>
          </table>
          <p>Total Semua : {{ totalBooking }}</p>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "Akun Admin - Booking Aula"
})

import { ref, onMounted, computed } from 'vue';
import { useSupabaseClient } from '#imports';

definePageMeta({
  layout: 'layoutBooking'
})

const supabase = useSupabaseClient();

const bookings = ref([]);
const totalBooking = ref(0);
const keyword = ref("")

const fetchBookings = async () => {
  const { data, error } = await supabase
    .from('booking')
    .select('*')
    .order("id", { ascending: false })
    .ilike("namaPeminjam", `%${keyword.value}%`);

  if (data) bookings.value = data 
    totalBooking.value = data.length;
  }

const updateStatus = async (id, status) => {
  try {
    const { data, error } = await supabase
      .from('booking')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error('Error update status:', error.message);
    } else {
      console.log('Booking status berhasil:', data);
      fetchBookings(); 
    }
  } catch (err) {
    console.error('Ada yang Error:', err);
  }
};

const getCari = async () => {
  const { data, error} = await supabase
  .from("booking")
  .select("*, namaPeminjam")
  .ilike('namaPeminjam', `%${keyword.value}%`)
  if(data) bookings.value = data
}

onMounted(() => {
  fetchBookings();
  getCari();
})
</script>

<style scoped>
.search-container {
  position: relative;
  display: inline-block;
}

.search-form {
  width: 100%; 
}

#searchInput {
  padding: 5px 5px 5px 30px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-inline-start: 720px;
}

.search-icon {
  position: absolute;
  left: 730px;
  top: 50%;
  transform: translateY(-50%);
  color: #000000;
}
</style>