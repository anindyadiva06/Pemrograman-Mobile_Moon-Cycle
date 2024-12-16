<template>
  <ion-page>
    <ion-content :scroll-y="true">
      <!-- Tombol Back -->
      <div class="back-button" @click="goBack">
        <img src="@/assets/images/navigate_before.png" alt="Back" />
      </div>

      <!-- Header dengan Box Gradasi -->
      <div class="header-container">
        <div class="header-box">
          <h1 class="header-title">Fase Menstruasi</h1>
        </div>
      </div>

      <div class="header-description">
        <p>
          Fokus utama: Mengisi kembali cadangan zat besi yang hilang dan meredakan kelelahan.
        </p>
      </div>

      <!-- Container Rekomendasi Card -->
      <div class="recommendation-grid">
        <div
          v-for="(item, index) in rekomendasi"
          :key="index"
          class="recommendation-card"
          :class="{
            'dark-card': isDarkCard(index),
            'light-card': !isDarkCard(index),
          }"
        >
          <div class="card-content">
            <h2 class="card-title">{{ item.judul }}</h2>
            <ul>
              <li v-for="(detail, i) in item.detail" :key="i">{{ detail }}</li>
            </ul>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const goBack = () => router.back();

const rekomendasi = ref([
  { judul: "Zat Besi", detail: ["Daging merah (sapi, ayam)", "Ikan (salmon, tuna)", "Sayuran berdaun hijau", "Kacang-kacangan", "Sereal yang diperkaya zat besi"] },
  { judul: "Vitamin C", detail: ["Jeruk, lemon dan citrus lainnya", "Kiwi", "Stroberi", "Paprika merah dan hijau", "Brokoli"] },
  { judul: "Magnesium", detail: ["Alpukat", "Kacang almond dan kacang mede", "Pisang", "Dark chocolate", "Biji labu"] },
  { judul: "Vitamin B6", detail: ["Kentang", "Pisang", "Ayam dan kalkun", "Kacang-kacangan (tanah)", "Bayam"] },
  { judul: "Omega-3", detail: ["Ikan berlemak (salmon, sarden, makarel)", "Chia seeds", "Flax seeds (biji rami)", "Walnut (kenari)"] },
  { judul: "Kalsium", detail: ["Produk susu (susu, yoghurt, keju)", "Tahu dan tempe", "Jus jeruk kalsium"] },
  { judul: "Air dan Cairan", detail: ["Air putih", "Air kelapa", "Teh herbal (teh jahe, teh peppermint)", "Jus buah alami (jeruk, apel)"] },
  { judul: "Serat", detail: ["Buah-buahan (apel, pir, berries)", "Sayuran (brokoli, wortel)", "Oatmeal", "Biji-bijian utuh (whole grain)"] },
]);

// Logika untuk menentukan warna dark/bright di baris dan kolom
const isDarkCard = (index: number): boolean => {
  const row = Math.floor(index / 2); // Baris ke-berapa (0, 1, 2, dst)
  const col = index % 2; // Kolom (0 = kiri, 1 = kanan)

  return (row + col) % 2 === 0; // Selang-seling berdasarkan baris + kolom
};
</script>

<style scoped>
/* Tombol Back */
.back-button img {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 20px;
  left: 20px;
  cursor: pointer;
  z-index: 10;
}

/* Header dengan Gradasi Box */
.header-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3rem 1rem 0rem;
}

.header-description {
  font-family: "Poppins", sans-serif;
  text-align: center;
  color: #20184A; /* Warna teks gelap */
  font-size: 0.9rem;
  margin: 0 0.8rem 1rem; /* Margin kiri, kanan, bawah */
  line-height: 1.5; /* Jarak antar baris */
}

.header-box {
  background: linear-gradient(to right, #4e2b79, #c8b6e2);
  border-radius: 15px;
  padding: 0.8rem 2rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.header-title {
  color: #ffffff;
  font-weight: bold;
  font-size: 1.4rem;
  margin: 0;
}

/* Container Grid untuk Menampilkan 2 Card Per Baris */
.recommendation-grid {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Dua kolom */
  gap: 1rem; /* Jarak antar card */
  padding: 1rem;
}

/* Card Styling */
.recommendation-card {
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.dark-card {
  background-color: #20184a; /* Ungu Gelap */
  color: #ffffff;
}

.light-card {
  background-color: #afa9d2; /* Ungu Cerah */
  color: #20184a;
}

.card-content {
  padding: 1rem;
}

.card-title {
  font-weight: bold;
  margin-top: 0rem;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  text-align: center;
}

ul {
  margin: 0;
  padding-left: 1rem;
}

li {
  font-size: 0.8rem; /* Memperkecil font isi card */
}
</style>
