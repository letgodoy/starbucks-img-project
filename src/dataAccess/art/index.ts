import { IArt } from "@types";
import { db } from "@utils";
import { doc, getDoc, getDocs, query, setDoc, where, collection, updateDoc } from "firebase/firestore";
import { useMutation, useQuery } from "react-query";

const collectionName = "arts";

const createArt = async (art: IArt) => {
  const target = doc(db, collectionName, art.id);

  return await setDoc(target, art)
    .then((res) => {
      return res;
    })
    .catch((error) => error);
};

const updateArt = async (art: IArt) => {
  const target = doc(db, collectionName, art.id);

  return await updateDoc(target, {...art})
    .then((res) => res)
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
  const docRef = query(
    collection(db, collectionName),
    where("marcaSlug", "==", marca)
  );
  const querySnapshot = await getDocs(docRef);

  let list: IArt[] = [];

  querySnapshot.forEach((doc) => {
    list.push(doc.data() as IArt);
  });

  return list;
};

export function useCreateArt() {
  return useMutation(createArt);
}

export function useUpdateArt() {
  return useMutation(updateArt);
}

export function useGetArtByID() {
  return useMutation(findArtByID);
}

export function useGetArts(marca: string) {
  return useQuery("findArts", () => findArts(marca));
}
