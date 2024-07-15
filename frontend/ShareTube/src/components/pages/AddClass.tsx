import React, { useState } from "react";
import { Container, Box, Typography, Snackbar, Alert } from "@mui/material";
import AddClassForm from "../organisms/AddClassForm";
import { useSpring, animated } from "react-spring";
import { Class } from "../../types/class";
import { classService } from "../../services/classService";
import { useNavigate } from "react-router-dom";

const AnimatedBox = animated(Box);

const AddClass: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(50px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { duration: 1000 },
  });

  const handleAddClass = async (
    newClass: Omit<Class, "id" | "created_at" | "updated_at" | "teacher">
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      const currentUser = { name: "山田 太郎" };
      const classToCreate = {
        ...newClass,
        teacher: currentUser.name,
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
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <AnimatedBox style={fadeIn}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          color="primary"
          fontWeight="bold"
        >
          新しい授業を作成
        </Typography>
        <AddClassForm
          onAddClass={handleAddClass}
          currentUserName="山田 太郎"
          isLoading={isLoading}
        />
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
      </AnimatedBox>
    </Container>
  );
};

export default AddClass;
