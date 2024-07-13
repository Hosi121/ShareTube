import React from 'react';
import { Box, Typography, Alert } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CustomButton from '../atoms/CustomButton';

interface FileUploadProps {
  allowedExtensions: string[];
  fileName: string;
  error: string;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ allowedExtensions, fileName, error, onFileChange }) => {
  return (
    <Box sx={{ my: 2, textAlign: 'center' }}>
      <input
        accept={allowedExtensions.join(',')}
        style={{ display: 'none' }}
        id="raised-button-file"
        type="file"
        onChange={onFileChange}
      />
      <label htmlFor="raised-button-file">
        <CustomButton
          variant="contained"
          component="span"
          startIcon={<CloudUploadIcon />}
          color="secondary"
        >
          動画ファイルを選択
        </CustomButton>
      </label>
      {fileName && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          選択されたファイル: {fileName}
        </Typography>
      )}
      {error && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default FileUpload;