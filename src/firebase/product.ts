import { db } from "./firebaseConfig";
import {
  collection,
  deleteDoc,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  addDoc,
  updateDoc
} from "firebase/firestore";
import type { Product } from "../types/Product";

const productsRef = collection(db, "products");

export const getAllProducts = async (): Promise<Product[]> => {
  const snapshot = await getDocs(productsRef);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
};


export const getProductsByCategory = async (
  category: string
): Promise<Product[]> => {
  const q = query(productsRef, where("category", "==", category));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
};


export const getAllCategories = async (): Promise<string[]> => {
  const snapshot = await getDocs(productsRef);
  const categories = snapshot.docs.map(doc => (doc.data() as Product).category);
  return Array.from(new Set(categories)); // remove duplicates
};

  export const getProductById = async (id: string): Promise<Product | null> => {
  const docSnap = await getDoc(doc(db, "products", id));
  if (docSnap.exists()) return { id: docSnap.id, ...docSnap.data() } as Product;
  return null;
};

// // CREATE PRODUCT
export const createProduct = async (product: Omit<Product, "id">): Promise<string> => {
  const docRef = await addDoc(productsRef, product);
  return docRef.id;
};

// UPDATE PRODUCT
export const updateProduct = async (id: string, data: Partial<Omit<Product, "id">>) => {
  const docRef = doc(db, "products", id);
  await updateDoc(docRef, data);
};

// DELETE PRODUCT
export const deleteProduct = async (id: string) => {
  const docRef = doc(db, "products", id);
  await deleteDoc(docRef);
};
