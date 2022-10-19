import { AuthContext } from "@components";
import { useContext } from "react";

export const zipFile = async (files: Array<string>, zipName: string) => {
  // const { token } = useContext(AuthContext)
  
  const response = await fetch(
    "https://us-central1-starbucks-119c1.cloudfunctions.net/downloadFiles",
    // "http://localhost:5001/starbucks-119c1/us-central1/downloadFiles",
    {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        // "authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        // name: zips/arquivo.zip
        "name": zipName,
        "arts": files,
        // arts: array string image link
      }),
    }
  )

  return response.json()
};
