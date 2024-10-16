<script setup>
useHead({
  title: "Booking - Booking Aula"
})

definePageMeta({
  layout: 'layoutBooking'
})

import { ref, onMounted } from 'vue'

const supabase = useSupabaseClient()
const router = useRouter()

const formData = ref({
  tanggal: '',
  namaPeminjam: '',
  acara: '',
  jamMulai: '',
  jamSelesai: '',
  jumlahTamu: 0,
  totalHarga: 0,
})

const alatOptions = ref([])
const selectedAlat = ref([])
const message = ref('')

const fetchAlatOptions = async () => {
  const { data, error } = await supabase
    .from('alat')
    .select('id, nama')

  if (error) {
    console.error('Gagal mengambil alat:', error.message)
    return
  }

  alatOptions.value = data
}

const calculateTotalHarga = () => {
  const [startHour, startMinute] = formData.value.jamMulai.split(':').map(Number)
  const [endHour, endMinute] = formData.value.jamSelesai.split(':').map(Number)

  const startTime = new Date(0, 0, 0, startHour, startMinute)
  const endTime = new Date(0, 0, 0, endHour, endMinute)

  const diffInMs = endTime - startTime
  const diffInHours = diffInMs / (1000 * 60 * 60)

  if (diffInHours > 0) {
    formData.value.totalHarga = diffInHours * 100000
  } else {
    formData.value.totalHarga = 0
  }
}

watch([() => formData.value.jamMulai, () => formData.value.jamSelesai], calculateTotalHarga)

const submitBooking = async () => {
  // console.log(selectedAlat.value)
  try {
    calculateTotalHarga()

    const { data, error } = await supabase
      .from('booking')
      .insert([{
        tanggal: formData.value.tanggal,
        namaPeminjam: formData.value.namaPeminjam,
        acara: formData.value.acara,
        jamMulai: formData.value.jamMulai,
        jamSelesai: formData.value.jamSelesai,
        alat: selectedAlat.value,
        jumlahTamu: formData.value.jumlahTamu,
        totalHarga: formData.value.totalHarga
      }])

    if (error) {
      console.error('Gagal mengirimkan booking:', error.message)
      message.value = (`Gagal menyimpan booking: ${error.message}`)
      return
    }

    message.value = 'Booking terkirim, mohon tunggu tanggapan dari tim sarana';

    setTimeout(() => {
      router.push('/riwayat')
    }, 5000); 
  } catch (error) {
    console.error('Terjadi error:', error.message)
    message.value = 'Terjadi kesalahan tak terduga.'
  }
}

onMounted(fetchAlatOptions)

</script>

<template>
  <div class="container-fluid" style="background-color: #8a4848;">
    <div class="row justify-content-center tinggi p-5">
      <div class="col-5 bg-white tumpul p-3">
        <div class="icon">
        <nuxt-link class="back-button" to="http://localhost:3000/bookings"><i class="fas fa-arrow-left"></i> Kembali</nuxt-link>
      </div>
      <h2>Booking Ruang Aula</h2>
      <!-- <h1>pilih: {{ selectedAlat }}</h1> -->
      <form @submit.prevent="submitBooking" id="bookingForm">
        <div class="input-group">
              <i class="fas fa-calendar-alt"></i>
              <input v-model="formData.tanggal" type="date" class="tanggal" id="tanggal" name="tanggal" placeholder="Tanggal" required>
          </div>
          <div class="input-group">
            <i class="fas fa-user"></i>
              <input v-model="formData.namaPeminjam" type="text" class="user" name="user" placeholder="Nama Peminjam">
          </div>
          <div class="input-group">
              <i class="fas fa-calendar-check"></i>
              <input v-model="formData.acara" type="text" id="acara" name="acara" placeholder="Jenis Acara" required>
          </div>
          <div class="input-group time-group">
              <div class="time-input">
                  <i class="fas fa-clock"></i>
                  <input v-model="formData.jamMulai" type="time" @change="calculateTotalHarga" id="jamMulai" name="jamMulai" required>
              </div>
              <div class="time-input">
                  <i class="fas fa-clock"></i>
                  <input v-model="formData.jamSelesai" type="time" @change="calculateTotalHarga" id="jamSelesai" name="jamSelesai" required>
              </div>
          </div>
          <!-- <div class="input-group">
            <i class="fas fa-box"></i>
            <label for="paket" class="form-label visually-hidden">Pilih Paket</label>
            <select v-model="formData.paket" id="paket" class="form-select" required>
              <option value="" disabled>Pilih paket</option>
              <option v-for="item in paketOptions" :key="item.id" :value="item.id">{{ item.nama }}</option>
            </select>
          </div> -->
          <div class="input-group">
            <i class="fas fa-box"></i>
            <label for="alat" class="form-label ms-4 mt-1">Pilih Alat</label>
            <div id="alat" class="form-check-group">
              <div v-for="item in alatOptions" :key="item.id" class="form-check">
                <input
                  v-model="selectedAlat"
                  :value="item.nama"
                  type="checkbox"
                  :id="'alat-' + item.id"
                  class=""
                />
                <label :for="'alat-' + item.id" class="form-check-label">
                  {{ item.nama }}
                </label>
              </div>
            </div>
          </div>

          <div class="input-group jumlah-tamu">
              <i class="fas fa-users"></i>
              <input v-model="formData.jumlahTamu" type="number" name="jumlahTamu" placeholder="Jumlah Tamu" max="150" required>
          </div>
          <div class="input-group">
              <i class="fas fa-money-bill-wave"></i>
              <input v-model="formData.totalHarga" type="text" id="totalHarga" name="totalHarga" placeholder="Total Harga" readonly>
          </div>
          <button class="submit" type="submit">Booking</button>
      </form>
      <p id="message"> {{ message }} </p>
      </div>
      
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');


h2 {
  text-align: center;
  color: #333333;
}
.tinggi{
  min-height: 100vh;
}
.tumpul{
  border-radius: 5%;
}
.input-group {
  position: relative;
  margin-bottom: 15px;
}

.input-group i {
  position: absolute;
  top: 10px;
  left: 10px;
  color: #666666;
}

.input-group.jumlah-tamu {
  margin-top: 15px;
}

.input-group input, .input-group select {
  width: 100%;
  padding: 8px 8px 8px 30px;
  box-sizing: border-box;
  border: 1px solid #cccccc;
  border-radius: 20px;
}

.time-group {
  display: flex;
  justify-content: space-between;
}

.time-input {
  position: relative;
  width: 48%;
}

.submit {
  width: 100%;
  padding: 10px;
  background-color: #601717;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 16px;
}

.submit:hover {
  background-color: #540b0b;
}

.back-button {
  display: inline-block;
  margin-bottom: 20px;
  text-decoration: none;
  color: #a20a0a;
  font-size: 18px;
  font-weight: bold;
}

.back-button i {
  margin-right: 8px;
}

.icon {
  margin-right: 160px;
}

.form-check-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px; 
}

.form-check {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.form-check-input {
  margin-right: 8px;
}

.form-check-label {
  font-size: 14px;
  color: #333;
}
</style>