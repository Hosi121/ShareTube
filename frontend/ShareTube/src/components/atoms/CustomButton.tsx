import React from 'react';
import { Button, styled, ButtonProps } from '@mui/material';

const StyledButton = styled(Button)<ButtonProps & { component?: React.ElementType }>(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1.5, 3),
  borderRadius: theme.shape.borderRadius * 5,
}));

interface CustomButtonProps extends ButtonProps {
  component?: React.ElementType;
}

const CustomButton: React.FC<CustomButtonProps> = (props) => {
  return <StyledButton {...props} />;
};

export default CustomButton;