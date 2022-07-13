import Component, { ButtonProps } from '@mui/material/Button';
import { FC } from "react";
import { Link } from 'react-router-dom';

export const Button: FC<ButtonProps & { href?: string }> = ({ variant = "contained", children, href, ...props }) => {

  if (href) {
    return <Link to={href}><Component variant={variant} {...props}>{children}</Component></Link>
  }

  return <Component variant={variant} {...props}>{children}</Component>
}