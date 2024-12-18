import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { User } from "@/models/User";

const db = getFirestore();

export async function fetchUserData(userId: string): Promise<User | null> {
  if (!userId) {
    console.error("Error: userId tidak valid.");
    return null;
  }
  try {
    const userDoc = await getDoc(doc(db, "User", userId));
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
  if (!userId) {
    console.error("Error: userId tidak valid.");
    return;
  }
  try {
    const userRef = doc(db, "User", userId);
    await updateDoc(userRef, updatedData);
    console.log("Data pengguna berhasil diperbarui.");
  } catch (error) {
    console.error("Error updating user data: ", error);
  }
}
