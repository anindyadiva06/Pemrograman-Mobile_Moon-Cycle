<template>
  <ion-page>
    <ion-content>
      <!-- Tombol Silang di Kiri Atas -->
      <div class="close-button" @click="closePage">
        <img src="@/assets/images/close.png" alt="Close" />
      </div>

      <!-- Card 1: Informasi Pengguna -->
      <ion-card class="user-info-card card-spacing1">
        <div class="card-content">
          <!-- Icon User -->
          <div class="icon-container">
            <img src="@/assets/images/Profile.png" alt="User Icon" class="icon" />
          </div>
          <!-- Teks Informasi -->
          <div class="text-content">
            <ion-card-title class="aligned-title">Nama Pengguna</ion-card-title>
            <p>{{ user.email }}</p>
            <p>{{ user.umur }} tahun</p>
            <button color="primary" @click="goToProfile">Edit Info</button>
          </div>
        </div>
      </ion-card>

      <!-- Card 2: Privasi Data -->
      <ion-card class="privacy-card card-spacing2">
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
          </div>
        </div>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router"; // Import router untuk navigasi

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
  setup() {
    const router = useRouter();

    const goToProfile = () => {
      router.push("/profile"); // Navigasi ke halaman Profile
    };

    return { goToProfile };
  },
  methods: {
    editInfo() {
      console.log("Edit Info Tapped");
      this.goToProfile(); // Panggil metode navigasi
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
/* Tombol Silang dengan Icon */
.close-button {
  position: absolute;
  top: 20px; /* Beri jarak dari atas */
  left: 20px; /* Beri jarak dari kiri */
  cursor: pointer;
  width: 30px;
  height: 30px;
  z-index: 10;
}

.close-button img {
  width: 100%;
  height: 100%;
}

/* Styling Card */
ion-card {
  border-radius: 15px;
}

.card-spacing1 {
  margin: 5rem 1.5rem 1.5rem 1.5rem;  
}

.card-spacing2 {
  margin: 2rem 1.5rem 1.5rem 1.5rem; 
}

.user-info-card {
  background: linear-gradient(to right, #FFE3F1, #ECA8BB);
}

.privacy-card {
  background: linear-gradient(to right, #d0cbef, #968fbf);
}

.card-content {
  display: flex;
  align-items: center;
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

button {
  background: #FFE3F1; 
  color: #20184A;
  border-radius: 18px; 
  padding: 0.5rem 0.7rem;
  font-family: "Poppins", sans-serif; 
  font-weight: bold; 
}

</style>
