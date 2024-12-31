import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";

import { app } from "@/firebase-config";
import { Collections } from "./collections";
import { BaseModel } from "./model/baseModel";

const db = getFirestore(app);

async function get(currentCollection: Collections) {
  try {
    const snapshot = await getDocs(collection(db, currentCollection));
    const data = snapshot.docs.map((doc) => doc.data());
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getBy(id: string, currentCollection: Collections) {
  try {
    const docRef = doc(db, currentCollection, id);
    const snapshot = await getDoc(docRef);
    return snapshot.data();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function remove(id: string, currentCollection: Collections) {
  try {
    const docRef = doc(db, currentCollection, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error(error);
    return false;
    throw error;
  }
}

async function set<T extends BaseModel>(
  currentCollection: Collections,
  data: T
) {
  try {
    await setDoc(doc(db, currentCollection, data.id), data.toJson());
    return true;
  } catch (error) {
    console.error(error);
    return false;
    throw error;
  }
}

export const FirestoreHelper = { get, getBy, set, remove };
