import { FormControl, InputLabel, MenuItem, Select as SelectComponent, SelectProps } from "@mui/material"
import { FC } from "react"

export const Select: FC<SelectProps & {
  listData: Array<{
    name: string,
    value: string
  } | null>
}> = (props) => {

  const { id, listData, label } = props
  return <FormControl fullWidth sx={{ marginY: 3 }}>
    <InputLabel id="selectStore">{label}</InputLabel>
    <SelectComponent
      labelId={id}
      id={id + "Element"}
      {...props}
    >
      {listData?.map((item, index) => {
        return <MenuItem key={index} value={item?.value}>{item?.name}</MenuItem>
      })}
    </SelectComponent>
  </FormControl>
}