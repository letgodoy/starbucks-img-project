import React, { FC, ElementType } from "react"
import Component, { BoxProps } from '@mui/material/Box';

export const Box: FC<BoxProps<ElementType, { component?: ElementType }>> = (props) => {
return <Component {...props}/>
}