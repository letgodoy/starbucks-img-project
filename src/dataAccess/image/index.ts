import { ICreatePiece, IPiece } from "@types";
import { db } from "@utils";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { useMutation, useQuery } from "react-query";

const storage = getStorage();

const uploadImage = async (image: any) => {

  const storageRef = ref(storage, 'images/rivers.jpg');
  
  const uploadTask = uploadBytesResumable(storageRef, file);
  
  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  uploadTask.on('state_changed', 
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      // Handle unsuccessful uploads
    }, 
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
      });
    }
  );

  const target = collection(db, collectionName);

  await addDoc(target, piece)
    .then((res) => {
      console.log("Document add", res);
      alert("Document add");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode + ": " + errorMessage);
    });
};

const findPieceByID = async (id: string) => {
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

const findPieces = async (marca: string) => {
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

export function useCreatePiece() {
  return useMutation(createPiece);
}

export function useGetPieceByID() {
  return useMutation(findPieceByID);
}

export function useGetPieces(marca: string) {
  return useQuery("findPieces", () => findPieces(marca));
}
