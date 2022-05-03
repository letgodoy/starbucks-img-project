import { ICreateCampaign } from "@types";
import { db } from "@utils";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { useMutation, useQuery } from "react-query";

const collectionName = "brands";

const createCampaign = async (campanha: ICreateCampaign) => {
  const target = doc(db, collectionName, campanha.marca);

  await updateDoc(target, {
    campaigns: arrayUnion(campanha),
  })
    .then((res) => {
      console.log("Document add", res);
      alert("Document add");
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

export function useCreateCampaign() {
  return useMutation(createCampaign);
}

export function useGetCampaignByID() {
  return useMutation(findCampaignByID);
}

export function useGetCampaigns(marca: string) {
  return useQuery("findCampaigns", () => findCampaigns(marca));
}
