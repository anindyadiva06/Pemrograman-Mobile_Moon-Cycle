// src/controllers/HomepageController.ts
import { useRouter } from "vue-router";

export class HomePageController {
  private router;

  constructor() {
    this.router = useRouter();
  }

  // Navigasi ke halaman Kalender
  goToCalendar() {
    this.router.push("/calendar");
  }

  // Navigasi ke halaman Nutrisi
  goToNutrition() {
    this.router.push("/nutrition");
  }
}
