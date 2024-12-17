
import { RegisterModel } from "../models/RegisterModel";
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

  async register(registerModel: RegisterModel) {
    const validation = registerModel.validate();
    if (!validation.valid) {
      await this.showErrorPopup(validation.message);
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registerModel.email,
        registerModel.password
      );
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
