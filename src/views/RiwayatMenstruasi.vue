<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Riwayat Menstruasi</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="riwayat-container">
        <!-- View Mode -->
        <div v-if="!isEditing" class="view-mode">
          <div class="header">
            <div class="title-section">
              <h2>{{ MONTHS[currentMonth] }} {{ currentYear }}</h2>
              <div v-if="cycleData?.startDate" class="period-info">
                <p>Periode Aktif: {{ formatDisplayDate(cycleData.startDate.toDate()) }}</p>
              </div>
            </div>
            <div class="navigation">
              <ion-button fill="clear" @click="previousMonth">&lt;</ion-button>
              <ion-button class="edit-btn" @click="handleEdit" color="primary">
                Edit
              </ion-button>
              <ion-button fill="clear" @click="nextMonth">&gt;</ion-button>
            </div>
          </div>
          
          <div class="calendar-view">
            <div class="month-section">
              <div class="weekdays">
                <div v-for="day in DAYS_OF_WEEK" :key="day">{{ day }}</div>
              </div>
              <div class="days">
                <div 
                  v-for="day in daysInMonth" 
                  :key="day"
                  :class="getDayClasses(day)"
                  :style="getFirstDayStyle(day)"
                >
                  {{ day }}
                </div>
              </div>
            </div>

            <div class="legend">
              <div class="legend-item">
                <div class="circle period"></div>
                <span>Periode Saat Ini</span>
              </div>
              <div class="legend-item">
                <div class="circle predicted"></div>
                <span>Prediksi Periode</span>
              </div>
              <div class="legend-item">
                <div class="circle ovulation"></div>
                <span>Hari Ovulasi</span>
              </div>
              <div class="legend-item">
                <div class="circle fertile"></div>
                <span>Masa Subur</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Edit Mode -->
        <div v-else class="edit-mode">
          <CalendarComponent 
            @close="handleClose"
            :initialData="cycleData"
          />
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/vue';
import { Timestamp } from 'firebase/firestore';
import CalendarComponent from '@/components/CalendarComponent.vue';
import { periodTrackerService } from '@/services/periodTracker';
import { auth } from '@/services/firebase';

interface CycleData {
  startDate: Timestamp;
  predictions?: {
    ovulationDate: Timestamp;
    fertileWindowStart: Timestamp;
    fertileWindowEnd: Timestamp;
    predictedStartDate: Timestamp;
  };
}

const DAYS_OF_WEEK = ['M', 'S', 'S', 'R', 'K', 'J', 'S'];
const MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const PERIOD_DURATION = 7; // Durasi periode dalam hari

const isEditing = ref(false);
const currentDate = ref(new Date());
const currentYear = ref(currentDate.value.getFullYear());
const currentMonth = ref(currentDate.value.getMonth());
const cycleData = ref<CycleData | null>(null);

const userId = computed(() => auth.currentUser?.uid);

const daysInMonth = computed(() => {
  const date = new Date(currentYear.value, currentMonth.value + 1, 0);
  return Array.from({ length: date.getDate() }, (_, i) => i + 1);
});

// Navigation functions
const previousMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
};

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
};

// Watch for month/year changes
watch([currentMonth, currentYear], async () => {
  await loadPeriodData();
});

const handleEdit = () => {
  isEditing.value = true;
};

const handleClose = async () => {
  isEditing.value = false;
  await loadPeriodData();
};

const getFirstDayStyle = (day: number) => {
  if (day === 1) {
    const firstDay = new Date(currentYear.value, currentMonth.value, 1).getDay();
    const adjustedFirstDay = firstDay === 0 ? 7 : firstDay;
    return { gridColumnStart: adjustedFirstDay };
  }
  return {};
};

const isDateInRange = (date: Date, startDate: Date, endDate: Date): boolean => {
  const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const normalizedStart = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const normalizedEnd = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
  return normalizedDate >= normalizedStart && normalizedDate <= normalizedEnd;
};

const isPeriodDay = (date: Date): boolean => {
  if (!cycleData.value?.startDate) return false;
  
  const startDate = cycleData.value.startDate.toDate();
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + (PERIOD_DURATION - 1));
  
  return isDateInRange(date, startDate, endDate);
};

const isOvulationDay = (date: Date): boolean => {
  if (!cycleData.value?.predictions?.ovulationDate) return false;
  
  const ovulationDate = cycleData.value.predictions.ovulationDate.toDate();
  return isDateInRange(date, ovulationDate, ovulationDate);
};

const isFertileWindow = (date: Date): boolean => {
  if (!cycleData.value?.predictions?.fertileWindowStart || !cycleData.value?.predictions?.fertileWindowEnd) return false;
  
  const startDate = cycleData.value.predictions.fertileWindowStart.toDate();
  const endDate = cycleData.value.predictions.fertileWindowEnd.toDate();
  
  return isDateInRange(date, startDate, endDate);
};

const isPredictedPeriod = (date: Date): boolean => {
  if (!cycleData.value?.predictions?.predictedStartDate) return false;
  
  const startDate = cycleData.value.predictions.predictedStartDate.toDate();
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + (PERIOD_DURATION - 1));
  
  return isDateInRange(date, startDate, endDate);
};

const getDayClasses = (day: number) => {
  const date = new Date(currentYear.value, currentMonth.value, day);
  return {
    'period-day': isPeriodDay(date),
    'ovulation-day': isOvulationDay(date),
    'fertile-window': isFertileWindow(date),
    'predicted-period': isPredictedPeriod(date)
  };
};

const formatDisplayDate = (date: Date): string => {
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
};

const loadPeriodData = async () => {
  if (!userId.value) return;

  try {
    const calendarData = await periodTrackerService.getCalendarData(
      userId.value, 
      currentMonth.value, 
      currentYear.value
    );

    if (calendarData.length > 0) {
      const sortedData = calendarData.sort((a, b) => 
        b.startDate.toDate().getTime() - a.startDate.toDate().getTime()
      );

      cycleData.value = sortedData[0];
    } else {
      cycleData.value = null;
    }
  } catch (error) {
    console.error('Error loading period data:', error);
  }
};

onMounted(() => {
  loadPeriodData();
});
</script>

<style scoped>
.riwayat-container {
  padding: 16px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.navigation {
  display: flex;
  align-items: center;
  gap: 8px;
}

.calendar-view {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  font-weight: bold;
  color: #666666;
  margin-bottom: 8px;
  text-align: center;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  color: #000000;
}

.days div {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border-radius: 50%;
}

.period-day {
  background-color: #ff99cc;
}

.predicted-period {
  border: 2px solid #ff99cc;
}

.ovulation-day {
  border: 2px dashed #4a90e2;
}

.fertile-window {
  background-color: #b3d9ff;
}

.legend {
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.circle.period {
  background-color: #ff99cc;
}

.circle.predicted {
  border: 2px solid #ff99cc;
}

.circle.ovulation {
  border: 2px dashed #4a90e2;
}

.circle.fertile {
  background-color: #b3d9ff;
}

@media (max-width: 768px) {
  .legend {
    grid-template-columns: repeat(2, 1fr);
  }

  .days div {
    height: 35px;
    width: 35px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .days div {
    height: 30px;
    width: 30px;
    font-size: 12px;
  }
}
</style>