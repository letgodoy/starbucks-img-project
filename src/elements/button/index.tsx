import React, { FC, ElementType } from "react"
import Component, { ButtonProps } from '@mui/material/Button';

export const Button: FC<ButtonProps<ElementType, { component?: ElementType }>> = (props) => {
return <Component {...props}/>
}