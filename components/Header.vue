<template>
    <div class="container-fluid">
      <nav class="fixed-top bg-white">
        <div class="content flex_space">
          <div class="logo ms-3">
            <img src="/assets/img/logow.png">
          </div>
          <div class="navlinks">
            <ul id="list">
                <li>
                  <nuxt-link to="http://localhost:3000/bookings/booking">
                      <button class="primary-btn">Booking</button>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/riwayat/">
                    <button class="btn-bg">
                    Jadwal Booking
                  </button>
                  </nuxt-link>
                </li>
              <li> 
                <nuxt-link to="/">
                  keluar
                 <i class="fa-solid fa-arrow-right-from-bracket"></i>
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
</div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');


*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
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
.btn-bg {
  padding: 15px 40px;
  background: #7e2d2d;
  font-weight: bold;
  color: white;
}

.secondary-btn {
  padding: 15px 40px;
  background: none;
  border: 2px solid white;
  font-weight: bold;
  color: white;
}

.primary-btn:hover {
  background-color: #4d0b0b; 
}
.btn-bg:hover {
  background-color: #4d0b0b; 
}

.container {
  max-width: 85%;
  margin: auto;
}

header
nav {
  height: 10vh;
  line-height: 10vh;
  padding: 0 20px;
}

nav img {
  margin: 10px 2px;
  height: 50px;
  width: 150px;
}

nav ul {
  display: inline-block;
}

nav ul li {
  display: inline-block;
  text-transform: uppercase;
}

nav ul li a {
  color: #000;
  margin: 0 10px;
  transition: 0.5s;
}

nav ul li a:hover {
  color: #915e5e;
}

nav i {
  margin: 30px 20px;
}

nav button {
  padding: 13px 40px;
}

nav .navlinks span {
  display: none;
}
</style>
