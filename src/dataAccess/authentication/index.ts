import {
  confirmPasswordReset,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { ICredentials } from "@types";
import { auth } from "@utils";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useMutation } from "react-query";

const logIn = async ({ email, password }: ICredentials) => {
  return await signInWithEmailAndPassword(auth, email, password)
    .then((res) => {
      return res.user as any;
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === "auth/wrong-password") {
        alert("Wrong password.");
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
  // .then((userCredential) => {
  //   // Signed in
  //   const user = userCredential.user;
  //   // ...
  // })
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  // });
};

const logOut = async () => await signOut(auth);
// .then(() => {
//   // Sign-out successful.
// })
// .catch((error) => {
//   // An error happened.
// });

const checkAuth = async () =>
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      // renova token tb
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

const changePassword = async ({
  code,
  newPassword,
}: {
  code: string;
  newPassword: string;
}) => await confirmPasswordReset(auth, code, newPassword);

const sendEmailPassword = async ({ email }: { email: string }) =>
  await sendPasswordResetEmail(auth, email)
    .then(async function () {
      // Password reset email sent.
      // await confirmPasswordReset(auth, 'user@example.com', code); ????????/
    })
    .catch(function (error) {
      // Error occurred. Inspect error.code.
    });

export function useLogIn() {
  return useMutation(logIn);
}

export function useLogOut() {
  return useMutation(logOut);
}
