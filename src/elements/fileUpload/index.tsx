import { FC } from "react"
import { FileUploader } from "react-drag-drop-files"
import { fileTypes } from "@utils"
import { Box } from "../box"
import { Grid } from "../grid"

export const FileUploadInput: FC<any> = (props: any) => {
  return <Box marginY={3}><FileUploader {...props} label="Clique ou arraste uma imagem" types={fileTypes} /></Box>
}