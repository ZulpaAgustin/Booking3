<template>
  <div class="container-fluid">  
    <div class="main-content">
  <h1 class="text text-center">Selamat Datang {{ namaLengkap }}</h1>

  <div class="row">
    <div class="col-md-6">
      <div class="card text-center mb-4">
        <div class="card-body">
          <i class="bi bi-person-badge-fill"></i>
          <h5 class="card-title">Peminjam</h5>
          <p class="card-text">Jumlah Peminjam : {{ totalBooking }}</p>
        </div>
      </div>
    </div>

    <div class="col-md-6">
      <div class="card text-center mb-4">
        <div class="card-body">
          <i class="bi bi-people-fill"></i>
          <h5 class="card-title">Admin</h5>
          <p class="card-text">Jumlah Admin : {{ totalAdmin }}</p>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const supabase = useSupabaseClient();
const namaLengkap = ref('');  
const totalBooking = ref(0);
const totalAdmin = ref(0);

const fetchBookings = async () => {
  const { data, error } = await supabase
    .from('booking')
    .select('*')
    .eq('status', 'Terima')

  if (error) {
    console.error('Error mengambil bookings:', error.message);
  } else {
    totalBooking.value = data.length;
  }
};

const getUser = async () => {
  const storedNamaLengkap = localStorage.getItem('namaLengkap');  
  if (storedNamaLengkap) {
    namaLengkap.value = storedNamaLengkap;
  } else {
    console.log('Pengguna belum login.');
  }
}

const fetchAdmin = async () => {
  const { data, error } = await supabase
    .from('login')
    .select('*')
    .eq('hakakses', 'admin');

  if (error) {
    console.error('Error mengambil data admin:', error.message);
  } else {
    totalAdmin.value = data.length;
  }
};

onMounted(() => {
  fetchBookings(),
  getUser()
  fetchAdmin()
});

</script>