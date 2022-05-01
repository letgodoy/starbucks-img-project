import { IFile, IFileStorage } from "@types";
import { storage } from "@utils";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
  UploadMetadata,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const uploadStorageFile = async (folder: string, file: any) => {
  const { type, name, size, lastModified } = file;
  const metadata: UploadMetadata = {
    contentType: type,
    customMetadata: {
      lastModified,
      name,
      size: `${size}`,
    },
  };
  const fileName = uuidv4() + type.replace("image/", ".");

  const storageRef = ref(storage, folder + fileName);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      console.log(snapshot);
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;
        case "storage/canceled":
          // User canceled the upload
          break;
        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    },
  );

  return await uploadTask.then(async (snapshot) => {
    const url = await getDownloadURL(snapshot.ref);

    return {
      url,
      fileName,
      ...snapshot
    }
  });
};

const deleteStorageFile = (folder: string, fileName: string) => {
  // Create a reference to the file to delete
  const desertRef = ref(storage, folder + fileName);

  // Delete the file
  deleteObject(desertRef)
    .then(() => {
      // File deleted successfully
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });
};

const getDownload = (folder: string, fileName: string) => {
  const starsRef = ref(storage, folder + fileName);

  // Get the download URL
  getDownloadURL(starsRef)
    .then((url) => {
      console.log(url);
      // Insert url into an <img> tag to "download"

      // This can be downloaded directly:
      const xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onload = (event) => {
        const blob = xhr.response;
      };
      xhr.open("GET", url);
      xhr.send();

      // Or inserted into an <img> element
      const img = document.getElementById("myimg");
      img?.setAttribute("src", url);
    })
    .catch((error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case "storage/object-not-found":
          // File doesn't exist
          break;
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;
        case "storage/canceled":
          // User canceled the upload
          break;

        // ...

        case "storage/unknown":
          // Unknown error occurred, inspect the server response
          break;
      }
    });
};

const getURLDownload = (folder: string, fileName: string) => {
  const starsRef = ref(storage, folder + fileName);

  // Get the download URL
  getDownloadURL(starsRef)
    .then((url) => {
      console.log(url);
      // Insert url into an <img> tag to "download"
    })
    .catch((error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case "storage/object-not-found":
          // File doesn't exist
          break;
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;
        case "storage/canceled":
          // User canceled the upload
          break;

        // ...

        case "storage/unknown":
          // Unknown error occurred, inspect the server response
          break;
      }
    });
};

export const uploadImage = (file: IFile) => {
  return uploadStorageFile("images/", file);
};

export const uploadPiece = (file: IFile) => {
  return uploadStorageFile("pieces/", file);
};

export const deleteImage = (fileName: string) => {
  return deleteStorageFile("images/", fileName);
};

export const deletePiece = (fileName: string) => {
  return deleteStorageFile("pieces/", fileName);
};

export const getDownloadImage = (fileName: string) => {
  return getDownload("images/", fileName);
};

export const getDownloadPiece = (fileName: string) => {
  return getDownload("pieces/", fileName);
};

export const getURLDownloadImage = (fileName: string) => {
  return getURLDownload("images/", fileName);
};

export const getURLDownloadPiece = (fileName: string) => {
  return getURLDownload("pieces/", fileName);
};
