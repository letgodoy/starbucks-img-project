import { ICreateUser } from "@types";
import { auth, db } from "@utils";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, query, setDoc, where } from "firebase/firestore";
import { useMutation, useQuery } from "react-query";

const usersRef = collection(db, "users");

const createUser = async (user: ICreateUser) => {
  const { email, password } = user;
  return await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      console.log("userCredential", userCredential)
      try {
        const docRef = await addDoc(collection(db, "users"), {
          name: user.name,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
          store: user.store,
          phone: user.phone,
          cargo: user.cargo,
          id: userCredential.user.uid
        });

        console.log(docRef)
        console.log("Document written with ID: ", docRef.id);
        alert("Document written with ID: " + docRef.id)
        return docRef
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode + ": " + errorMessage)
    });
};

const findUserByID = async (id: string) => {

  return await query(usersRef, where("id", "==", id));
}

export function useCreateUser() {
  return useMutation(createUser);
}

export function useGetUserByID({ userId }: any) {
  return useQuery(["getUserByID", userId], () => findUserByID(userId));
} 