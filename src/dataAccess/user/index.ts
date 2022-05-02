import { ICreateUser } from "@types";
import { auth, db } from "@utils";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useMutation } from "react-query";

const collectionName = "users";

const createUser = async ({ password, ...user }: ICreateUser) => {
  const { email } = user;

  const userCreated = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const account = doc(db, collectionName, userCreated.user.uid);
  setDoc(account, {
    uid: userCreated.user.uid,
    ...user,
  })
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

export const findUserByID = async (id: string) => {
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

export function useCreateUser() {
  return useMutation(createUser);
}

export function useGetUserByID() {
  return useMutation(findUserByID);
}
