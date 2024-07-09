import React from 'react';
import { TextField as MUITextField, TextFieldProps as MUITextFieldProps } from '@mui/material';

interface TextFieldProps extends MUITextFieldProps {}

const TextField: React.FC<TextFieldProps> = (props) => {
  return <MUITextField {...props} />;
};

export default TextField;