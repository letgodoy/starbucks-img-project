import { IStore } from "@types";
import { db } from "@utils";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { useMutation, useQuery } from "react-query";

const collectionName = "stores";

const createStore = async (store: IStore) => {
  const target = doc(db, collectionName, store.cnpj);

  setDoc(target, store)
    .then((res) => {
      console.log("Document written with ID: ", res);
      alert("Document written with ID: " + res);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode + ": " + errorMessage);
    });
};

const findStoreByID = async (id: string) => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return {};
  }
};

const findStores = async () => {
  const querySnapshot = await getDocs(collection(db, collectionName));

  return querySnapshot.docs.map((res) => res.data());
};

export function useCreateStore() {
  return useMutation(createStore);
}

export function useGetStoreByID() {
  return useMutation(findStoreByID);
}

export function useGetStores() {
  return useQuery("findStores", () => findStores());
}
