<template>
  <div>
      <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
              <div class="carousel-item active">
                  <img src="/assets/img/aulbg1.png" class="d-block w-100" alt="...">
                  <div class="text carousel-caption d-flex flex-column justify-content-center align-items-center">
                      <h1>SELAMAT DATANG</h1>
                       <h1> {{ namaLengkap }}</h1>
                      <h1>DI BOOKING AULA</h1>
                          
                  </div>
              </div>
          </div>
         
      </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';

const namaLengkap = ref('');  

onMounted(() => {
const storedNamaLengkap = localStorage.getItem('namaLengkap');

if (storedNamaLengkap) {
  namaLengkap.value = storedNamaLengkap;
} else {
  console.log('Pengguna belum login.');
}
});
</script>