import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Snackbar,
  Alert,
  styled,
  Paper,
  Grid,
} from "@mui/material";
import AddClassForm from "../organisms/ClassForm";
import { animated } from "react-spring";
import { Class } from "../../types/class";
import { classService } from "../../services/classService";
import { useNavigate } from "react-router-dom";
import EduCancelButton from "../molecules/EduCancelButton";
import useUserData from "../../hooks/useUserData";

const AnimatedBox = animated(Box);

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  background: theme.palette.background.default,
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  borderRadius: theme.shape.borderRadius * 2,
}));

const AddClass: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUserData();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleAddClass = async (
    newClass: Omit<Class, "id" | "created_at" | "updated_at" | "teacher">
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const classToCreate = {
        ...newClass,
        teacher: user.username,
      };

      await classService.createClass(classToCreate);
      setSuccessMessage("授業が正常に作成されました。");
      setTimeout(() => {
        navigate("/eduhome");
      }, 2000);
    } catch (err) {
      setError("授業の作成中にエラーが発生しました。もう一度お試しください。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 4 }}>
      <AnimatedBox>
        <StyledPaper elevation={3}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            color="primary"
            fontWeight="bold"
            sx={{ mb: 4 }}
          >
            新しい授業を作成
          </Typography>
          <AddClassForm
            onAddClass={handleAddClass}
            currentUserName={user}
            isLoading={isLoading}
          />
          <Grid container justifyContent="flex-end" sx={{ mt: 4 }}>
            <EduCancelButton />
          </Grid>
        </StyledPaper>
      </AnimatedBox>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert
          onClose={() => setError(null)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage(null)}
      >
        <Alert
          onClose={() => setSuccessMessage(null)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddClass;
