<template>
  <ion-content class="content-background">
    <div class="container">
      <!-- Logo -->
      <div class="logo">
        <img src="@/assets/images/logo with name.png" alt="Moon Cycle Logo" />
      </div>

      <!-- Formulir Daftar -->
      <div class="input-container">
        <img src="@/assets/images/user.png" alt="User" class="input-icon" />
        <input
          v-model="registerModel.name"
          placeholder="Nama Lengkap"
          type="text"
          required
          class="custom-input"
        />
      </div>

      <div class="input-container">
        <img src="@/assets/images/user.png" alt="Username" class="input-icon" />
        <input
          v-model="registerModel.username"
          placeholder="Nama Pengguna"
          type="text"
          required
          class="custom-input"
        />
      </div>

      <div class="input-container">
        <img src="@/assets/images/mail.png" alt="Email" class="input-icon" />
        <input
          v-model="registerModel.email"
          placeholder="Email"
          type="email"
          required
          class="custom-input"
        />
      </div>

      <div class="input-container">
        <img src="@/assets/images/lock.png" alt="Password" class="input-icon" />
        <input
          v-model="registerModel.password"
          placeholder="Kata Sandi"
          type="password"
          required
          class="custom-input"
        />
      </div>

      <div class="input-container">
        <img src="@/assets/images/lock.png" alt="Confirm Password" class="input-icon" />
        <input
          v-model="registerModel.confirmpass"
          placeholder="Konfirmasi Kata Sandi"
          type="password"
          required
          class="custom-input"
        />
      </div>

      <!-- Button Daftar -->
      <button class="button-register" @click="handleRegister">DAFTAR</button>

      <!-- Teks Masuk -->
      <p class="register-text">
        Sudah memiliki akun? <a href="/login"><strong>Masuk di sini!</strong></a>
      </p>
    </div>
  </ion-content>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RegisterModel } from "../models/RegisterModel";
import { RegisterController } from "../controllers/RegisterController";
import { useRouter } from "vue-router";
import { alertController } from "@ionic/vue";

export default defineComponent({
  name: "RegisterPage",
  setup() {
    const router = useRouter();
    const registerModel = new RegisterModel();
    const registerController = new RegisterController(router);

    const showErrorPopup = async (message: string) => {
      const alert = await alertController.create({
        header: "Pendaftaran Gagal",
        message: message,
        buttons: [{ text: "OK", cssClass: "alert-button" }],
        cssClass: "custom-alert",
      });
      await alert.present();
    };

    const handleRegister = async () => {
      const validation = registerModel.validate();
      if (!validation.valid) {
        await showErrorPopup(validation.message);
        return;
      }

      try {
        await registerController.register(registerModel);
      } catch (error) {
        await showErrorPopup("Terjadi kesalahan saat registrasi. Silakan coba lagi.");
        console.error("Register error:", error);
      }
    };

    return {
      registerModel,
      handleRegister,
    };
  },
});
</script>


<style>
/* Background untuk ion-content */
.content-background {
  --background: linear-gradient(to bottom, #eca8bbc5 0%,#FFE3F1 69%);
  font-family: "Poppins", sans-serif;
}

/* Container utama */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 20px;
  text-align: center;
  gap: 15px;
}

/* Logo */
.logo img {
  margin-top: 20px;
  width: 300px;
}

/* Input Container */
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

/* Custom Input */
.custom-input {
  width: 100%;
  background: #eca8bbb2;
  border: 0px; 
  color: #FFFFFF;
  font-family: "Poppins", sans-serif;
  font-size: 14px;
  font-weight: bold;
  padding: 10px 10px 10px 40px; 
  border-radius: 15px;
  outline: none;
  height: 45px;
  box-sizing: border-box;
}

/* Placeholder Input */
.custom-input::placeholder {
  color: #ffffff80; 
  opacity: 1;
}

/* Tombol Login */
.button-register {
  width: 70%;
  max-width: 320px;
  background: linear-gradient(to right, #eca8bb4b, #eca8bbd2);
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

/* Teks Daftar */
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

/* Gaya Pop-up Alert */
.custom-alert {
  --background: #d5cfeefa;
  --color: #ffffff;
}

.custom-alert .alert-title,
.custom-alert .alert-message {
  font-weight: bold;
  color: #ffffff;
}

/* Tombol OK */
.custom-alert .alert-button {
  color: #ffffff;
  font-weight: bold;
  background: transparent;
}

.custom-alert .alert-button.ion-focused {
  color: #ffffff;
  background: transparent;
}
</style>
