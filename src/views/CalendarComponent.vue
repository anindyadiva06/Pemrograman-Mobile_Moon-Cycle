<template>
  <div class="calendar-container">
    <!-- Header Section -->
    <div class="header">
      <button class="close-btn" @click="closeCalendar">X</button>
      <div class="view-toggle">
        <button @click="viewMode = 'month'" :class="{ active: viewMode === 'month' }">Bulan</button>
        <button @click="viewMode = 'year'" :class="{ active: viewMode === 'year' }">Tahun</button>
      </div>
    </div>

    <!-- Month View -->
    <div v-if="viewMode === 'month'" class="month-view">
      <div class="current-year sticky-year">{{ currentYear }}</div>
      <div v-for="(month, index) in months" :key="index" class="month-section">
        <h2 class="month-title">{{ month }}</h2>
        <div class="weekdays">
          <div v-for="day in daysOfWeek" :key="day">{{ day }}</div>
        </div>
        <div class="days">
          <div 
            v-for="day in getDaysInMonth(index, currentYear)" 
            :key="day" 
            :style="{ gridColumnStart: day === 1 ? getFirstDayOfMonth(index, currentYear) + 1 : '' }"
            :class="{ selected: isSelected(day, index - currentMonth) }"
            @click="toggleSelection(day, index - currentMonth)"
          >
            {{ day }}
          </div>
        </div>
      </div>
    </div>

    <!-- Year View -->
    <div v-if="viewMode === 'year'" class="year-view">
      <div class="year-navigation">
        <button @click="currentYear--">&lt;</button>
        <h2 class="bold">{{ currentYear }}</h2>
        <button @click="currentYear++">&gt;</button>
      </div>
      <div class="year-calendar">
        <div v-for="(month, index) in months" :key="index" class="year-month" @click="switchToMonthView(index)">
          <h3 class="bold">{{ month }}</h3>
          <div class="weekdays">
            <div v-for="day in daysOfWeek" :key="day" class="weekday">{{ day }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Section (Only for Month View) -->
    <div v-if="viewMode === 'month'" class="footer">
      <button @click="cancel">Batal</button>
      <button @click="save">Simpan</button>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';

// State
const viewMode = ref('month');
const currentDate = ref(new Date());
const currentYear = ref(currentDate.value.getFullYear());
const currentMonth = ref(currentDate.value.getMonth());
const daysOfWeek = ['M', 'S', 'S', 'R', 'K', 'J', 'S'];
const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

const selectedDates = ref(new Set());

// Methods
const getDaysInMonth = (month, year) => {
  const date = new Date(year, month + 1, 0);
  return Array.from({ length: date.getDate() }, (_, i) => i + 1);
};

const getFirstDayOfMonth = (month, year) => {
  const date = new Date(year, month, 1);
  return date.getDay(); // Returns 0 (Sunday) to 6 (Saturday)
};

const isSelected = (day, monthOffset) => {
  const month = (currentMonth.value + monthOffset + 12) % 12;
  const date = `${currentYear.value}-${month}-${day}`;
  return selectedDates.value.has(date);
};

const toggleSelection = (day, monthOffset) => {
  const month = (currentMonth.value + monthOffset + 12) % 12;
  const date = `${currentYear.value}-${month}-${day}`;
  if (selectedDates.value.has(date)) {
    selectedDates.value.delete(date);
  } else {
    selectedDates.value.add(date);
  }
};

const closeCalendar = () => {
  alert('Tutup Kalender');
};

const cancel = () => {
  selectedDates.value.clear();
};

const save = () => {
  console.log('Selected Dates:', Array.from(selectedDates.value));
};

const switchToMonthView = async (monthIndex) => {
  currentMonth.value = monthIndex;
  viewMode.value = 'month';
  await nextTick();
  const monthElement = document.querySelector(`.month-section:nth-child(${monthIndex + 1})`);
  if (monthElement) {
    monthElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};
</script>

<style scoped>
/* Container Styles */
.calendar-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: #4a4a6d;
  color: white;
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
  color: white;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  padding: 6px 12px;
}

.header button.active {
  background-color: #d480a8;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
}

.current-year {
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin: 16px 0;
}

.sticky-year {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 10;
  padding: 8px 0;
  border-bottom: 1px solid #ddd;
}

.bold {
  font-weight: bolder;
}

/* Year View */
.year-view {
  padding: 8px;
}

.year-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px;
}

.year-navigation button {
  background-color: #e3a1c2;
  border: none;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
}

.year-calendar {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.year-month {
  background: #f5f5f5;
  padding: 12px;
  border-radius: 6px;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  font-weight: bold;
  color: #6a0dad;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  font-weight: bold;
  color: pink;
  margin-top: 8px;
}

/* Month View */
.month-view {
  overflow-y: scroll;
  padding: 8px;
}

.month-section {
  margin-bottom: 24px;
  text-align: center;
}

.month-title {
  font-weight: bolder;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  font-weight: bold;
  color: #d480a8;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.days div {
  padding: 8px;
  text-align: center;
  cursor: pointer;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  line-height: 40px;
}

.days div.selected {
  background-color: #e3a1c2;
  color: white;
}

/* Footer */
.footer {
  display: flex;
  justify-content: space-between;
  padding: 12px;
  background-color: #4a4a6d;
  color: white;
  margin-top: auto;
}

.footer button {
  background-color: #e3a1c2;
  color: white;
  border: none;
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 4px;
  width: auto;
}
</style>
