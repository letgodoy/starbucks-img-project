import { Box } from "../box"
import { Typography } from "../typography"

export const Attribute = ({ label, value, sx }: { label: string, value: string, sx?: any }) => {
  return <Box my={1} width="100%" paddingX={1} paddingY={1} borderBottom="1px dotted grey" sx={{ ...sx }}>
    <Typography component="p" variant="caption">{label}</Typography>
    <Typography component="p" variant="subtitle1">{value}</Typography>
  </Box>
}