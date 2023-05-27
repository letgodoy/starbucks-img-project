import { ReactElement } from "react"
import { Box } from "../box"
import { Typography } from "../typography"

export const Attribute = ({ label, value, sx, children }: { label: string, value?: string, sx?: any, children?: ReactElement }) => {
  return <Box my={1} width="100%" paddingX={1} paddingY={1} borderBottom="1px dotted grey" sx={{ ...sx }}>
    <Typography component="p" variant="caption">{label}</Typography>
    {value ? <Typography component="p" variant="subtitle1">{value}</Typography> : null} 
    {children}
  </Box>
}