import React, { FC, ElementType } from "react"
import UIComponent, { GridProps } from '@mui/material/Grid';

export const Grid: FC<GridProps<ElementType, { component?: ElementType }>> = (props) => {
return <UIComponent {...props}/>
}