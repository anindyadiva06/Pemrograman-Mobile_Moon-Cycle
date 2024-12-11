<template>
    <ion-content :style="contentStyle">
      <div class="container">
        <!-- Logo -->
        <div class="logo">
          <img src="@/assets/images/logo with name" alt="Moon Cycle Logo" />
        </div>
        
        <!-- Text "Halo, Selamat Datang Kembali!" -->
        <h2 class="welcome-text">
          Halo, <br />Selamat Datang Kembali!
        </h2>
  
        <!-- Formulir Login -->
        <ion-item>
          <ion-label position="floating" class="label">Nama Pengguna</ion-label>
          <ion-input v-model="username" type="text" class="input-field" required></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating" class="label">Kata Sandi</ion-label>
          <ion-input v-model="password" type="password" class="input-field" required></ion-input>
        </ion-item>
  
        <!-- Button Masuk -->
        <ion-button expand="block" :style="loginButtonStyle" class="button-login">
          Masuk
        </ion-button>
  
        <!-- Text Daftar di bawah tombol -->
        <p class="register-text">
          Belum memiliki akun? <a href="/register">Daftar di sini!</a>
        </p>
      </div>
    </ion-content>
  </template>
  
  <script lang="ts">
  export default {
    name: 'LoginPage',
    data() {
      return {
        username: '',
        password: '',
        contentStyle: {
          '--background': 'linear-gradient(100%, #FFE3F1, #AFA9D2)', // Gradasi background
        },
        loginButtonStyle: {
          '--background': 'linear-gradient(56%, #AFA9D2, 66%, #20184A)', // Gradasi untuk tombol Masuk
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
    background-color: #20184A;
    border-radius: 10px;
  }
  
  .label {
    color: #FFFFFF;
  }
  
  .button-login {
    margin-top: 20px;
  }
  
  .register-text {
    font-size: 17px;
    font-weight: bold;
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
  