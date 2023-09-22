import {
    collection,
    addDoc,
    doc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
  } from "firebase/firestore";
  import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";
  import { db } from "./firebase";
  
  export const AddDoc = async (collectionName, data) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), data);
      return docRef.id;
    } catch (e) {
      console.log(e);
    }
  };
  
  export const UpdateDoc = async (collectionName, docId, data) => {
    try {
      const docRef = await updateDoc(doc(db, collectionName, docId), data);
      return docRef.id;
    } catch (e) {
      console.log(e);
    }
  };
  
  export const FileUpload = async (file, path) => {
    try {
      const storage = getStorage();
      const storageRef = ref(storage, path);
      const uploadTask = uploadBytesResumable(storageRef, file);
      const snapshot = await uploadTask;
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (e) {
      console.log(e);
    }
  };
  
  export const GetDoc = async (collectionName, docId) => {
    try {
      const docRef = await getDoc(doc(db, collectionName, docId));
      if (docRef.exists()) {
        return docRef.data();
      } else {
        console.log("No such document!");
      }
    } catch (e) {
      console.log(e);
    }
  };
  
  export const GetCollection = async (collectionName) => {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  };
  
  export const DelDoc = async (collectionName, docId) => {
    try {
      await deleteDoc(doc(db, collectionName, docId));
      alert("Document successfully deleted!");
    } catch (e) {
      console.log(e);
    }
  };