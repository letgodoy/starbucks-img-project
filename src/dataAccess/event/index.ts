import { IEvent } from "@types";
import { db } from "@utils";
import { doc, getDoc, getDocs, query, setDoc, where, collection, updateDoc } from "firebase/firestore";
import { useMutation, useQuery } from "react-query";

const collectionName = "events";

const createEvent = async (event: IEvent) => {
  const target = doc(db, collectionName, event.id);

  return await setDoc(target, event)
    .then((res) => {
      return res;
    })
    .catch((error) => error);
};

const updateEvent = async (event: IEvent) => {
  const target = doc(db, collectionName, event.id);

  return await updateDoc(target, {...event})
    .then((res) => res)
    .catch((error) => error);
};

const findEventByID = async (id: string) => {
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

const findEvents = async (marca: string) => {
  const docRef = query(
    collection(db, collectionName),
    where("marcaSlug", "==", marca)
  );
  const querySnapshot = await getDocs(docRef);

  let list: IEvent[] = [];

  querySnapshot.forEach((doc) => {
    list.push(doc.data() as IEvent);
  });

  return list;
};

export function useCreateEvent() {
  return useMutation(createEvent);
}

export function useUpdateEvent() {
  return useMutation(updateEvent);
}

export function useGetEventByID(id: string) {
  return useQuery("findEventByID", () => findEventByID(id));
}

export function useGetEvents(marca: string) {
  return useQuery("findEvents", () => findEvents(marca));
}
