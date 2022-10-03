import { db } from "@utils";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { useMutation, useQuery } from "react-query";
import { IProvider } from "@types";

const collectionName = "providers";

const createProvider = async (provider: IProvider) => {
  const target = doc(db, collectionName, provider.cnpj);

  setDoc(target, provider)
    .then((res) => res)
    .catch((error) => error);
};

export const findProviderByID = async (id: string) => {
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

const findProviders = async () => {
  const querySnapshot = await getDocs(collection(db, collectionName));

  return querySnapshot.docs.map((res) => res.data());
};

export function useCreateProvider() {
  return useMutation(createProvider);
}

export function useGetProviderByID() {
  return useMutation(findProviderByID);
}

export function useGetProviders() {
  return useQuery("findProviders", () => findProviders());
}
