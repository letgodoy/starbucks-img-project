import { ICreateUser } from "@types";
import { auth } from "@utils";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useMutation } from "react-query";

const createUser = async (user: ICreateUser) => {
  const { email, password } = user;
  return await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
};

export function useCreateUser() {
  return useMutation(createUser);
}
