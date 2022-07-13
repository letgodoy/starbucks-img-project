import UIComponent, { LinkProps } from '@mui/material/Link';
import { FC } from "react";
import { Link as RouterLink, LinkProps as LinkPropsRouter } from "react-router-dom";

export const Link: FC<LinkProps & LinkPropsRouter> = (props) => {
  return <RouterLink {...props}><UIComponent {...props} sx={{ textDecoration: "none" }}/></RouterLink>
}