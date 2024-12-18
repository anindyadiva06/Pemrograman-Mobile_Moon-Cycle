import { getAuth, signOut } from 'firebase/auth';
import { Router } from 'vue-router';
import firebaseApp from './firebase';

export default class AuthService {
  static async logout(router: Router) {
    try {
      const auth = getAuth(firebaseApp);
      await signOut(auth);
      localStorage.removeItem('username');
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
}