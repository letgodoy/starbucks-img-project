import React, { FC, ElementType } from "react"
import UIComponent, { LinkProps } from '@mui/material/Link';

export const Link: FC<LinkProps<ElementType, { component?: ElementType }>> = (props) => {
return <UIComponent {...props}/>
}