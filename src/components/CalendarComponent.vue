<template>
  <div class="calendar-container">
    <!-- Header Section -->
    <div class="header">
      <button class="close-btn" @click="closeCalendar">X</button>
      <div class="view-toggle">
        <button 
          @click="viewMode = 'month'" 
          :class="{ active: viewMode === 'month' }"
        >Bulan</button>
        <button 
          @click="viewMode = 'year'" 
          :class="{ active: viewMode === 'year' }"
        >Tahun</button>
      </div>
    </div>

    <!-- Month View -->
    <div v-if="viewMode === 'month'" class="month-view">
      <div class="current-year sticky-year">{{ currentYear }}</div>
      <div v-for="(month, index) in MONTHS" :key="index" class="month-section">
        <h2 class="month-title">{{ month }}</h2>
        <div class="weekdays">
          <div v-for="day in DAYS_OF_WEEK" :key="day">{{ day }}</div>
        </div>
        <div class="days">
          <div 
            v-for="day in getDaysInMonth(index)" 
            :key="day" 
            :style="getFirstDayStyle(day, index)"
            :class="getDayClasses(day, index)"
            @click="toggleSelection(day, index)"
          >
            {{ day }}
          </div>
        </div>
      </div>
    </div>

    <!-- Year View -->
    <div v-if="viewMode === 'year'" class="year-view">
      <div class="year-navigation">
        <button @click="changeYear(-1)">&lt;</button>
        <h2 class="bold">{{ currentYear }}</h2>
        <button @click="changeYear(1)">&gt;</button>
      </div>
      <div class="year-calendar">
        <div 
          v-for="(month, index) in MONTHS" 
          :key="index" 
          class="year-month" 
          @click="switchToMonthView(index)"
        >
          <h3>{{ month }}</h3>
          <div class="mini-calendar">
            <div class="weekdays">
              <div v-for="day in DAYS_OF_WEEK" :key="day" class="weekday">{{ day }}</div>
            </div>
            <div class="days mini">
              <div 
                v-for="day in getDaysInMonth(index)" 
                :key="day"
                :style="getFirstDayStyle(day, index)"
                :class="getDayClasses(day, index)"
              >
                {{ day }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Section -->
    <div v-if="viewMode === 'month'" class="footer">
      <button @click="cancel" class="btn-cancel">Batal</button>
      <button @click="savePeriodData" class="btn-save">Simpan</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { periodTrackerService } from '../services/periodTracker';
import { auth } from '../services/firebase';
import { Timestamp } from 'firebase/firestore';

interface CycleData {
  startDate: Timestamp;
  predictions?: {
    ovulationDate: Timestamp;
    fertileWindowStart: Timestamp;
    fertileWindowEnd: Timestamp;
    predictedStartDate: Timestamp;
  };
}

const props = defineProps<{
  initialData?: CycleData;
}>();

const DAYS_OF_WEEK = ['M', 'S', 'S', 'R', 'K', 'J', 'S'];
const MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const viewMode = ref<'month' | 'year'>('month');
const currentDate = ref(new Date());
const currentYear = ref(currentDate.value.getFullYear());
const currentMonth = ref(currentDate.value.getMonth());
const selectedDates = ref(new Set<string>());
const cycleData = ref<CycleData | null>(null);

const userId = computed(() => auth.currentUser?.uid);

// Watch untuk initialData
watch(() => props.initialData, (newData) => {
  if (newData) {
    cycleData.value = newData;
    const date = newData.startDate.toDate();
    currentMonth.value = date.getMonth();
    currentYear.value = date.getFullYear();
    const dateString = formatDate(date.getDate(), date.getMonth());
    selectedDates.value.clear();
    selectedDates.value.add(dateString);
  }
}, { immediate: true });

// Watch untuk perubahan bulan/tahun
watch([currentMonth, currentYear], async () => {
  await loadPeriodData();
});

const getDaysInMonth = (month: number): number[] => {
  const lastDay = new Date(currentYear.value, month + 1, 0).getDate();
  return Array.from({ length: lastDay }, (_, i) => i + 1);
};

const getFirstDayStyle = (day: number, month: number) => {
  if (day === 1) {
    const firstDay = new Date(currentYear.value, month, 1).getDay();
    const adjustedFirstDay = firstDay === 0 ? 7 : firstDay;
    return { gridColumnStart: adjustedFirstDay };
  }
  return {};
};

const formatDate = (day: number, month: number): string => {
  const monthStr = String(month + 1).padStart(2, '0');
  const dayStr = String(day).padStart(2, '0');
  return `${currentYear.value}-${monthStr}-${dayStr}`;
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
  endDate.setDate(endDate.getDate() + 6); // 7 hari periode (0-6)
  return isDateInRange(date, startDate, endDate);
};

const isOvulationDay = (date: Date): boolean => {
  if (!cycleData.value?.predictions?.ovulationDate) return false;
  const ovulationDate = cycleData.value.predictions.ovulationDate.toDate();
  return date.getTime() === ovulationDate.getTime();
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
  endDate.setDate(endDate.getDate() + 6);
  return isDateInRange(date, startDate, endDate);
};

const getDayClasses = (day: number, monthIndex: number) => {
  const date = new Date(currentYear.value, monthIndex, day);
  const dateString = formatDate(day, monthIndex);

  return {
    'selected': selectedDates.value.has(dateString),
    'period-day': isPeriodDay(date),
    'ovulation-day': isOvulationDay(date),
    'fertile-window': isFertileWindow(date),
    'predicted-period': isPredictedPeriod(date)
  };
};

const toggleSelection = (day: number, monthIndex: number) => {
  const dateString = formatDate(day, monthIndex);
  selectedDates.value.clear(); // Hanya boleh pilih satu tanggal
  selectedDates.value.add(dateString);
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
      cycleData.value = sortedData[0] as CycleData;
    }
  } catch (error) {
    console.error('Error loading period data:', error);
  }
};

const savePeriodData = async () => {
  if (!userId.value || selectedDates.value.size === 0) {
    alert('Pilih tanggal terlebih dahulu');
    return;
  }

  try {
    const dateString = Array.from(selectedDates.value)[0];
    const [year, month, day] = dateString.split('-').map(Number);
    const startDate = new Date(year, month - 1, day);
    
    await periodTrackerService.savePeriodCycle(userId.value, startDate);
    selectedDates.value.clear();
    await loadPeriodData();
    emit('close');
  } catch (error) {
    console.error('Error saving period data:', error);
    alert('Gagal menyimpan data');
  }
};

const changeYear = (increment: number) => {
  currentYear.value += increment;
};

const switchToMonthView = async (monthIndex: number) => {
  currentMonth.value = monthIndex;
  viewMode.value = 'month';
  const monthElement = document.querySelector(`.month-section:nth-child(${monthIndex + 2})`);
  monthElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const cancel = () => {
  selectedDates.value.clear();
  emit('close');
};

const closeCalendar = () => {
  emit('close');
};

const emit = defineEmits<{
  (e: 'close'): void;
}>();

onMounted(() => {
  if (props.initialData) {
    cycleData.value = props.initialData;
    const date = props.initialData.startDate.toDate();
    currentMonth.value = date.getMonth();
    currentYear.value = date.getFullYear();
    const dateString = formatDate(date.getDate(), date.getMonth());
    selectedDates.value.clear();
    selectedDates.value.add(dateString);
  } else {
    loadPeriodData();
  }
});
</script>

<style scoped>

.mini-calendar {
  font-size: 0.8em;
}

.mini-calendar .days {
  font-size: 0.7em;
}

.days.mini div {
  width: 20px;
  height: 20px;
}
.calendar-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  background-color: #ffffff;
  color: #000000;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: #4a4a6d;
  border-radius: 8px 8px 0 0;
}

.view-toggle {
  display: flex;
  gap: 8px;
  justify-content: center;
  width: 100%;
}

.header button {
  background-color: #e3a1c2;
  border: none;
  color: #000000;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  padding: 6px 12px;
  transition: background-color 0.2s;
}

.header button.active {
  background-color: #d480a8;
  color: #000000;
  font-weight: bold;
}

.header button:hover {
  background-color: #d480a8;
}

.close-btn {
  background: none !important;
  border: none;
  color: #ffffff !important;
  font-size: 18px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.close-btn:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

.current-year {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin: 16px 0;
  color: #000000;
}

.sticky-year {
  position: sticky;
  top: 0;
  background-color: #ffffff;
  z-index: 10;
  padding: 8px 0;
  border-bottom: 1px solid #ddd;
}

.month-view {
  overflow-y: auto;
  padding: 8px;
  background-color: #ffffff;
  flex: 1;
}

.month-section {
  margin-bottom: 24px;
  padding: 16px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.month-title {
  font-weight: bold;
  color: #000000;
  margin-bottom: 16px;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  font-weight: bold;
  color: #666666;
  margin-bottom: 8px;
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
  cursor: pointer;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  transition: all 0.2s;
}

.days div:hover {
  background-color: #f0f0f0;
}

.days div.selected {
  background-color: #e3a1c2;
  color: #000000;
  font-weight: bold;
}

.days div.period-day {
  background-color: #ff99cc;
  color: #000000;
}

.days div.ovulation-day {
  border: 2px dashed #4a90e2;
  color: #000000;
}

.days div.fertile-window {
  background-color: #b3d9ff;
  color: #000000;
}

.days div.predicted-period {
  border: 2px solid #ff99cc;
  color: #000000;
}

.year-view {
  padding: 16px;
  background-color: #ffffff;
}

.year-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.year-calendar {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.year-month {
  padding: 12px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;
}

.year-month:hover {
  transform: translateY(-2px);
}

.footer {
  display: flex;
  justify-content: space-between;
  padding: 12px;
  background-color: #4a4a6d;
  border-radius: 0 0 8px 8px;
}

.footer button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
}

.btn-cancel {
  background-color: #e3a1c2;
  color: #000000;
}

.btn-save {
  background-color: #d480a8;
  color: #000000;
}

/* Handling multiple markers */
.days div.period-day.ovulation-day {
  background-color: #ff99cc;
  border: 2px dashed #4a90e2;
}

.days div.predicted-period.fertile-window {
  background-color: #b3d9ff;
  border: 2px solid #ff99cc;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .year-calendar {
    grid-template-columns: repeat(2, 1fr);
  }

  .days div {
    width: 35px;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .year-calendar {
    grid-template-columns: repeat(1, 1fr);
  }

  .days div {
    width: 30px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
  }

  .header button {
    font-size: 14px;
    padding: 4px 8px;
  }
}

.days div:first-child {
  grid-column-start: var(--first-day-column, auto);
}
</style>