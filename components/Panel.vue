<template>
  <div class="container-fluid">
    <!-- Sidebar -->
<div class="sidebar d-flex flex-column p-3 text-white">
  <div class="logo">
    <img src="/assets/img/logopo.png" alt="">
  </div>
  <div class="text">
    <h4 class="text-light text-center">{{ namaLengkap }}</h4>
    <ul class="nav flex-column">
      <li class="nav-item">
        <NuxtLink to="http://localhost:3000/admin" class="nav-link">
          <i class="bi bi-house-door-fill"></i> Dashboard
      </NuxtLink>
      </li>
      <li class="nav-item">
        <NuxtLink to="http://localhost:3000/admin/answer" class="nav-link">
          <i class="bi bi-calendar-check"></i> Booking
        </NuxtLink>
      </li>
    </ul>
  </div>
  <div class="logout">
    <NuxtLink to="/" class="nav-link">
      <i class="bi bi-box-arrow-left"></i> Logout
    </NuxtLink>
  </div>
</div>
  </div>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.9.1/font/bootstrap-icons.min.css" rel="stylesheet">
</template>

<style>
    .container-fluid {
      font-family: Arial, sans-serif;
    }
    .sidebar {
      height: 100vh;
      background-color: #343a40;
      padding-top: 20px;
      position: fixed;
      top: 0;
      left: 0;
      width: 220px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .sidebar .logo {
      text-align: center;
      margin-top: 20px;
    }
    .sidebar .logo img {
      width: 100px;
      height: auto;
    }
    .sidebar .nav-link {
      color: white;
      padding: 15px;
    }
    .sidebar .text {
      margin-bottom: 80px;
    }
    .sidebar .nav-link i {
      margin-right: 10px;
    }
    .sidebar .nav-link:hover {
      background-color: #495057;
      color: white;
    }
    .main-content {
      margin-left: 220px;
      padding: 20px;
    }
    .logout {
      margin-bottom: 20px;
    }
    .card i {
      font-size: 2rem;
      margin-bottom: 10px;
    }
  </style>

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