import { db, auth } from './firebaseConfig';
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { deleteUser } from 'firebase/auth';

export interface UserProfile {
  uid: string;
  email: string | null;
  name?: string;
  address?: string;
  createdAt: Date;
}

export const createUserProfile = async (uid: string, email: string | null) => {
  const userRef = doc(db, "users", uid);
  await setDoc(userRef, {
    uid,
    email,
    createdAt: new Date(),
  });
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const userRef = doc(db, "users", uid);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    return docSnap.data() as UserProfile;
  }
  return null;
};

export const updateUserProfile = async (uid: string, data: Partial<UserProfile>) => {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, data);
};

export const deleteUserAccount = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("No user logged in");

  await deleteDoc(doc(db, "users", user.uid));

  await deleteUser(user);
};
