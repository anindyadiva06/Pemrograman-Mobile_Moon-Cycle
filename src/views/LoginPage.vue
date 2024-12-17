<template>
  <ion-content class="content-background">
    <div class="container">
      <!-- Logo -->
      <div class="logo">
        <img src="@/assets/images/logo with name.png" alt="Moon Cycle Logo" />
      </div>

      <!-- Text "Halo, Selamat Datang Kembali!" -->
      <h2 class="welcome-text">
        Halo, <br />Selamat Datang Kembali!
      </h2>

      <!-- Formulir Login -->
      <div class="input-container">
        <img src="@/assets/images/user.png" alt="User" class="input-icon" />
        <input
          v-model="loginModel.email"
          placeholder="Email"
          type="email"
          required
          class="custom-input"
        />
      </div>

      <div class="input-container">
        <img src="@/assets/images/lock.png" alt="Password" class="input-icon" />
        <input
          v-model="loginModel.password"
          placeholder="Kata Sandi"
          type="password"
          required
          class="custom-input"
        />
      </div>

      <!-- Button Masuk -->
      <button expand="block" class="button-login" @click="handleLogin">
        MASUK
      </button>

      <!-- Text Daftar di bawah tombol -->
      <p class="register-text">
        Belum memiliki akun? <a href="/register"><strong>Daftar di sini!</strong></a>
      </p>
    </div>
  </ion-content>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { LoginModel } from "@/models/LoginModel"; // Import LoginModel
import LoginController from "@/controllers/LoginController"; // Import LoginController

export default defineComponent({
  name: "LoginPage",
  data() {
    return {
      loginModel: new LoginModel(), // Menggunakan LoginModel untuk data
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    async handleLogin() {
      // Validasi login menggunakan LoginModel
      const validation = this.loginModel.validate();
      if (!validation.valid) {
        // Menampilkan error jika validasi gagal
        await LoginController.showErrorPopup(validation.message);
        return;
      }

      // Jika validasi berhasil, lanjutkan dengan login
      await LoginController.login(this.loginModel.email, this.loginModel.password, this.router);
    },
  },
});
</script>

<style>
.content-background {
  --background: linear-gradient(to bottom, #ffe3f1 57%, #afa9d2 100%);
  font-family: "Poppins", sans-serif;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 20px;
  text-align: center;
  gap: 15px;
}

.logo img {
  margin-top: 20px;
  width: 300px;
}

.welcome-text {
  font-size: 18px;
  font-weight: bold;
  color: #20184a;
}

.input-container {
  width: 100%;
  max-width: 320px;
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 10px;
  width: 20px;
  height: 20px;
}

.custom-input {
  width: 100%;
  background: #20184a3b;
  border: 0px;
  color: #ffffff;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: bold;
  padding: 10px 10px 10px 40px;
  border-radius: 15px;
  outline: none;
  height: 45px;
  box-sizing: border-box;
}

.custom-input::placeholder {
  color: #ffffff80;
  opacity: 1;
}

.button-login {
  width: 70%;
  max-width: 320px;
  background: linear-gradient(to right, #afa9d2bb, #20184a8e);
  color: #ffffff;
  font-weight: bold;
  border-radius: 25px;
  height: 40px;
  font-size: 18px;
  font-family: "Poppins", sans-serif;
  cursor: pointer;
  border: none;
  transition: 0.3s;
}

.button-login:hover {
  background: linear-gradient(to right, #20184a, #afa9d2);
}

.register-text {
  font-size: 14px;
  color: #20184a;
  margin-top: 10px;
}

a {
  color: #20184a;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
