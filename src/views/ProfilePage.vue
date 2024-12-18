<template>
  <ion-page>
    <ion-content>
      <!-- Tombol Close -->
      <div class="close-button" @click="closePage">
        <img src="@/assets/images/close.png" alt="Close Icon" />
      </div>

      <!-- Foto Profil -->
      <div class="profile-container">
        <img src="@/assets/images/Profile.png" alt="User Icon" class="profile-icon" />
      </div>

      <!-- Judul Halaman -->
      <h2 class="title">Edit Info Profil</h2>

      <!-- Form Edit Info -->
      <ion-list class="info-list">
        <ion-item>
          <ion-label position="stacked">Email</ion-label>
          <ion-input
            :value="user.email"
            @ionInput="(e: CustomEvent) => user.email = e.detail.value"
            type="email"
            placeholder="Masukkan Email"
          ></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Nama</ion-label>
          <ion-input
            :value="user.name"
            @ionInput="(e: CustomEvent) => user.name = e.detail.value"
            type="text"
            placeholder="Masukkan Nama"
          ></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Username</ion-label>
          <ion-input
            :value="user.username"
            @ionInput="(e: CustomEvent) => user.username = e.detail.value"
            type="text"
            placeholder="Masukkan Username"
          ></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Kata Sandi</ion-label>
          <ion-input
            :value="user.password"
            @ionInput="(e: CustomEvent) => user.password = e.detail.value"
            type="password"
            placeholder="Masukkan Kata Sandi"
          ></ion-input>
        </ion-item>
      </ion-list>

      <!-- Tombol Batal dan Simpan -->
      <div class="button-container">
        <button fill="clear" class="batal-button" @click="cancel">Batal</button>
        <button class="simpan-button" @click="save">Simpan</button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { fetchUserData, updateUserData } from "@/controllers/AkunController";
import { alertController } from "@ionic/vue"; // Import alertController

export default defineComponent({
  name: "ProfilePage",
  setup() {
    const router = useRouter();

    // Data user yang akan diisi
    const user = reactive({
      email: "",
      name: "",
      username: "",
      password: "",
    });

    // Fetch data user dari session login
    const fetchUser = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        const userData = await fetchUserData(userId);
        console.log("Data pengguna dari Firestore:", userData); // Debugging

        if (userData) {
          // Pastikan data reaktif diperbarui
          Object.assign(user, {
            email: userData.email || "",
            name: userData.name || "",
            username: userData.username || "",
            password: userData.password || "",
          });
          console.log("Setelah update user:", user); // Tambahkan log ini
        } else {
          console.log("Data pengguna tidak ditemukan.");
        }
      }
    };

    // Fungsi simpan perubahan
    const save = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        const trimmedUser = {
          email: user.email.trim(),
          name: user.name.trim(),
          username: user.username.trim(),
          password: user.password.trim(),
        };

        if (!trimmedUser.email || !trimmedUser.name || !trimmedUser.username || !trimmedUser.password) {
          await showErrorPopup("Semua kolom harus diisi!");
          return;
        }

        try {
          await updateUserData(userId, trimmedUser);

          // Update email di localStorage agar AkunPage mendeteksi perubahan
          localStorage.setItem("username", trimmedUser.email);

          await showSuccessPopup();
          router.push("/akun");
        } catch (error) {
          console.error("Error updating profile:", error);
          await showErrorPopup("Terjadi kesalahan saat memperbarui profil.");
        }
      }
    };

    // Fungsi popup error
    const showErrorPopup = async (message: string) => {
      const alert = await alertController.create({
        header: "Error",
        message: message,
        buttons: ["OK"],
      });
      await alert.present();
    };


    // Tampilkan popup berhasil
    const showSuccessPopup = async () => {
      const alert = await alertController.create({
        header: "Berhasil",
        message: "Profil berhasil diperbarui!",
        buttons: ["OK"],
      });
      await alert.present();
    };

    onMounted(() => {
      fetchUser();
    });

    const closePage = () => router.push("/akun");
    const cancel = () => router.push("/akun");

    return { user, closePage, cancel, save };
  },
});
</script>

<style scoped>
/* Tombol Close */
.close-button {
  position: absolute;
  top: 15px;
  left: 15px;
  cursor: pointer;
  z-index: 10;
}

.close-button img {
  width: 30px;
  height: 30px;
}

/* Container Foto Profil */
.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
}

.profile-icon {
  width: 100px;
  height: 100px;
}

/* Judul Halaman */
.title {
  text-align: center;
  font-family: "Poppins", sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  margin-top: 10px;
  color: #333;
}

/* List Info */
.info-list {
  margin: 20px;
}

ion-item {
  --padding-start: 10px;
  --padding-end: 10px;
  font-family: "Poppins", sans-serif;
}

/* Tombol Batal dan Simpan */
.button-container {
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 20px;
  left: 20px;
  right: 20px;
}

.batal-button {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  color: #8a4fd3 !important;
  background-color: #f2e8ff !important;
  border-radius: 18px;
  padding: 0.7rem;
}

.simpan-button {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  background-color: #8a4fd3 !important;
  color: #fff !important;
  border-radius: 18px;
  padding: 0.7rem;
}
</style>
