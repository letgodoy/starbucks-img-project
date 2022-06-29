import { IImage } from "@types";
import { db } from "@utils";
import { doc, getDoc, getDocs, query, setDoc, where, collection, updateDoc } from "firebase/firestore";
import { useMutation, useQuery } from "react-query";

const collectionName = "images";

const createImage = async (image: IImage) => {
  const target = doc(db, collectionName, image.id);

  setDoc(target, image)
    .then((res) => res)
    .catch((error) => error);
};

const updateImage = async (image: IImage) => {
  const target = doc(db, collectionName, image.id);

  updateDoc(target, {...image})
    .then((res) => res)
    .catch((error) => error);
};

const findImageByID = async (id: string) => {
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

const findImages = async (marca: string) => {
  const docRef = query(
    collection(db, collectionName),
    where("marcaSlug", "==", marca)
  );
  const querySnapshot = await getDocs(docRef);

  let list: IImage[] = [];
  querySnapshot.forEach((doc) => {
    list.push(doc.data() as IImage);
  });

  return list;
};

export function useCreateImage() {
  return useMutation(createImage);
}

export function useUpdateImage() {
  return useMutation(updateImage);
}

export function useGetImageByID(id: string) {
  return useQuery("findImageByID", () => findImageByID(id));
}

export function useGetImages(marca: string) {
  return useQuery("findImages", () => findImages(marca));
}
