import { db } from "./firebaseConfig";
import { collection, getDocs, query, where, addDoc, orderBy } from "firebase/firestore";
import { type CartItem } from "../types/CartItem";

export interface Order {
  id?: string;
  userId: string;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  createdAt: number;
}

// Function to create a new order
export const createOrder = async (userId: string, items: CartItem[]) => {
  if (!userId) throw new Error("User not logged in");

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const ordersRef = collection(db, "orders");

  const docRef = await addDoc(ordersRef, {
    userId,
    items,
    totalItems,
    totalPrice,
    createdAt: Date.now(),
  });

  return docRef.id;
};

export const getUserOrders = async (userId: string): Promise<Order[]> => {
  const ordersRef = collection(db, "orders");
  const q = query(ordersRef, where("userId", "==", userId), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Order[];
};