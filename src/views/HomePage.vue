<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Moon Cycle</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :style="contentStyle">
      <div class="container">
        <h1>Selamat Datang, {{ userName }}!</h1>
        
        <!-- Quick Access Cards -->
        <div class="cards-grid">
          <ion-card v-for="(menu, index) in quickMenus" :key="index" @click="navigateTo(menu.url)">
            <ion-card-header>
              <ion-icon :icon="menu.icon" class="card-icon"></ion-icon>
              <ion-card-title>{{ menu.title }}</ion-card-title>
            </ion-card-header>
          </ion-card>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  calendarOutline,
  pulseOutline,
  nutritionOutline,
  personOutline,
} from 'ionicons/icons';

export default defineComponent({
  name: 'HomePage',
  setup() {
    const router = useRouter();
    const userName = ref(localStorage.getItem('username') || 'User');

    const quickMenus = [
      {
        title: 'Riwayat Menstruasi',
        icon: calendarOutline,
        url: '/riwayat-menstruasi'
      },
      {
        title: 'Fase Saat Ini',
        icon: pulseOutline,
        url: '/fase-menstruasi'
      },
      {
        title: 'Rekomendasi Nutrisi',
        icon: nutritionOutline,
        url: '/rekomendasi-nutrisi'
      },
      {
        title: 'Profil Saya',
        icon: personOutline,
        url: '/profile'
      }
    ];

    const navigateTo = (url: string) => {
      router.push(url);
    };

    return {
      userName,
      quickMenus,
      navigateTo,
      contentStyle: {
        '--background': '#FFE3F1'
      }
    };
  }
});
</script>

<style scoped>
.container {
  padding: 20px;
}

h1 {
  color: #20184A;
  font-family: 'Poppins', sans-serif;
  font-size: 24px;
  margin-bottom: 24px;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
}

ion-card {
  margin: 0;
  cursor: pointer;
  background: white;
  border-radius: 12px;
  transition: transform 0.2s;
}

ion-card:hover {
  transform: translateY(-3px);
}

.card-icon {
  font-size: 32px;
  color: #20184A;
  margin-bottom: 8px;
}

ion-card-title {
  font-size: 16px;
  color: #20184A;
  font-family: 'Poppins', sans-serif;
}

ion-toolbar {
  --background: #FFE3F1;
  --color: #20184A;
}

ion-title {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
}
</style>