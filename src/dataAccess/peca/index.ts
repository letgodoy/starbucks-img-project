import { IPiece } from "@types";
import { db } from "@utils";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { useMutation, useQuery } from "react-query";

const collectionName = "pieces";

const createPiece = async (piece: IPiece) => {
  const target = collection(db, collectionName);

  await addDoc(target, piece)
    .then((res) => {
      console.log("Document add", res);
      alert("Document add");
    })
    .catch((error) => error);
};

const findPieceByID = async (id: string) => {
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

const findPieces = async (marca: string) => {
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

export function useCreatePiece() {
  return useMutation(createPiece);
}

export function useGetPieceByID() {
  return useMutation(findPieceByID);
}

export function useGetPieces(marca: string) {
  return useQuery("findPieces", () => findPieces(marca));
}
