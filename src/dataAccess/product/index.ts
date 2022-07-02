import { IProduct } from "@types";
import { db } from "@utils";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useMutation, useQuery } from "react-query";

const collectionName = "products";

const createProduct = async (produto: IProduct) => {
  const target = doc(db, collectionName, produto.slug);

  return await setDoc(target, produto)
    .then((res) => {
      return res;
    })
    .catch((error) => error);
};

const findProductByID = async (id: string) => {
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

const findProducts = async (marca: any) => {
  const docRef = query(
    collection(db, collectionName),
    where("marcaSlug", "==", marca)
  );
  const querySnapshot = await getDocs(docRef);

  let list: IProduct[] = [];

  querySnapshot.forEach((doc) => {
    list.push(doc.data() as IProduct);
  });

  return list;
};

export function useCreateProduct() {
  return useMutation(createProduct);
}

export function useGetProductByID() {
  return useMutation(findProductByID);
}

export function useGetProducts(marca: any) {
  return useQuery("findProducts", () => findProducts(marca));
}
