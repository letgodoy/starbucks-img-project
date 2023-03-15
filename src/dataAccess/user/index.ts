import { ICreateUser, IUser } from "@types";
import { auth, db } from "@utils";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { useMutation, useQuery } from "react-query";

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
    .then((res) => res)
    .catch((error) => error);
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

export const listAllUsers = async () => {
  const res = await getDocs(collection(db, collectionName));

  const arr: Array<IUser> = [];

  res.forEach((doc) => {
    arr.push({
      ...doc.data() as IUser,
    });
  });

  return arr;
};

export const toggleBlockUser = async (id: string) => {
  const docRef = doc(db, collectionName, id);

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const user = docSnap.data() as IUser;

    await updateDoc(docRef, {
      isBlocked: !user.isBlocked,
    });
  }
};


export function useCreateUser() {
  return useMutation(createUser);
}

export function useGetUserByID() {
  return useMutation(findUserByID);
}

export function useGetAllUsers() {
  return useQuery(['getAllUsers'], listAllUsers);
}

export function useToggleBlockUser() {
  return useMutation(toggleBlockUser);
}
