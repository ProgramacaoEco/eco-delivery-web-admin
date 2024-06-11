import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";

import { Collections } from "./collections";
import { app } from "@/firebase-config";

const db = getFirestore(app);

async function get(currentCollection: Collections) {
  try {
    const snapshot = await getDocs(collection(db, currentCollection));
    const data = snapshot.docs.map((doc) => doc.data());
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getBy(id: string, currentCollection: Collections) {
  try {
    const docRef = doc(db, currentCollection, id);
    const snapshot = await getDoc(docRef);
    return snapshot.data();
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function remove(id: string, currentCollection: Collections) {
  try {
    const docRef = doc(db, currentCollection, id);
    const result = await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function set<T extends BaseModel>(
  currentCollection: Collections,
  data: T
) {
  try {
    await setDoc(doc(db, currentCollection, data._id), data);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export const FirestoreHelper = { get, getBy, set, remove };
