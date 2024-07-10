import React from 'react';
import { Typography as MUITypography, TypographyProps as MUITypographyProps } from '@mui/material';

type TypographyProps = MUITypographyProps;

const Typography: React.FC<TypographyProps> = (props) => {
  return <MUITypography {...props} />;
};

export default Typography;