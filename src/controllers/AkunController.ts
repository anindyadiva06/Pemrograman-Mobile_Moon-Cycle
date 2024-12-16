import { getFirestore, doc, getDoc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { User } from "@/models/User";

const db = getFirestore();

export async function fetchUserData(userId: string): Promise<User | null> {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      return userDoc.data() as User;
    } else {
      console.log("Data pengguna tidak ditemukan.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data: ", error);
    return null;
  }
}

export async function updateUserData(userId: string, updatedData: Partial<User>): Promise<void> {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, updatedData);
    console.log("Data pengguna berhasil diperbarui.");
  } catch (error) {
    console.error("Error updating user data: ", error);
  }
}

export async function deleteUserData(userId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, "users", userId));
    console.log("Data pengguna berhasil dihapus.");
  } catch (error) {
    console.error("Error deleting user data: ", error);
  }
}
