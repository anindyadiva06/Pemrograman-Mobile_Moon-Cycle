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
          <h1 class="header-title">Fase Ovulasi</h1>
        </div>
      </div>

      <div class="header-description">
        <p>
          Fokus utama: Mendukung proses ovulasi, menjaga kualitas sel telur, dan mengatur hormon pada puncaknya.
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
  { judul: "Vitamin C", detail: ["Jeruk, lemon, dan citrus lainnya", "Stroberi", "Kiwi", "Paprika merah", "Brokoli"] },
  { judul: "Zinc", detail: ["Jeruk, lemon dan citrus lainnya", "Kiwi", "Stroberi", "Paprika merah dan hija", "Brokoli"] },
  { judul: "Magnesium", detail: ["Tiram", "Daging sapi dan ayam", "Biji labu", "Kacang mete", "Kacang-kacangan"] },
  { judul: "Vitamin E", detail: ["Alpukat", "Kacang almond", "Biji bunga matahari", "Minyak zaitun", "Bayam"] },
  { judul: "Omega-3", detail: ["Ikan berlemak (salmon, sarden, tuna)", "Chia seeds", "Flax seeds", "Kenari"] },
  { judul: "Magnesium", detail: ["Cokelat Hitam", "Alpukat", "Pisang", "Kacang almond", "Edamame"] },
  { judul: "Vitamin B6", detail: ["Ayam", "Kentang", "Pisang", "Telur", "Bayam"] },
  { judul: "Antioksidan", detail: ["Blueberry","Raspberry", "Anggur merah", "Kale", "Wortel"] },
  { judul: "Protein Berkualitas", detail: ["Daging ayam","Ikan", "Telur", "Tahu dan tempe", "Greek yoghurt"] },
  { judul: "Serat", detail: ["Sayuran hijau (bayam, brokoli, asparagus)","Buah-buahan (apel, pir, beri)", "Oatmeal", "Kacang-kacangan", "Quinoa"] },
  { judul: "Air dan Cairan", detail: ["Air putih", "Air kelapa", "Teh herbal (peppermint, chamomile)", "Infused water dengan lemon atau buah beri"] },
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

.header-box {
  background: linear-gradient(to right, #FFE3F1, #ECA8BB);
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

.header-description {
  font-family: "Poppins", sans-serif;
  text-align: center;
  color: #20184A; /* Warna teks gelap */
  font-size: 0.9rem;
  margin: 0 0.8rem 1rem; /* Margin kiri, kanan, bawah */
  line-height: 1.5; /* Jarak antar baris */
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
  background-color: #FFE3F1; 
  color: #20184a;
}

.light-card {
  background-color: #ECA8BB; 
  color: #ffffff;
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
