import UIComponent, { LinkProps } from '@mui/material/Link';
import { FC } from "react";
import { Link as WouterLink, LinkProps as LinkPropsWouter } from "wouter";

export const Link: FC<LinkProps & LinkPropsWouter> = (props) => {
  return <WouterLink {...props}><UIComponent {...props} sx={{ textDecoration: "none" }}/></WouterLink>
}