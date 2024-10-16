<script setup>
import { ref, onMounted, computed } from 'vue';
import { useSupabaseClient } from '#imports';

useHead({
  title: "Jadwal Booking - Booking Aula"
})

const supabase = useSupabaseClient()

const Semua = ref(0)
const bookings = ref([])
const keyword = ref('')
const pilihTanggal = ref('');

const totalBayar = computed(() => {
  return bookings.value.reduce((total, booking) => total + booking.totalHarga, 0)
})

const getJumlah = async () => {
  const {data, count} = await supabase
  .from("booking")
  .select("*", { count: "exact" })
  .eq('status', 'Terima')
  if(data) Semua.value = count

}
const fetchSemuaBookings = async () => {
  const { data, error } = await supabase
    .from('booking')
    .select('namaPeminjam, tanggal, jamMulai, jamSelesai, totalHarga')
    .ilike("namaPeminjam", `%${keyword.value}%`)
    .eq('status', 'Terima')
    .order('tanggal', { ascending: false });
    
  if (error) {
    console.error('Error mengambil bookings:', error);
    return;
  }

  bookings.value = data;
};

const fetchBookingsTanggal = async () => {
  if (!pilihTanggal.value) {
    fetchSemuaBookings(); 
    return;
  }
  const { data, error } = await supabase
    .from('booking')
    .select('namaPeminjam, tanggal, jamMulai, jamSelesai, totalHarga')
    .eq('tanggal', pilihTanggal.value)
    .eq('status', 'Terima')
    .order('jamMulai', { ascending: true });

  if (error) {
    console.error('Error mengambil bookings:', error);
    return;
  }

  bookings.value = data;
};

onMounted(() => {
  fetchSemuaBookings();
  fetchBookingsTanggal();
  getJumlah();
});
</script>

<template>
  <div class="badan">
  <div class="container">
    <div class="row">
        <div class="col-lg-12">
          <div class="icon">
            <nuxt-link class="back-button" to="http://localhost:3000/bookings"><i class="fas fa-arrow-left"></i> Kembali</nuxt-link>
          </div>
          </div>
            <h2 class="text">JADWAL BOOKING</h2>
                    <div class="search-container mt-4">
            <form @submit.prevent="fetchSemuaBookings" class="search-form">
              <div class="row">
                  <div class="col-lg-6 d-flex justify-content-start">
                    <div class="date-picker">
                      <label for="tanggal" class="text-white">Pilih Tanggal: </label>
                      <input v-model="pilihTanggal" type="date" id="tanggal" @change="fetchBookingsTanggal">
                    </div>
                </div>
                <div class="col-lg-6 d-flex justify-content-end">
                  <div class="search-container">
                    <i class="fa fa-search search-icon"></i>
                    <input type="text" id="searchInput" placeholder="Cari Nama..." v-model="keyword">
                  </div>
              </div>
                
              </div>
            </form>

            </div>
        </div>
    <div class="my-3 text-white">Menampilkan {{ bookings.length }} Dari {{ Semua }} Peminjam</div>
    <table>
        <thead>
            <tr class="bgrcolor">
                <th>No</th>
                <th>Pemesan</th>
                <th>Tanggal Booking</th>                    
                <th>Jam Mulai</th>
                <th>Jam Selesai</th>
                <th>Total Bayar</th>
            </tr>
        </thead>
        <tbody>
          <tr v-for="(booking, i) in bookings" :key="i" class="bgcolor">
            <td>{{ i + 1 }}</td>
            <td>{{ booking.namaPeminjam }}</td>
            <td>{{ booking.tanggal }}</td>
            <td>{{ booking.jamMulai }}</td>
            <td>{{ booking.jamSelesai }}</td>
            <td>{{ booking.totalHarga }}</td>
          </tr>
        </tbody>
      </table>
      <div class="total-bayar text-white">
        <p>Total Keseluruhan : {{ totalBayar }}</p>
      </div>
    </div>
  </div>

</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.badan {
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
}
    
h1, h2 {
  font-family: sans-serif;
  font-weight: 400px;
}

a {
  text-decoration: none;
}

li {
  list-style: none;
}

.flex {
  display: flex;
}

.flex_space {
  display: flex;
  justify-content: space-between;
}

.icon {
  margin-right: 160px;
}

.back-button {
    display: inline-block;
    margin-bottom: 20px;
    text-decoration: none;
    color: #ffffff;
    font-size: 18px;
    font-weight: bold;
}

.container {
  background-color: #a03636;
  padding: 2em;
  max-width: 100%;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 2em 0;
}

table, th, td {
  border: 1px solid #000000;
}

th, td {
  padding: 1em;
  text-align: left;
}

.bgrcolor {
  background-color: #e07171;
}

.bgcolor {
  background-color: rgb(255, 255, 255)
}

.status-ongoing {
  color: red;
}

.status-ended {
  color: rgb(109, 104, 104);
}



.date-picker {
  display: flex;
  align-items: center;
  justify-content: start;
  
}

.search-form {
  width: 100%; 
}

#searchInput {
  padding: 5px 5px 5px 30px;
  border: 1px solid #ccc;
  border-radius: 4px;
}


#tanggal {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
} 

.search-container {
  position: relative;
  display: inline-block;
}

.search-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #000000;
}

.text {
  text-align: center;
  color: #fff;
}

</style>

