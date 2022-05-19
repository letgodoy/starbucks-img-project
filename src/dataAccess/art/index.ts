import { IArt } from "@types";
import { db } from "@utils";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useMutation, useQuery } from "react-query";

const collectionName = "arts";

const createArt = async (art: IArt) => {
  const target = doc(db, collectionName, art.id);

  return await setDoc(target, art)
    .then((res) => {
      console.log(res)
      return res;
    })
    .catch((error) => error);
};

const findArtByID = async (id: string) => {
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

const findArts = async (marca: string) => {
  const docRef = doc(db, collectionName, marca);
  const querySnapshot = await getDoc(docRef);

  if (querySnapshot.exists()) {
    return querySnapshot.data()?.campaigns;
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return {};
  }
};

export function useCreateArt() {
  return useMutation(createArt);
}

export function useGetArtByID() {
  return useMutation(findArtByID);
}

export function useGetArts(marca: string) {
  return useQuery("findArts", () => findArts(marca));
}
