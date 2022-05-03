import { IPhotographer } from "@types";
import { db } from "@utils";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { useMutation, useQuery } from "react-query";

const collectionName = "photographers";

const createPhotographer = async (photographer: IPhotographer) => {
  const target = doc(db, collectionName, photographer.cnpj);

  setDoc(target, photographer)
    .then((res) => res)
    .catch((error) => error);
};

export const findPhotographerByID = async (id: string) => {
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

const findPhotographers = async () => {
  const querySnapshot = await getDocs(collection(db, collectionName));

  return querySnapshot.docs.map((res) => res.data());
};

export function useCreatePhotographer() {
  return useMutation(createPhotographer);
}

export function useGetPhotographerByID() {
  return useMutation(findPhotographerByID);
}

export function useGetPhotographers() {
  return useQuery("findPhotographers", () => findPhotographers());
}
