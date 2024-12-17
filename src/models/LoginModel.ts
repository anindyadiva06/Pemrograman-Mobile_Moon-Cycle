export class LoginModel {
    email: string;
    password: string;
  
    constructor(email: string = "", password: string = "") {
      this.email = email;
      this.password = password;
    }
  
    // Validasi apakah email dan password sudah diisi
    validate(): { valid: boolean; message: string } {
      if (!this.email || !this.password) {
        return { valid: false, message: "Email dan password harus diisi!" };
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
  
