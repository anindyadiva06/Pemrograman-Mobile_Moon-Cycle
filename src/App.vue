<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
      <!-- Sidebar Menu -->
      <ion-menu content-id="main-content" type="overlay">
        <ion-content>
          <ion-list id="inbox-list">
            <ion-list-header>Menu</ion-list-header>
            <ion-note>Hi, User!</ion-note>

            <ion-menu-toggle :auto-hide="false" v-for="(p, i) in appPages" :key="i">
              <ion-item @click="selectedIndex = i" router-direction="root" :router-link="p.url" lines="none" :detail="false" class="hydrated" :class="{ selected: selectedIndex === i }">
                <ion-icon aria-hidden="true" slot="start" :ios="p.iosIcon" :md="p.mdIcon"></ion-icon>
                <ion-label>{{ p.title }}</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>

          <ion-list id="labels-list">
            <ion-list-header>Labels</ion-list-header>

            <ion-item v-for="(label, index) in labels" lines="none" :key="index">
              <ion-icon aria-hidden="true" slot="start" ></ion-icon>
              <ion-label>{{ label }}</ion-label>
            </ion-item>
          </ion-list>
        </ion-content>
      </ion-menu>

      <!-- Main Content -->
      <ion-router-outlet :key="$route.fullPath" id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
</template>

<script setup lang="ts">
import {
  IonApp,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonRouterOutlet,
  IonSplitPane,
} from '@ionic/vue';
import { ref } from 'vue';
import {
  homeOutline,
  homeSharp,
  personCircleOutline,
  personCircleSharp,
  logInOutline,
  logInSharp,
  addCircleOutline,
  addCircleSharp,
  keyOutline,
  keySharp,
} from 'ionicons/icons';

const selectedIndex = ref(0);
const appPages = [
  {
    title: 'Home',
    url: '/home',
    iosIcon: homeOutline,
    mdIcon: homeSharp,
  },
  {
    title: 'Login',
    url: '/login',
    iosIcon: logInOutline,
    mdIcon: logInSharp,
  },
  {
    title: 'Register',
    url: '/register',
    iosIcon: addCircleOutline,
    mdIcon: addCircleSharp,
  },
];

const labels = ['Family', 'Friends', 'Work', 'Travel', 'Reminders'];

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

body {
  font-family: 'Poppins', sans-serif;
}

</style>
