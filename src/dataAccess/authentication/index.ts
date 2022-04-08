import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "@utils";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useMutation } from "react-query";

export interface ICredentials {
  email: string;
  password: string;
}

const logIn = async ({ email, password }: ICredentials) =>
  await signInWithEmailAndPassword(auth, email, password);
// .then((userCredential) => {
//   // Signed in
//   const user = userCredential.user;
//   // ...
// })
// .catch((error) => {
//   const errorCode = error.code;
//   const errorMessage = error.message;
// });

const logOut = async () => await signOut(auth);
// .then(() => {
//   // Sign-out successful.
// })
// .catch((error) => {
//   // An error happened.
// });

// onAuthStateChanged(auth, (user) => {
//   if (user) {
//     // User is signed in, see docs for a list of available properties
//     // https://firebase.google.com/docs/reference/js/firebase.User
//     const uid = user.uid;
//     // ...
//   } else {
//     // User is signed out
//     // ...
//   }
// });

export function useLogIn() {
  return useMutation(logIn);
}

export function useLogOut() {
  return useMutation(logOut);
}
