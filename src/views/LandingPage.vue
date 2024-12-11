<template>
    <ion-content :style="contentStyle">
      <div class="container">
        <!-- Logo -->
        <div class="logo">
          <img src="@/assets/images/Logo.png" alt="Moon Cycle Logo" />
          <img src="@/assets/images/logo only name.png" alt="Moon Cycle Logo 2" />
        </div>
        <!-- Text -->
        <p class="welcome-text">
          Selamat datang di <strong>Moon Cycle!</strong><br />
          Teman terpercaya dalam mengatur siklus menstruasi Anda
        </p>
        <!-- Buttons -->
        <div class="button-group">
          <ion-button expand="block" :style="loginButtonStyle" class="button-login">
            Masuk
          </ion-button>
          <ion-button expand="block" :style="registerButtonStyle" class="button-register">
            Daftar
          </ion-button>
        </div>
      </div>
    </ion-content>
  </template>
  
  <script lang="ts">
  export default {
    name: 'LandingPage',
    data() {
      return {
        contentStyle: {
          '--background': '#FFE3F1', 
        },
        loginButtonStyle: {
          '--background': 'linear-gradient(56%, #AFA9D2, 66%, #20184A)', 
          '--color': '#FFFFFF', 
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
  
  /* Container styling untuk tata letak */
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    text-align: center;
    padding: 20px;
  }
  
  .logo img {
    width: 120px;
    margin-bottom: 20px;
  }
  
  .welcome-text {
    font-family: var(--font-family-base);
    font-size: 16px;
    font-weight: 400;
    color: #20184A;
    margin-bottom: 40px;
  }
  
  .button-group {
    width: 100%;
    max-width: 300px;
  }
  
  .button-login {
    margin-bottom: 16px;
  }
 
  .button-register {
    margin-bottom: 16px;
  }
  </style>
  