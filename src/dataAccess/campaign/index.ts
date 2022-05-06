import { ICampaign } from "@types";
import { db } from "@utils";
import {
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useMutation, useQuery } from "react-query";

const collectionName = "campaigns";

const createCampaign = async (campanha: ICampaign) => {
  const target = doc(db, collectionName, campanha.slug);

  return await setDoc(target, campanha)
    .then((res) => {
      return res;
    })
    .catch((error) => error);
};

const findCampaignByID = async (id: string) => {
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

const findCampaigns = async (marca: string) => {
  const docRef = query(
    collectionGroup(db, collectionName),
    where("marca", "==", marca)
  );
  const querySnapshot = await getDocs(docRef);

  let list: ICampaign[] = [];
  querySnapshot.forEach((doc) => {
    list.push(doc.data() as ICampaign);
  });

  return list;
};

export function useCreateCampaign() {
  return useMutation(createCampaign);
}

export function useGetCampaignByID() {
  return useMutation(findCampaignByID);
}

export function useGetCampaigns(marca: string) {
  return useQuery("findCampaigns", () => findCampaigns(marca));
}
