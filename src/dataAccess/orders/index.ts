import { IOrder } from "@types";
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

const collectionName = "orders";

const createOrder = async (order: IOrder) => {
  const target = doc(db, collectionName, order.id);

  return await setDoc(target, order)
    .then((res) => {
      console.log(res)
      return res;
    })
    .catch((error) => error);
};

const findOrderByID = async (id: string) => {
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

const findOrders = async (marca: string) => {
  const docRef = query(
    collection(db, collectionName),
    where("marcaSlug", "==", marca)
  );
  const querySnapshot = await getDocs(docRef);

  let list: IOrder[] = [];
  querySnapshot.forEach((doc) => {
    list.push(doc.data() as IOrder);
  });

  return list;
};

export function useCreateOrder() {
  return useMutation(createOrder);
}

export function useGetOrderByIDAsync() {
  return useMutation(findOrderByID);
}

export function useGetOrderByID(id: string) {
  return useQuery("findOrderByID", () => findOrders(id));
}

export function useGetOrders(marca: string) {
  return useQuery("findOrders", () => findOrders(marca));
}
