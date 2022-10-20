import { UploadMetadata } from "@firebase/storage";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import htmlToPdfmake from "html-to-pdfmake";
import { storage } from "@utils";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

export const generatePDFAndSave = async (
  htmlString: string,
  orderID: string
) => {

  let html = htmlToPdfmake(htmlString);
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const documentDefinition = { content: html };
  const pdfDocGenerator = pdfMake.createPdf(documentDefinition);

  const pdfURL = new Promise((resolve, reject) => {
    pdfDocGenerator
    .getBlob(async (blob) => {
      const { type, size } = blob;

      const metadata: UploadMetadata = {
        contentType: type,
        customMetadata: {
          name: orderID,
          size: `${size}`,
        },
      };
      const fileName = orderID + ".pdf";

      const storageRef = ref(storage, "orderPDFs/" + fileName);
      const uploadTask = await uploadBytesResumable(storageRef, blob, metadata);

      const url = await getDownloadURL(uploadTask.ref);
      resolve(url)
    })})

    return pdfURL
};
