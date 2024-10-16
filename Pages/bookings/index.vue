<script setup>
useHead({
  title: "Home"
})

import { ref, onMounted, computed } from 'vue';
import { useSupabaseClient } from '#imports';

const supabase = useSupabaseClient();
const paketList = ref([]);
const selectedPaket = ref({}); 
const namaAcara = ref('');
const tanggalAcara = ref('');
const namaLengkap = ref('');
const Waktu = ref('');
const Harga = ref('')

const fetchPaket = async () => {
  const { data, error } = await supabase.from('paket').select('*');
  if (error) console.error('Error fetching paket:', error);
  else paketList.value = data;
};

const selectPaket = (paket) => {
  selectedPaket.value = paket || {}; 
};

const loginUser = async (email, password) => {
  const { data, error } = await supabase
    .from('login')
    .select('namaLengkap')
    .eq('email', email)
    .single(); 

  if (error) {
    console.error('Error, tidak bisa login:', error.message);
    return null;
  }
  localStorage.setItem('namaLengkap', data.namaLengkap);

  return data.namaLengkap;
};


const proceedBooking = async () => {
  if (!namaAcara.value || !tanggalAcara.value) {
    alert("Silakan isi nama acara dan tanggal acara!");
    return;
  }

  if (!namaLengkap.value) {
    alert('Pengguna belum login!');
    return;
  }

  try {
    const { data, error } = await supabase.from('booking').insert({
      paket: selectedPaket.value.id,  
      acara: namaAcara.value,
      tanggal: tanggalAcara.value, 
      namaPeminjam: namaLengkap.value,  
      totalHarga: selectedPaket.value.harga        
    });

    if (error) {
      console.error('Error menyimpan booking:', error.message);
      alert(`Terjadi kesalahan: ${error.message}`);
    } else {
      alert('Booking berhasil!');
      namaAcara.value = '';
      tanggalAcara.value = '';
      Waktu.value = '';
      Harga.value = '';
      
      const modal = document.getElementById('bookingModal');
      if (modal) {
        const modalInstance = bootstrap.Modal.getInstance(modal);
        modalInstance.hide();
      }
    
    }
  } catch (err) {
    console.error('Terjadi Kesalahan:', err);
    alert('Terjadi kesalahan yang tidak terduga. Coba lagi.');
  }
};


fetchPaket();
loginUser();
onMounted(() => {
  const storedNamaLengkap = localStorage.getItem('namaLengkap');
  if (storedNamaLengkap) {
    namaLengkap.value = storedNamaLengkap;
    console.log('namaLengkap from localStorage:', namaLengkap.value);
  } else {
    alert('Pengguna belum login.');
  }
});
</script>

<template>
    <div class="row">
      <div class="col">
      <section class="home">
          <div class="content">
            <Carousel />
          </div>
        </section>
      </div>
    </div>
    <br>
    <section class="ruang">
    <div class="container top">
      <div class="heading">
        <h1>TERSEDIA</h1>
        <h2>Paket Aula</h2>
        <p>Sedia Paket-Paket Aula Untuk Para Pengguna Ruangan Aula</p>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-md-4 mb-4" v-for="(paket, index) in paketList" :key="index">
          <div class="card">
            <img :src="paket.image" class="card-img-top" :alt="paket.name">
            <div class="card-body">
              <h5 class="card-title">{{ paket.name }}</h5>
              <p class="card-text">
                <i class="fa-solid fa-user-group"></i> Untuk {{ paket.orang }} orang <br>
                <i class="fas fa-tools"></i> {{ paket.fasilitas }}.<br>
                <i class="fa-solid fa-stopwatch"></i> {{ paket.waktu }}<br>
                <i class="fa-solid fa-money-bill"></i> {{ paket.harga }}
              </p>
              <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#bookingModal" @click="selectPaket(paket)">Lihat Detail</button>
            </div>
          </div>
        </div>
      </div>
      </div>

    
  </section>
   
  <!-- Booking Modal -->
<div class="modal fade" id="bookingModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{{ selectedPaket.name || 'Paket Detail' }}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p>Apakah Anda ingin melakukan booking untuk {{ selectedPaket.name || 'Paket ini' }}?
          <br> Silahkan isi data dibawah ini:
        </p>
        <form>
          <div class="mb-3">
            <label for="eventName" class="form-label" >Nama Acara</label>
            <input type="text" class="form-control" id="eventName" v-model="namaAcara" placeholder="Masukkan nama acara">
          </div>
          <div class="mb-3">
            <label for="eventDate" class="form-label">Tanggal Acara</label>
            <input type="date" class="form-control" id="eventDate" v-model="tanggalAcara">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Batal</button>
        <button type="button" class="btn btn-primary" @click="proceedBooking">Booking</button>
      </div>
    </div>
  </div>
</div>


  <div class="footer">
    <footer>The Pranksters</footer>
  </div>
  
  </template>
  
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');
  
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
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
  
  .container {
    max-width: 85%;
    margin: auto;
  }
  .home {
    height: 100vh;
    color: #fff;
  }
  
  button {
    border: none;
    background: none;
    outline: none;
    transition: 0.5s;
    cursor: pointer;
  }
  
  .primary-btn {
    padding: 15px 40px;
    background: #7e2d2d;
    font-weight: bold;
    color: white;
  }
  
  .home img {
    width: 100%;
    min-height: 100px;
    background-repeat: no-repeat;
  }
  
  .home .text {
    position: absolute;
    top: 0%;
  }
  
  .home .text h1 {
    font-size: 80px;
    font-family: serif;
    font-weight: 400;
  }
  
  .home p{
    margin: 20px 0;
    font-size: 20px;
    font-family:'Times New Roman', Times, serif
  }
  
  .home button {
    margin-right: 20px;
  }
  
  .top {
    margin-top: 80px;
  }
  
  .mtop {
    margin-top: 40px;
  }
  
.heading {
  margin-left: 0px;
}

  .heading h1 {
    font-size: 100px;
    font-weight: 500;
    opacity: 0.1;
    font-family: serif;
    position: absolute;
    top: -30px;
  }
  
  .heading h2 {
    margin: 30px 0;
    font-size: 45px;
    font-family: serif;
    font-weight: 400;
  }
  
  .container {
    justify-content: center;
    align-items: center;
  }
  
  .ruang {
    position: relative;
  }
  
  footer{
    background-color: rgb(151, 64, 42);
    position: sticky;
    bottom: 0px;
    display: flex;
    justify-content: center;
  }
  </style>
  
