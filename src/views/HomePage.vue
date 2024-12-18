<template>
  <ion-content class="content-background">
    <!-- Header dengan ikon kiri dan kanan -->
    <div class="header-icons">
      <img src="@/assets/images/menu.png" alt="Menu" class="header-icon" @click="openMenu" />
      <h2 class="title">Beranda</h2>
      <img src="@/assets/images/bell.png" alt="Notification" class="header-icon" @click="openMenu" />
    </div>

    <!-- Konten Utama -->
    <div class="container">
      <!-- Greeting -->
      <h3 class="greeting">Halo, <span>User!</span></h3>
      <p class="subtitle">Mari lihat apa yang sedang kamu butuhkan</p>

      <!-- Card Fase Menstruasi -->
      <ion-card class="custom-card phase-card">
        <ion-card-content>
          <div class="card-content">
            <div class="left-content">
              <h4 class="card-title">Fase Menstruasi</h4>
              <p class="description">Kamu sedang berada di fase menstruasi</p>
              <!-- Tombol Lihat Kalender -->
              <ion-button fill="solid" class="action-button" @click="goToRiwayatMenstruasi">Lihat Kalender</ion-button>
            </div>
            <img src="@/assets/images/reproductive.png" alt="Fase" class="card-image" />
          </div>
        </ion-card-content>
      </ion-card>

      <!-- Card Kalender Menstruasi -->
      <ion-card class="custom-card calendar-card">
        <ion-card-content>
          <div class="card-content">
            <div class="left-content">
              <h4 class="card-title">Kalender Menstruasi</h4>
              <p class="description">
                Cek kalender menstruasi dan atur siklusnya untuk memahami pola tubuh Anda.
              </p>
              <!-- Tombol Cek Kalender -->
              <ion-button fill="solid" class="action-button" @click="goToRiwayatMenstruasi">Cek Kalender</ion-button>
            </div>
            <img src="@/assets/images/menstrual-cup.png" alt="Kalender" class="card-image" />
          </div>
        </ion-card-content>
      </ion-card>

      <!-- Card Rekomendasi Nutrisi -->
      <ion-card class="custom-card nutrition-card">
        <ion-card-content>
          <div class="card-content">
            <div class="left-content">
              <h4 class="card-title">Rekomendasi Nutrisi</h4>
              <p class="description">
                Yuk, temukan rekomendasi nutrisi terbaik untuk setiap fase siklus Anda.
              </p>
              <!-- Tombol Cek Nutrisi -->
              <ion-button fill="solid" class="action-button" @click="goToRekomendasiNutrisi">Cek Nutrisi</ion-button>
            </div>
            <img src="@/assets/images/healthy-food.png" alt="Nutrisi" class="card-image" />
          </div>
        </ion-card-content>
      </ion-card>
    </div>
  </ion-content>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { menuController } from "@ionic/vue";
import { useRouter } from 'vue-router';

export default defineComponent({
  name: "Homepage",
  setup() {
    const router = useRouter(); // Inisialisasi router di setup()

    const goToRiwayatMenstruasi = () => {
      router.push('/riwayat-menstruasi'); // Arahkan ke halaman RiwayatMenstruasi
    };

    const goToRekomendasiNutrisi = () => {
      router.push('/rekomendasi-nutrisi'); // Arahkan ke halaman RekomendasiNutrisi
    };

    return { goToRiwayatMenstruasi, goToRekomendasiNutrisi }; // Return untuk digunakan di template
  },
  methods: {
    async openMenu() {
      await menuController.open(); // Membuka sidebar
    }
  }
});
</script>

<style scoped>
:root {
  --font-family-base: 'Poppins', sans-serif;
}

.content-background {
  --background: #fff;
  font-family: "Poppins", sans-serif;
}

.header-icons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
}

.header-icon {
  width: 30px;
  height: 30px;
}

.title {
  font-weight: bold;
  font-size: 20px;
  color: #4a306d;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.icon-left {
  width: 5px;
  height: 5px;
  cursor: pointer;
}

.icon-right {
  width: 5px;
  height: 5px;
  cursor: pointer;
}

.container {
  padding: 10px 20px;
}

.greeting {
  color: #4a306d;
  font-size: 22px;
  font-weight: bold;
  text-align: left;
  margin-bottom: 5px;
}

.subtitle {
  color: #4a306d;
  font-size: 14px;
  font-weight: normal;
  text-align: left;
  margin-bottom: 20px;
}

.custom-card {
  border-radius: 15px;
  box-shadow: none;
  margin: 10px auto;
  max-width: 330px;
  padding: 6px;
}

.card-title {
  font-family: var(--font-family-base);
  font-size: 20px; 
  font-weight: bold;
  color: #4a306d; 
  margin-bottom: 8px;
}

.card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.card-title {
  font-size: 16px;
  font-weight: bold;
  color: #ffff;
  margin-bottom: 8px;
}

.description {
  font-family: var(--font-family-base);
  font-size: 12px; 
  color: #fff;
  margin-bottom: 10px;
}

.action-button {
  font-family: var(--font-family-base);
  font-size: 10px;
  font-weight: bold;
  color: #fff;
  border-radius: 20px; 
  background: linear-gradient(to right, #bfbadd8a, #20184ac0); 
  --background: none;
  --box-shadow: none;
  padding: 0px 9px; 
}

.card-image {
  width: 80px;
  height: 80px;
  object-fit: contain;
}

/* Warna khusus card */
.phase-card {
  background: linear-gradient(to bottom, #AFA9D2, #FFE3F1);
}

.calendar-card {
  background: linear-gradient(to bottom, #20184ac2, #ECA8BB);
}

.nutrition-card {
  background: linear-gradient(to bottom, #20184ac2, #ECA8BB);
}
</style>
