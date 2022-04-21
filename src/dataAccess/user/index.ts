import { ICreateUser } from "@types";
import { auth, db } from "@utils";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useMutation } from "react-query";

const collectionName = "users";

const createUser = async (user: ICreateUser) => {
  const { email, password } = user;

  const userCreated = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const account = doc(db, collectionName, userCreated.user.uid);
  setDoc(account, {
    uid: userCreated.user.uid,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    role: user.role,
    store: user.store,
    phone: user.phone,
    cargo: user.cargo,
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

const findUserByID = async (id: string) => {
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
