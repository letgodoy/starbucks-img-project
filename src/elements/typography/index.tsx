import React, { FC, ElementType } from "react"
import Component, { TypographyProps } from '@mui/material/Typography';

export const Typography: FC<TypographyProps<ElementType, { component?: ElementType }>> = (props) => {
return <Component {...props}/>
}