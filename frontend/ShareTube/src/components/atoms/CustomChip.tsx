import React from 'react';
import { Chip, styled, ChipProps } from '@mui/material';

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius * 4,
}));

const CustomChip: React.FC<ChipProps> = (props) => {
  return <StyledChip {...props} />;
};

export default CustomChip;