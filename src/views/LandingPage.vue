<template>
  <ion-content :style="contentStyle">
    <div class="container">
      <!-- Logo -->
      <div class="logo">
        <img src="@/assets/images/Logo.png" alt="Moon Cycle Logo" class="logo-image" />
        <img src="@/assets/images/logo only name.png" alt="Moon Cycle Logo 2" class="logo-image" />
      </div>
      <!-- Text -->
      <p class="welcome-text">
        Selamat datang di <strong>Moon Cycle!</strong><br />
        Teman terpercaya dalam mengatur siklus menstruasi Anda
      </p>
      <!-- Buttons -->
      <div class="button-group">
        <button
          expand="block"
          class="button-login"
          @click="goToLogin"
        >
          Masuk
        </button>
        <button
          expand="block"
          class="button-register"
          @click="goToRegister"
        >
          Daftar
        </button>
      </div>
    </div>
  </ion-content>
</template>

<script lang="ts">
import { IonButton, IonContent } from '@ionic/vue';

export default {
  name: 'LandingPage',
  data() {
    return {
      contentStyle: {
        '--background': '#FFE3F1',
      },
    };
  },
  methods: {
    goToLogin() {
      this.$router.push('/login');
    },
    goToRegister() {
      this.$router.push('/register');
    },
  },
};
</script>

<style>
body,
ion-content {
  font-family: var(--font-family-base);
}

/* Container utama */
.container {
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center; 
  height: 100%;
  text-align: center;
  padding: 20px;
}

/* Logo */
.logo img {
  width: 200px;
  margin-bottom: 1px;
}

/* Teks Selamat datang */
.welcome-text {
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  font-weight: 400;
  color: #20184A;
  margin-bottom: 40px;
}

/* Group tombol */
.button-group {
  display: flex;
  flex-direction: column;
  gap: 16px; 
  justify-content: center; 
  align-items: center; 
  width: 100%;
  max-width: 350px;

}

/* Button Masuk */
.button-login {
  background: linear-gradient(to right, #afa9d296, #20184aa1); 
  color: white;
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
  height: 50px; 
  font-size: 20px;
  border-radius: 25px;
  width: 70%; 
}

/* Button Daftar */
.button-register {
  background: linear-gradient(to right, rgba(236, 168, 187, 0.329), rgb(236, 168, 187)); 
  color: white;
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
  height: 50px; 
  font-size: 20px;
  border-radius: 25px;
  width: 70%; 
}

/* Gambar Logo */
.logo-image {
  margin-bottom: 15px;
}
</style>
