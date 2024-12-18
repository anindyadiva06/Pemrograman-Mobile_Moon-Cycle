<template>
  <ion-app>
  <ion-split-pane v-if="menuEnabled" content-id="main-content">
    <!-- Sidebar Menu -->
    <ion-menu content-id="main-content" type="overlay">
      <ion-content>
        <!-- Logo di atas sidebar -->
        <div class="sidebar-logo">
          <img src="@/assets/images/logo with name.png" alt="Logo Moon" class="logo-image" />
        </div>

        <!-- Menu List -->
        <ion-list id="inbox-list">
          <ion-note></ion-note>

          <!-- Menu Toggle untuk setiap halaman -->
          <ion-menu-toggle :auto-hide="false" v-for="(p, i) in appPages" :key="i">
            <ion-item @click="selectedIndex = i" router-direction="root" :router-link="p.url" lines="none" :detail="false" :class="{ selected: selectedIndex === i }">
              <!-- Ganti ion-icon dengan img -->
              <img :src="p.icon" alt="Icon" class="menu-icon" />
              <ion-label>{{ p.title }}</ion-label>
            </ion-item>
          </ion-menu-toggle>
        </ion-list>
      </ion-content>
    </ion-menu>

    <!-- Main Content yang terpengaruh oleh sidebar -->
    <ion-router-outlet id="main-content"></ion-router-outlet>
  </ion-split-pane>

  <!-- Main Content tanpa sidebar ketika menuEnabled false -->
  <ion-router-outlet id="main-content" v-else></ion-router-outlet>
</ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote, IonRouterOutlet, IonSplitPane } from '@ionic/vue';
import { ref, computed } from 'vue'; 
import { useRouter } from 'vue-router';
import homePageIcon from '@/assets/images/home-page.png';
import userIcon from '@/assets/images/user.png';
import menstrualCupIcon from '@/assets/images/menstrual-cup.png';
import editIcon from '@/assets/images/edit.png';
import healthyFoodIcon from '@/assets/images/healthy-food.png';
import clockIcon from '@/assets/images/clock.png';
import exitIcon from '@/assets/images/exit.png'; 

const selectedIndex = ref(0);

const appPages = [
  { title: 'Beranda', url: '/homepage', icon: homePageIcon },
  { title: 'Akun', url: '/akun', icon: userIcon },
  { title: 'Pencatatan', url: '/riwayat-menstruasi', icon: editIcon },
  { title: 'Kalender', url: '/riwayat-menstruasi', icon: menstrualCupIcon },
  { title: 'Nutrisi', url: '/rekomendasi-nutrisi', icon: healthyFoodIcon },
  { title: 'Riwayat', url: '/riwayat', icon: clockIcon },
  { title: 'Keluar', url: '/landing', icon: exitIcon },
];

const router = useRouter();

const menuEnabled = computed(() => {
  const route = router.currentRoute.value;
  return !route.meta?.menuDisabled; // Jika route memiliki meta menuDisabled: true, maka sidebar tidak aktif
});

const path = window.location.pathname.split('folder/')[1];
if (path !== undefined) {
  selectedIndex.value = appPages.findIndex((page) => page.title.toLowerCase() === path.toLowerCase());
}
</script>

<style scoped>
ion-menu {
  --background: linear-gradient(to bottom, #FFE3F1, #ECA8BB, #68618E, #20184A);
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 0 20px 20px 0;
}

ion-menu ion-content {
  --background: transparent;
  padding: 0;
}

ion-menu.md ion-list,
ion-menu.ios ion-list {
  background: transparent !important;
  padding: 0;
}

ion-menu.md ion-item,
ion-menu.ios ion-item {
  --background: transparent !important;
}

ion-menu.md ion-note {
  margin-bottom: 30px;
  color: var(--ion-color-medium-shade);
}

ion-menu.md ion-list-header,
ion-menu.md ion-note {
  padding-left: 10px;
}

ion-menu.md ion-item.selected {
  --background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu.md ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.md ion-item ion-icon {
  color: #616e7e;
}

ion-menu.md ion-item ion-label {
  font-weight: 500;
  color: white; /* White text color */
  font-family: 'Poppins', sans-serif;
}

ion-menu.ios ion-content {
  --padding-bottom: 20px;
}

ion-menu.ios ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.ios ion-item ion-icon {
  font-size: 24px;
  color: #73849a;
}

ion-menu.ios ion-list#labels-list ion-list-header {
  margin-bottom: 8px;
}

ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
  padding-left: 16px;
  padding-right: 16px;
}

ion-menu.ios ion-note {
  margin-bottom: 8px;
}

ion-note {
  display: inline-block;
  font-size: 16px;
  color: var(--ion-color-medium-shade);
}

ion-item.selected {
  --color: var(--ion-color-primary);
}

ion-menu::part(content) {
  border-radius: 0 20px 20px 0;
}

.sidebar-logo {
  display: flex;
  justify-content: center;
  padding: 10px 0;
}

.logo-image {
  width: 250px;
  height: 250px;
  object-fit: contain;
}

/* Styling untuk ikon menu */
.menu-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
  margin-right: 10px;
}
</style>
