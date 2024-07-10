import React from 'react';
import { TextField as MUITextField, TextFieldProps as MUITextFieldProps } from '@mui/material';

type TextFieldProps = MUITextFieldProps;

const TextField: React.FC<TextFieldProps> = (props) => {
  return <MUITextField {...props} />;
};

export default TextField;