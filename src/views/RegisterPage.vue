<template>
    <ion-content :style="contentStyle">
      <div class="container">
        <!-- Logo -->
        <div class="logo">
          <img src="@/assets/images/logo with name" alt="Moon Cycle Logo" />
        </div>
        
        <!-- Teks "Selamat Datang di Moon Cycle" -->
        <h2 class="welcome-text">
          Daftar Akun
        </h2>
  
        <!-- Formulir Registrasi -->
        <ion-item>
          <ion-label position="floating" class="label">Nama Lengkap</ion-label>
          <ion-input v-model="fullName" type="text" class="input-field" required></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating" class="label">Nama Pengguna</ion-label>
          <ion-input v-model="username" type="text" class="input-field" required></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating" class="label">Email</ion-label>
          <ion-input v-model="email" type="email" class="input-field" required></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating" class="label">Kata Sandi</ion-label>
          <ion-input v-model="password" type="password" class="input-field" required></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating" class="label">Konfirmasi Kata Sandi</ion-label>
          <ion-input v-model="confirmPassword" type="password" class="input-field" required></ion-input>
        </ion-item>
  
        <!-- Button Daftar -->
        <ion-button expand="block" :style="registerButtonStyle" class="button-register">
          Daftar
        </ion-button>
  
        <!-- Teks Masuk di bawah tombol -->
        <p class="login-text">
          Sudah memiliki akun? <a href="/login">Masuk di sini!</a>
        </p>
      </div>
    </ion-content>
  </template>
  
  <script lang="ts">
  export default {
    name: 'RegistrasiPage',
    data() {
      return {
        fullName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        contentStyle: {
          '--background': 'linear-gradient(100%, #ECA8BB, #FFE3F1)', 
        },
        registerButtonStyle: {
          '--background': 'linear-gradient(21%, #ECA8BB, 100%, #ECA8BB)', 
          '--color': '#FFFFFF', 
        },
      };
    },
  };
  </script>
  
  <style scoped>
  
  body, ion-content {
    font-family: var(--font-family-base); 
  }
  
  /* Container untuk elemen di dalamnya */
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 20px;
    text-align: center;
  }

  .logo img {
    width: 120px;
    margin-bottom: 30px;
  }
  
  .welcome-text {
    font-size: 27px;
    font-weight: bold;
    color: #20184A;
    margin-bottom: 20px;
  }
  
  .ion-item {
    margin-bottom: 20px;
  }
  
  .input-field {
    color: #FFFFFF;
    background-color: #ECA8BB; 
  }
  
  .label {
    color: #FFFFFF;
  }
  
  .button-register {
    margin-top: 20px;
  }
  
  .login-text {
    font-size: 17px;
    font-weight: normal;
    color: #20184A;
    margin-top: 20px;
  }
  
  a {
    color: #20184A;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
  </style>
  