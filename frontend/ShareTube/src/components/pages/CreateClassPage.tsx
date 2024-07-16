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
  TextField,
  Button,
} from "@mui/material";
import { animated } from "react-spring";
import { Class } from "../../types/class";
import { classService } from "../../services/classService";
import { useNavigate } from "react-router-dom";
import useUserData from "../../hooks/useUserData";

const AnimatedBox = animated(Box);

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  background: theme.palette.background.default,
  boxShadow: "0 12px 40px rgba(0, 0, 0, 0.1)",
  borderRadius: theme.shape.borderRadius * 3,
  maxWidth: 600,
  margin: "0 auto",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  "& .MuiOutlinedInput-root": {
    fontSize: "1.1rem",
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const CreateClass: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUserData();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [className, setClassName] = useState("");
  const [classRoom, setClassRoom] = useState("");

  const handleAddClass = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const newClass: Omit<Class, "id" | "created_at" | "updated_at"> = {
        className: className,
        classLocation: classRoom,
        teacherName: user.username,
      };
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
            variant="h3"
            component="h1"
            gutterBottom
            color="primary"
            fontWeight="bold"
            sx={{ mb: 2, textAlign: "center" }}
          >
            新しい授業を作成
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 4, textAlign: "center" }}>
            以下のフォームに必要事項を入力してください。
          </Typography>
          <StyledTextField
            fullWidth
            label="授業名"
            variant="outlined"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            required
          />
          <StyledTextField
            fullWidth
            label="教室"
            variant="outlined"
            value={classRoom}
            onChange={(e) => setClassRoom(e.target.value)}
            required
          />
          <Grid container spacing={2} sx={{ mt: 4 }}>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                onClick={handleAddClass}
                disabled={isLoading}
                sx={{ sx: 2, borderRadius: 28 }}
              >
                授業を追加
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                size="large"
                sx={{ sx: 2, borderRadius: 28 }}
                onClick={() => navigate("/eduhome")}
              >
                キャンセル
              </Button>
            </Grid>
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

export default CreateClass;
