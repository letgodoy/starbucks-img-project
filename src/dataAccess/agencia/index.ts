import { IAgency } from "@types";
import { db } from "@utils";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { useMutation, useQuery } from "react-query";

const collectionName = "agencies";

const createAgency = async (agency: IAgency) => {
  const target = doc(db, collectionName, agency.cnpj);

  setDoc(target, agency)
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

export const findAgencyByID = async (id: string) => {
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

const findAgencies = async () => {
  const querySnapshot = await getDocs(collection(db, collectionName));

  return querySnapshot.docs.map((res) => res.data());
};

export function useCreateAgency() {
  return useMutation(createAgency);
}

export function useGetAgencyByID() {
  return useMutation(findAgencyByID);
}

export function useGetAgencies() {
  return useQuery("findAgencies", () => findAgencies());
}
