<template>
  <ion-page>
    <ion-content :scroll-y="true">
      <!-- Tombol Kembali -->
      <div class="back-button" @click="goBack">
        <img src="@/assets/images/navigate_before.png" alt="Back" />
      </div>

      <!-- Judul Halaman -->
      <div class="header-container">
        <h1 class="header-title">
          Rekomendasi Nutrisi<br />Siklus Menstruasi
        </h1>
      </div>

      <!-- Card untuk Setiap Fase -->
      <div
        v-for="(item, index) in nutrisiData"
        :key="index"
        class="card"
        :style="{ backgroundColor: item.backgroundColor }"
      >
        <h2 :style="{ color: item.textColor }">{{ item.fase }}</h2>
        <p :style="{ color: item.fase === 'Fase Folikular' ? '#20184A' : '#fff' }">
          {{ item.deskripsi }}
        </p>
        <button
          fill="solid"
          size="small"
          class="card-button"
          :style="{ backgroundColor: item.buttonColor, color: '#fff' }"
          @click="goToFase(item.route)"
        >
          {{ item.buttonLabel }}
        </button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getNutrisiData } from "@/controllers/NutrisiController";

const router = useRouter();
const nutrisiData = ref(getNutrisiData());

const goBack = () => {
  router.back();
};

const goToFase = (route: string) => {
  router.push(route);
};
</script>

<style scoped>
/* Tombol Back */
.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
  cursor: pointer;
}
.back-button img {
  width: 30px;
  height: 30px;
}

/* Header dengan Gradasi */
.header-container {
  display: flex;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 20px;
}

.header-title {
  font-family: "Poppins", sans-serif;
  font-size: 1.9rem;
  font-weight: 900;
  text-align: center;

  /* Warna Gradasi */
  background: linear-gradient(to right, #20184a, #a28dbf);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}


/* Card */
.card {
  border-radius: 15px;
  padding: 1.2rem;
  margin: 1rem 1.5rem;
  color: #fff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  font-family: "Poppins", sans-serif;
}

.card h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  font-weight: bold;
}

.card p {
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
  line-height: 1.4;
  color: #fff; /* Default warna teks */
}

/* Tombol */
.card-button {
  font-weight: 600;
  border-radius: 18px;
  text-transform: capitalize;
  padding: 0.8rem;
}
</style>
