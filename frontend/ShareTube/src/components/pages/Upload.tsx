import React from "react";
import { Container, Paper, Typography, styled } from "@mui/material";
import UploadForm from "../organisms/UploadForm";
import { UploadVideoInput } from "../../types/video";
import { uploadVideo } from "../../services/videoService"; // import the uploadVideo functi
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  background: theme.palette.background.default,
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  borderRadius: theme.shape.borderRadius * 2,
}));

const Upload: React.FC = () => {
  const handleSubmit = async (videoInput: UploadVideoInput, tags: string[]) => {
    console.log("Uploading video:", videoInput, "with tags:", tags);
    await uploadVideo(videoInput);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <Container maxWidth="md">
      <StyledPaper elevation={3}>
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          fontWeight="bold"
          color="primary"
        >
          アップロード
        </Typography>
        <UploadForm onSubmit={handleSubmit} />
      </StyledPaper>
    </Container>
  );
};

export default Upload;
