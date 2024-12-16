import { auth, createUserWithEmailAndPassword } from "../services/firebase";
import { alertController } from "@ionic/vue";

export class RegisterController {
  private router: any;

  constructor(router: any) {
    if (!router || typeof router.push !== "function") {
      throw new Error("Router is not properly initialized.");
    }
    this.router = router;
  }

  async register(name: string, username: string, email: string, password: string, confirmpass: string) {
    if (password !== confirmpass) {
      await this.showErrorPopup("Password dan konfirmasi password tidak cocok!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("Pengguna terdaftar:", user);

      this.router.push("/login"); 
    } catch (error: any) {
      console.error("Error pendaftaran:", error.message);
      await this.showErrorPopup("Terjadi kesalahan: " + error.message);
    }
  }

  private async showErrorPopup(message: string) {
    const alert = await alertController.create({
      header: "Pendaftaran Gagal",
      message: message,
      buttons: [{ text: "OK", cssClass: "alert-button" }],
      cssClass: "custom-alert",
    });

    await alert.present();
  }
}
