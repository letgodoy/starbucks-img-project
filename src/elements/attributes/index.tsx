import { Box } from "../box"
import { Typography } from "../typography"

export const Attribute = ({ label, value }: { label: string, value: string }) => {
  return <Box my={2} width="100%" paddingX={1} paddingY={1} borderBottom="1px dotted grey">
    <Typography component="p" variant="caption">{label}</Typography>
    <Typography component="p" variant="subtitle1">{value}</Typography>
  </Box>
}