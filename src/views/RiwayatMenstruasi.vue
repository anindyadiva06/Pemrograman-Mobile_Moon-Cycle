<template>
    <CalendarComponent />
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import CalendarComponent from '@/components/CalendarComponent.vue';
  
  export default defineComponent({
    name: 'RiwayatMenstruasi',
    components: { CalendarComponent },
  });
  </script>
  