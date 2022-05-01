import { IImage } from "@types";
import { db } from "@utils";
import {
  addDoc,
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useMutation, useQuery } from "react-query";

const collectionName = "images";

const createImage = async (image: IImage) => {
  const target = collection(db, collectionName);

  await addDoc(target, image)
    .then((res) => {
      console.log("Document add", res);
      alert("Document add");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode + ": " + errorMessage);
    });
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
    collectionGroup(db, collectionName),
    where("marca", "==", marca)
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

export function useGetImageByID() {
  return useMutation(findImageByID);
}

export function useGetImages(marca: string) {
  return useQuery("findImages", () => findImages(marca));
}
