<template>
  <div class="badan">
    <div class="login-container">
        <h2>Login</h2>
        <form @submit.prevent="login" id="loginForm">
            <div class="input-group">
                <input class="rounded-5" v-model="email" type="email" id="email" name="email" placeholder="Email" required>
                <i class="fas fa-envelope"></i>
            </div>

            <div class="input-group">
                <input class="rounded-5" v-model="password" type="password" id="password" name="password" placeholder="Password" required>
                <i class="fas fa-lock"></i>
            </div>
                <button type="submit">Login</button>
          </form>
            <p id="message">{{ message }}</p>
            <p class="daftar-link">Apakah Anda belum memiliki akun? <NuxtLink to="http://localhost:3000/akun">Daftar di sini</NuxtLink>
            </p>
        
    </div>
  </div>
</template>

<style scoped>
.badan {
    font-family: Georgia, 'Times New Roman', Times, serif;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

.login-container {
    background-color: #8a4848;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    width: 300px;
}

h2 {
    text-align: center;
    color: #fff;
}

form {
    display: flex;
    flex-direction: column;
}

.input-group {
    position: relative;
    margin-bottom: 10px;
}

.input-group i {
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
    color: #000000;
}

input {
    padding: 10px 10px 10px 30px; 
    border: 1px solid #ccc;
    
    width: 100%;
    box-sizing: border-box; 
}

button {
  width: 100%;
    padding: 10px;
    background-color: #7f3333;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 16px;
}

button:hover {
    background-color: #601717;
}

#message {
    color: rgb(10, 0, 0);
    text-align: center;
    margin-top: 10px;
}

.daftar-link {
    text-align: center;
    margin-top: 10px;
    color: #fff;
}

.daftar-link a {
    color: #4a0404;
    text-decoration: none;
}

.daftar-link a:hover {
    text-decoration: underline;
}

</style>
<script setup>
import { ref } from 'vue';
import { useSupabaseClient, useRouter } from '#imports';

useHead({
  title: "Login Akun - Booking Aula"
})

definePageMeta({
  layout: 'layoutBooking'
})

const supabase = useSupabaseClient()
const email = ref('');
const password = ref('');
const message = ref('');
const router = useRouter();

const login = async () => {
  try {
    const { data: user, error } = await supabase
      .from('login')
      .select('id, email, password, hakakses, namaLengkap')
      .eq('email', email.value)
      .single();

    if (error || !user || user.password !== password.value) {
      message.value = 'Email atau password salah';
      return;
    }

    localStorage.setItem('namaLengkap', user.namaLengkap);

    if (user.hakakses === 'admin') {
      router.push('/admin');
      console.log(username)
    } else if (user.hakakses === 'user') {
      router.push('/bookings'); 
    } else {
      message.value = 'Hak akses tidak dikenali';
    }

  } catch (err) {
    console.error('Error login:', err);
    message.value = 'Terjadi kesalahan';
  }
};
</script>