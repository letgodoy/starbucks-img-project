import { IBrand } from "@types";
import { db } from "@utils";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { useMutation, useQuery } from "react-query";

const collectionName = "brands";

const createBrand = async (marca: IBrand) => {
  const target = doc(db, collectionName, marca.slug);

  setDoc(target, marca)
    .then((res) => res)
    .catch((error) => error);
};

const findBrandByID = async (id: string) => {
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

const findBrands = async () => {
  const querySnapshot = await getDocs(collection(db, collectionName));

  return querySnapshot.docs.map((res) => res.data());
};

export function useCreateBrand() {
  return useMutation(createBrand);
}

export function useGetBrandByID() {
  return useMutation(findBrandByID);
}

export function useGetBrands() {
  return useQuery("findBrands", () => findBrands());
}
