<template>
  <ion-content class="content-background">
    <!-- Header Section -->
    <div class="header-container">
      <ion-icon :icon="menuOutline" class="menu-icon" @click="openMenu"></ion-icon>
      <h2 class="title">Beranda</h2>
      <ion-icon :icon="notificationsOutline" class="notification-icon" @click="openNotifications"></ion-icon>
    </div>

    <!-- Main Content -->
    <div class="container">
      <!-- Greeting Section -->
      <h3 class="greeting">Halo, <span class="user-name">{{ userName || 'User' }}</span></h3>
      <p class="subtitle">Mari lihat apa yang sedang kamu butuhkan</p>

      <!-- Loading State -->
      <div v-if="isLoading" class="loading-container">
        <ion-spinner name="crescent"></ion-spinner>
        <p>Memuat data...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-container">
        <ion-icon :icon="alertCircleOutline" class="error-icon"></ion-icon>
        <p>{{ error }}</p>
        <ion-button @click="retryLoading" fill="outline" class="retry-button">
          Coba Lagi
        </ion-button>
      </div>

      <!-- Content State -->
      <div v-else>
        <!-- Card Fase Menstruasi -->
        <div class="card fase-card" :class="{'active-phase': hasActiveCycle}">
          <div class="card-content">
            <div class="text-content">
              <h4 class="card-title">Fase Menstruasi</h4>
              <div class="phase-info" v-if="cycleData && currentPhase">
                <p class="card-description">{{ getCurrentPhaseText() }}</p>
                <div class="phase-details" v-if="cycleDetails">
                  <p class="detail-item">Siklus Hari ke-{{ cycleDay }}</p>
                  <p class="detail-item">{{ getRemainingDaysText() }}</p>
                  <div class="progress-bar">
                    <div 
                      class="progress" 
                      :style="{ width: `${getPhaseProgressPercentage}%` }"
                    ></div>
                  </div>
                </div>
              </div>
              <p class="card-description" v-else>
                Mulai tracking periode menstruasimu
              </p>
              <ion-button 
                class="custom-button"
                @click="navigateToPhase"
                :disabled="!hasActiveCycle"
              >
                {{ getButtonText() }}
              </ion-button>
            </div>
            <img src="@/assets/images/reproductive.png" alt="Calendar" class="card-icon" />
          </div>
        </div>

        <!-- Card Kalender Menstruasi -->
        <div class="card calendar-card">
          <div class="card-content">
            <div class="text-content">
              <h4 class="card-title">Kalender Menstruasi</h4>
              <p class="card-description">
                {{ getCalendarText() }}
              </p>
              <ion-button 
                class="custom-button"
                @click="goToRiwayatMenstruasi"
              >
                CEK KALENDER
              </ion-button>
            </div>
            <img src="@/assets/images/menstrual-cup.png" alt="Calendar" class="card-icon" />
          </div>
        </div>

        <!-- Card Rekomendasi Nutrisi -->
        <div class="card nutrition-card">
          <div class="card-content">
            <div class="text-content">
              <h4 class="card-title">Rekomendasi Nutrisi</h4>
              <p class="card-description">
                {{ getNutritionText() }}
              </p>
              <ion-button 
                class="custom-button"
                @click="goToRekomendasiNutrisi"
              >
                CEK NUTRISI
              </ion-button>
            </div>
            <img src="@/assets/images/healthy-food.png" alt="Nutrition" class="card-icon" />
          </div>
        </div>
      </div>
    </div>

    <!-- Phase Navigation Modal -->
    <ion-modal 
      :is-open="showPhaseModal"
      @didDismiss="closePhaseModal"
      class="phase-modal"
    >
      <ion-content>
        <div class="modal-content">
          <h2>Pilih Fase yang Ingin Dilihat</h2>
          <div class="phase-list">
            <ion-item 
              v-for="phase in Object.values(PHASES)" 
              :key="phase.name"
              button
              @click="navigateToSpecificPhase(phase.route)"
              :disabled="!hasActiveCycle"
              :class="{'current-phase': isCurrentPhase(phase)}"
            >
              <ion-label>
                <h3>{{ phase.name }}</h3>
                <p>{{ phase.description }}</p>
              </ion-label>
              <ion-icon 
                :icon="chevronForward" 
                slot="end" 
                v-if="isCurrentPhase(phase)"
              ></ion-icon>
            </ion-item>
          </div>
          <ion-button expand="block" @click="closePhaseModal" class="close-button">
            Tutup
          </ion-button>
        </div>
      </ion-content>
    </ion-modal>
  </ion-content>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import { 
  IonContent, 
  IonButton, 
  IonSpinner,
  IonModal,
  IonItem,
  IonLabel,
  IonIcon,
  modalController,
  menuController 
} from '@ionic/vue';
import { 
  menuOutline, 
  notificationsOutline,
  alertCircleOutline,
  chevronForward
} from 'ionicons/icons';
import { useRouter } from 'vue-router';
import { periodTrackerService } from '@/services/periodTracker';
import { auth } from '@/services/firebase';

interface Phase {
  route: string;
  name: string;
  description: string;
  icon?: string;
  dayRange: {
    start: number;
    end: number;
  };
}

export default defineComponent({
  name: 'Homepage',
  components: {
    IonContent,
    IonButton,
    IonSpinner,
    IonModal,
    IonItem,
    IonLabel,
    IonIcon
  },
  setup() {
    const router = useRouter();
    const currentPhase = ref<Phase | null>(null);
    const userId = ref<string | undefined>(undefined);
    const userName = ref<string | undefined>(undefined);
    const cycleData = ref<any>(null);
    const cycleDay = ref<number>(0);
    const isLoading = ref(false);
    const error = ref<string | null>(null);
    const showPhaseModal = ref(false);

    const hasActiveCycle = computed(() => !!cycleData.value);
    const cycleDetails = computed(() => {
      if (!cycleData.value) return null;
      return {
        currentDay: cycleDay.value,
        totalDays: 28,
        remainingDays: 28 - cycleDay.value
      };
    });

    const PHASES: { [key: string]: Phase } = {
      MENSTRUATION: {
        route: '/fase-menstruasi',
        name: 'Fase Menstruasi',
        description: 'Fase menstruasi - Pelepasan lapisan rahim (Hari 1-7)',
        icon: '@/assets/images/reproductive.png',
        dayRange: {
          start: 1,
          end: 7
        }
      },
      FOLLICULAR: {
        route: '/fase-folikular',
        name: 'Fase Folikular',
        description: 'Fase folikular - Persiapan sel telur (Hari 8-12)',
        icon: '@/assets/images/reproductive.png',
        dayRange: {
          start: 8,
          end: 12
        }
      },
      OVULATION: {
        route: '/fase-ovulasi',
        name: 'Fase Ovulasi',
        description: 'Fase ovulasi - Pelepasan sel telur (Hari 13-16)',
        icon: '@/assets/images/reproductive.png',
        dayRange: {
          start: 13,
          end: 16
        }
      },
      LUTEAL: {
        route: '/fase-luteal',
        name: 'Fase Luteal',
        description: 'Fase luteal - Fase pasca ovulasi (Hari 17-28)',
        icon: '@/assets/images/reproductive.png',
        dayRange: {
          start: 17,
          end: 28
        }
      }
    };

    const calculatePhase = (cycleDay: number): Phase | null => {
      for (const phase of Object.values(PHASES)) {
        if (cycleDay >= phase.dayRange.start && cycleDay <= phase.dayRange.end) {
          return phase;
        }
      }
      return null;
    };

    const determineMenstrualPhase = async () => {
      if (!userId.value) return;

      isLoading.value = true;
      error.value = null;

      try {
        const today = new Date();
        const calendarData = await periodTrackerService.getCalendarData(
          userId.value,
          today.getMonth(),
          today.getFullYear()
        );

        if (!calendarData || calendarData.length === 0) {
          currentPhase.value = null;
          cycleData.value = null;
          return;
        }

        const sortedData = calendarData.sort((a, b) => 
          b.startDate.toDate().getTime() - a.startDate.toDate().getTime()
        );

        const currentCycle = sortedData[0];
        if (!currentCycle.startDate) {
          throw new Error('Invalid cycle data: missing start date');
        }

        const startDate = currentCycle.startDate.toDate();
        cycleDay.value = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        cycleData.value = currentCycle;

        currentPhase.value = calculatePhase(cycleDay.value);

        console.log('Current cycle day:', cycleDay.value);
        console.log('Current phase:', currentPhase.value?.name);

      } catch (err) {
        console.error('Error determining phase:', err);
        error.value = 'Gagal memuat data fase. Silakan coba lagi.';
        currentPhase.value = null;
        cycleData.value = null;
      } finally {
        isLoading.value = false;
      }
    };

    const getPhaseProgressPercentage = computed(() => {
      if (!currentPhase.value || !cycleDay.value) return 0;
      const { start, end } = currentPhase.value.dayRange;
      const totalDays = end - start + 1;
      const daysInPhase = cycleDay.value - start + 1;
      return Math.min(Math.round((daysInPhase / totalDays) * 100), 100);
    });

    const getCurrentPhaseText = () => {
      if (!currentPhase.value || !cycleData.value) {
        return 'Mulai tracking periode menstruasimu';
      }
      return currentPhase.value.description;
    };

    const getRemainingDaysText = () => {
      if (!cycleDetails.value) return '';
      return `${cycleDetails.value.remainingDays} hari tersisa dalam siklus ini`;
    };

    const getButtonText = () => {
      return hasActiveCycle.value ? 'LIHAT DETAIL FASE' : 'MULAI TRACKING';
    };

    const getPhaseIcon = () => {
      return currentPhase.value?.icon || '@/assets/images/reproductive.png';
    };

    const getCalendarText = () => {
      return hasActiveCycle.value
        ? 'Lihat dan kelola catatan siklus menstruasi Anda'
        : 'Mulai mencatat siklus menstruasi Anda';
    };

    const getNutritionText = () => {
      return hasActiveCycle.value
        ? `Rekomendasi nutrisi untuk fase ${currentPhase.value?.name.toLowerCase()}`
        : 'Temukan rekomendasi nutrisi sesuai fase siklus Anda';
    };

    const navigateToPhase = async () => {
      try {
        if (!hasActiveCycle.value) {
          await router.push('/riwayat-menstruasi');
          return;
        }

        if (currentPhase.value) {
          console.log('Navigating directly to:', currentPhase.value.route);
          await router.push(currentPhase.value.route);
        } else {
          showPhaseModal.value = true;
        }
      } catch (err) {
        console.error('Navigation error:', err);
        error.value = 'Gagal mengakses halaman fase. Silakan coba lagi.';
      }
    };

    const navigateToSpecificPhase = async (route: string) => {
      try {
        showPhaseModal.value = false;
        console.log('Navigating to specific phase:', route);
        await router.push(route);
      } catch (err) {
        console.error('Navigation error:', err);
        error.value = 'Gagal mengakses halaman fase. Silakan coba lagi.';
      }
    };

    const isCurrentPhase = (phase: Phase) => {
      return currentPhase.value?.route === phase.route;
    };

    const closePhaseModal = () => {
      showPhaseModal.value = false;
    };

    const openNotifications = () => {
      // Implement notifications handling
    };

    const retryLoading = async () => {
      await determineMenstrualPhase();
    };

    onMounted(async () => {
      if (auth.currentUser) {
        userId.value = auth.currentUser.uid;
        userName.value = auth.currentUser.displayName || undefined;
        await determineMenstrualPhase();
      }
    });

    watch(() => auth.currentUser, (newUser) => {
      if (newUser) {
        userId.value = newUser.uid;
        userName.value = newUser.displayName || undefined;
        determineMenstrualPhase();
      } else {
        currentPhase.value = null;
        cycleData.value = null;
        userId.value = undefined;
        userName.value = undefined;
      }
    });

    return {
      // Core state
      currentPhase,
      userName,
      cycleData,
      cycleDay,
      cycleDetails,
      hasActiveCycle,
      PHASES,
      
      // UI state
      isLoading,
      error,
      showPhaseModal,
      
      // Icons
      menuOutline,
      notificationsOutline,
      alertCircleOutline,
      chevronForward,
      
      // Helper functions
      getCurrentPhaseText,
      getRemainingDaysText,
      getButtonText,
      getPhaseIcon,
      getCalendarText,
      getNutritionText,
      isCurrentPhase,
      getPhaseProgressPercentage,
      
      // Navigation functions
      navigateToPhase,
      navigateToSpecificPhase,
      goToRiwayatMenstruasi: () => router.push('/riwayat-menstruasi'),
      goToRekomendasiNutrisi: () => router.push('/rekomendasi-nutrisi'),
      
      // Modal functions
      closePhaseModal,
      
      // Other functions
      openMenu: () => menuController.open(),
      openNotifications,
      retryLoading
    };
  }
});
</script>

<style scoped>
.content-background {
  --background: #ffffff;
  font-family: 'Poppins', sans-serif;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
}

.menu-icon, .notification-icon {
  font-size: 24px;
  color: #4A306D;
  cursor: pointer;
}

.title {
  margin: 0;
  color: #4A306D;
  font-size: 20px;
  font-weight: 600;
}

.container {
  padding: 0 20px;
}

.greeting {
  color: #4A306D;
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 4px 0;
}

.user-name {
  color: #4A306D;
}

.subtitle {
  color: #4A306D;
  font-size: 14px;
  margin: 0 0 24px 0;
}

/* Loading and Error States */
.loading-container, .error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  text-align: center;
  color: #4A306D;
}

.error-icon {
  font-size: 48px;
  color: #dc3545;
  margin-bottom: 16px;
}

.retry-button {
  margin-top: 16px;
  --color: #4A306D;
}

/* Card Styles */
.card {
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 16px;
  transition: transform 0.3s ease;
}

.card:active {
  transform: scale(0.98);
}

.fase-card {
  background: linear-gradient(135deg, rgba(175,169,210,0.8), rgba(255,227,241,0.8));
}

.calendar-card {
  background: linear-gradient(135deg, rgba(32,24,74,0.8), rgba(236,168,187,0.8));
}

.nutrition-card {
  background: linear-gradient(135deg, rgba(32,24,74,0.8), rgba(236,168,187,0.8));
}

.active-phase {
  border: 2px solid #4A306D;
}

.card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text-content {
  flex: 1;
  margin-right: 16px;
}

.card-title {
  color: #FFFFFF;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
}

.card-description {
  color: #FFFFFF;
  font-size: 14px;
  margin: 0 0 16px 0;
  line-height: 1.4;
}

/* Phase Details */
.phase-info {
  margin-bottom: 16px;
}

.phase-details {
  margin-top: 8px;
  padding: 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
}

.detail-item {
  color: #FFFFFF;
  font-size: 12px;
  margin: 4px 0;
}

/* Progress Bar */
.progress-bar {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  margin-top: 8px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: #FFFFFF;
  border-radius: 2px;
  transition: width 0.3s ease;
}

/* Button Styles */
.custom-button {
  --background: rgba(255, 255, 255, 0.2);
  --color: #FFFFFF;
  --border-radius: 20px;
  --padding-start: 16px;
  --padding-end: 16px;
  --padding-top: 8px;
  --padding-bottom: 8px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  margin: 0;
}

.custom-button:hover {
  --background: rgba(255, 255, 255, 0.3);
}

.custom-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.card-icon {
  width: 64px;
  height: 64px;
  object-fit: contain;
}

/* Modal Styles */
.phase-modal {
  --height: auto;
  --max-height: 90%;
  --border-radius: 16px;
}

.modal-content {
  padding: 20px;
}

.modal-content h2 {
  color: #4A306D;
  margin-bottom: 20px;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
}

.phase-list {
  margin-bottom: 20px;
}

.phase-list ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --inner-padding-end: 16px;
  margin-bottom: 8px;
  border-radius: 8px;
}

.current-phase {
  --background: rgba(74, 48, 109, 0.1);
  --border-color: #4A306D;
}

.close-button {
  margin-top: 16px;
  --background: #4A306D;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .greeting {
    font-size: 20px;
  }

  .subtitle {
    font-size: 13px;
  }

  .card-icon {
    width: 48px;
    height: 48px;
  }

  .card-title {
    font-size: 16px;
  }

  .card-description {
    font-size: 13px;
  }
}

@media (max-width: 360px) {
  .container {
    padding: 12px 16px;
  }

  .card {
    padding: 16px;
  }

  .card-title {
    font-size: 15px;
  }

  .card-description {
    font-size: 12px;
  }

  .custom-button {
    font-size: 11px;
  }

  .phase-details {
    padding: 6px;
  }

  .detail-item {
    font-size: 11px;
  }

  .card-icon {
    width: 40px;
    height: 40px;
  }
}
</style>