import React from 'react';
import { Button as MUIButton, ButtonProps as MUIButtonProps } from '@mui/material';

interface ButtonProps extends MUIButtonProps {}

const Button: React.FC<ButtonProps> = (props) => {
  return <MUIButton {...props}>{props.children}</MUIButton>;
};

export default Button;
