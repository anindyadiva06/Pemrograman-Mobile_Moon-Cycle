<template>
  <ion-page>
    <ion-content>
      <!-- Tombol Silang di Kiri Atas -->
      <div class="close-button" @click="closePage">
        <ion-icon name="close-outline"></ion-icon>
      </div>

      <!-- Card 1: Informasi Pengguna -->
      <ion-card class="user-info-card">
        <div class="card-content">
          <!-- Icon User -->
          <div class="icon-container">
            <img src="@/assets/images/Icon.png" alt="User Icon" class="icon" />
          </div>
          <!-- Teks Informasi -->
          <div class="text-content">
            <ion-card-title class="aligned-title">Nama Pengguna</ion-card-title>
            <p>{{ user.email }}</p>
            <p>{{ user.umur }} tahun</p>
            <ion-button color="primary" @click="editInfo">Edit Info</ion-button>
          </div>
        </div>
      </ion-card>

      <!-- Card 2: Privasi Data -->
      <ion-card class="privacy-card">
        <div class="card-content">
          <!-- Icon Shield -->
          <div class="icon-container">
            <img src="@/assets/images/Shield.png" alt="Shield Icon" class="icon" />
          </div>
          <!-- Teks Privasi -->
          <div class="text-content">
            <ion-card-title class="aligned-title">Data Anda Dilindungi!</ion-card-title>
            <p>
              Privasi Anda adalah prioritas utama kami. Kami tidak akan pernah menjual data Anda
              dan Anda dapat menghapusnya kapan saja.
            </p>
            <ion-button fill="outline" color="primary" @click="pelajariLebihLanjut">
              Pelajari Lebih Lanjut
            </ion-button>
          </div>
        </div>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { User } from "@/models/User";

export default defineComponent({
  name: "AkunPage",
  data() {
    return {
      user: {
        email: "emailpengguna@gmail.com",
        nama: "Nama Pengguna",
        umur: 19,
      },
    };
  },
  methods: {
    editInfo() {
      console.log("Edit Info Tapped");
    },
    pelajariLebihLanjut() {
      console.log("Navigasi ke info privasi");
    },
    closePage() {
      console.log("Tombol silang ditekan");
    },
  },
});
</script>

<style scoped>
/* Tombol Silang di Kiri Atas */
.close-button {
  position: fixed;
  top: 15px;
  left: 15px;
  z-index: 10;
  background-color: #fff;
  border: 2px solid #ddd;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.close-button ion-icon {
  font-size: 20px;
  color: #333;
}

/* Card Styling */
ion-card {
  border-radius: 15px;
  margin-top: 1rem;
}

.user-info-card {
  background: linear-gradient(to right, #fbc2eb, #a6c1ee);
}

.privacy-card {
  background: linear-gradient(to right, #e0eafc, #cfdef3);
}

.card-content {
  display: flex; /* Flexbox */
  align-items: center; /* Tengah secara vertikal */
  padding: 1rem;
}

.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px; /* Lebar tetap */
  height: 80px;
}

.icon {
  width: 60px;
  height: 60px;
}

.text-content {
  margin-left: 1rem; /* Jarak antara icon dan teks */
  flex: 1; /* Ambil sisa ruang */
}

.aligned-title {
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
  color: #333;
  text-align: left;
}

p {
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 0.9rem;
  color: #4a4a4a;
  margin: 0.3rem 0;
}

ion-button {
  margin-top: 0.5rem;
  font-family: "Poppins", sans-serif;
}
</style>
