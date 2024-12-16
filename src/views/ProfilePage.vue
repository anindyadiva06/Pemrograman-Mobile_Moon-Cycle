<template>
  <ion-page>
    <ion-content>
      <!-- Tombol Close -->
      <div class="close-button" @click="closePage">
        <img src="@/assets/images/close.png" alt="Close Icon" />
      </div>

      <!-- Foto Profil -->
      <div class="profile-container">
        <img src="@/assets/images/Profile.png" alt="User Icon" class="profile-icon" />
      </div>

      <!-- Judul Halaman -->
      <h2 class="title">Pilih Foto Profil</h2>

      <!-- Form Edit Info -->
      <ion-list class="info-list">
        <ion-item>
          <ion-label position="stacked">Email</ion-label>
          <ion-input v-model="user.email" type="email" placeholder="Masukkan Email"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Nama</ion-label>
          <ion-input v-model="user.nama" type="text" placeholder="Masukkan Nama"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Tanggal Lahir</ion-label>
          <ion-input v-model="user.tanggalLahir" type="date"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="stacked">Kata Sandi</ion-label>
          <ion-input
            v-model="user.kataSandi"
            type="password"
            placeholder="Masukkan Kata Sandi"
          ></ion-input>
        </ion-item>
      </ion-list>

      <!-- Tombol Batal dan Simpan -->
      <div class="button-container">
        <button fill="clear" class="batal-button" @click="cancel">Batal</button>
        <button class="simpan-button" @click="save">Simpan</button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "ProfilePage",
  setup() {
    const router = useRouter();

    // Data user
    const user = {
      email: "",
      nama: "",
      tanggalLahir: "",
      kataSandi: "",
    };

    // Navigasi kembali ke halaman Akun
    const closePage = () => {
      router.push("/akun");
    };

    const cancel = () => {
      router.push("/akun");
    };

    // Simpan data (dummy logika)
    const save = () => {
      console.log("Data disimpan:", user);
      router.push("/akun"); // Kembali ke halaman Akun setelah menyimpan
    };

    return { closePage, cancel, save, user };
  },
});
</script>

<style scoped>
/* Tombol Close */
.close-button {
  position: absolute;
  top: 15px;
  left: 15px;
  cursor: pointer;
  z-index: 10;
}

.close-button img {
  width: 30px;
  height: 30px;
}

/* Container Foto Profil */
.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}

.profile-icon {
  width: 100px;
  height: 100px;
}

/* Judul Halaman */
.title {
  text-align: center;
  font-family: "Poppins", sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  margin-top: 10px;
  color: #333;
}

/* List Info */
.info-list {
  margin: 20px;
}

ion-item {
  --padding-start: 10px;
  --padding-end: 10px;
  font-family: "Poppins", sans-serif;
}

/* Tombol Batal dan Simpan */
.button-container {
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 20px;
  left: 20px;
  right: 20px;
}

.batal-button {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  color: #8a4fd3 !important;
  background-color: #f2e8ff !important;
  border-radius: 18px;
  padding: 0.7rem;
}

.simpan-button {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  background-color: #8a4fd3 !important;
  color: #fff !important;
  border-radius: 18px;
  padding: 0.7rem;
}
</style>
