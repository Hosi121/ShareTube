import React from 'react';
import { Dialog as MUIDialog, DialogProps as MUIDialogProps } from '@mui/material';

interface DialogProps extends MUIDialogProps {}

const Dialog: React.FC<DialogProps> = (props) => {
  return <MUIDialog {...props}>{props.children}</MUIDialog>;
};

export default Dialog;