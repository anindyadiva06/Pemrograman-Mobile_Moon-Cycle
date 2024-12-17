export class RegisterModel  {
    name: string;
    username: string;
    email: string;
    password: string;
    confirmpass: string;
  
    constructor(
      name: string = "",
      username: string = "",
      email: string = "",
      password: string = "",
      confirmpass: string = ""
    ) {
      this.name = name;
      this.username = username;
      this.email = email;
      this.password = password;
      this.confirmpass = confirmpass;
    }
  
    // Validasi apakah semua input telah terisi
    validate(): { valid: boolean; message: string } {
      if (!this.name || !this.username || !this.email || !this.password || !this.confirmpass) {
        return { valid: false, message: "Semua kolom harus diisi!" };
      }
      if (this.password !== this.confirmpass) {
        return { valid: false, message: "Password dan konfirmasi password tidak cocok!" };
      }
      if (!this.isValidEmail(this.email)) {
        return { valid: false, message: "Format email tidak valid!" };
      }
      return { valid: true, message: "" };
    }
  
    // Validasi format email
    private isValidEmail(email: string): boolean {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  }
  