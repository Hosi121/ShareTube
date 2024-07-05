// src/components/auth/AuthStyles.tsx
import { styled } from "@mui/material/styles";
import { Paper, Box, Button } from "@mui/material";

export const AuthContainer = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(4),
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
}));

export const FormBox = styled(Box)(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(1),
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));
