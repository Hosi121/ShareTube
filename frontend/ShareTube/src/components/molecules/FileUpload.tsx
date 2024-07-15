import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  IconButton,
  styled,
  CircularProgress,
  Fade,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const UploadBox = styled(Box)(({ theme }) => ({
  border: `2px dashed ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  textAlign: "center",
  cursor: "pointer",
  transition: "all 0.3s ease-in-out",
  position: "relative",
  overflow: "hidden",
}));

const UploadOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  color: theme.palette.common.white,
}));

interface FileUploadProps {
  allowedExtensions: string[];
  fileName: string;
  error: string;
  onFileChange: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  allowedExtensions,
  fileName,
  onFileChange,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const SIMULATE_UPLOAD_TIME = 6000; // 6秒後にアップロード完了となるように仮定

  useEffect(() => {
    if (fileName) {
      setIsUploading(true);
      const timer = setTimeout(() => {
        setIsUploading(false);
        setUploadComplete(true);
      }, SIMULATE_UPLOAD_TIME);
      return () => clearTimeout(timer);
    }
  }, [fileName]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFile(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const extension = file.name
      .substring(file.name.lastIndexOf("."))
      .toLowerCase();
    if (allowedExtensions.includes(extension)) {
      onFileChange(file);
      setUploadComplete(false);
    } else {
      onFileChange(null as unknown as File);
      setUploadComplete(false);
      setUploadComplete(false);
      setUploadComplete(false);
      setError("サポートされていないファイル形式です");
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileChange(null as unknown as File);
    setUploadComplete(false);
  };

  return (
    <Box mb={2}>
      <input
        type="file"
        accept={allowedExtensions.join(",")}
        onChange={handleFileChange}
        style={{ display: "none" }}
        ref={fileInputRef}
      />
      <UploadBox
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        sx={{
          backgroundColor: isDragOver ? "action.hover" : "background.paper",
          transform: isDragOver ? "scale(1.02)" : "scale(1)",
        }}
      >
        {fileName ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography>{fileName}</Typography>
            <IconButton onClick={handleRemoveFile} size="small">
              <DeleteIcon />
            </IconButton>
          </Box>
        ) : (
          <>
            <CloudUploadIcon fontSize="large" color="primary" />
            <Typography variant="h6" mt={2}>
              動画ファイルをドラッグ＆ドロップ
            </Typography>
            <Typography variant="body2" color="textSecondary" mt={1}>
              または、クリックしてファイルを選択
            </Typography>
          </>
        )}
        <Fade in={isUploading || uploadComplete}>
          <UploadOverlay>
            {isUploading ? (
              <CircularProgress color="inherit" />
            ) : (
              uploadComplete && <CheckCircleIcon fontSize="large" />
            )}
            <Typography variant="body1" mt={2}>
              {isUploading ? "アップロード中..." : "アップロード完了"}
            </Typography>
          </UploadOverlay>
        </Fade>
      </UploadBox>
      {error && (
        <Typography color="error" variant="body2" mt={1}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default FileUpload;
