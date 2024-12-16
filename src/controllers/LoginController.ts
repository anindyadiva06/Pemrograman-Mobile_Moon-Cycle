// controllers/LoginController.ts
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { alertController } from "@ionic/vue";
import firebaseApp from "@/services/firebase"; // Firebase konfigurasi

export default class LoginController {
  static async login(email: string, password: string, router: any) {
    const auth = getAuth(firebaseApp); // Inisialisasi Firebase Authentication
    try {
      // Proses login ke Firebase
      await signInWithEmailAndPassword(auth, email, password);

      // Redirect ke halaman homepage jika berhasil
      console.log("Login berhasil!");
      router.push("/homepage");
    } catch (error: any) {
      let errorMessage = "Email atau password tidak sesuai!";

      // Tangkap kode error Firebase
      if (error.code === "auth/user-not-found") {
        errorMessage = "Akun tidak ditemukan. Silakan periksa email Anda!";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Password salah. Silakan coba lagi!";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Format email tidak valid!";
      }

      console.error("Error login:", error.code, error.message);
      this.showErrorPopup(errorMessage);
    }
  }

  static async showErrorPopup(message: string) {
    const alert = await alertController.create({
      header: "Login Gagal",
      message: message,
      buttons: ["OK"],
      cssClass: "custom-alert",
    });
    await alert.present();
  }
}
