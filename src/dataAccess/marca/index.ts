import { IBrand } from "@types";
import { auth, db } from "@utils";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useMutation, useQuery } from "react-query";

const collectionName = "brands";

const createBrand = async (marca: IBrand) => {

  console.log(marca)

  const brand = doc(db, collectionName, marca.name);
  
  setDoc(brand, marca)
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

const findBrandByID = async (id: string) => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());

    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return {};
  }
};

const findBrands = async () => {
  const querySnapshot = await getDocs(collection(db, collectionName));

  return querySnapshot.docs.map(res => res.data())
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
