import React from 'react';
import { TextField, InputAdornment, TextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import  SearchIcon  from '@mui/icons-material/Search';

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
    },
  },
});

interface SearchInputProps extends Omit<TextFieldProps, 'variant'> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ value, onChange, size, ...props }) => (
  <StyledTextField
    fullWidth
    placeholder="動画を検索..."
    value={value}
    onChange={onChange}
    size={size}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon color="action" />
        </InputAdornment>
      ),
    }}
    {...props}
  />
);