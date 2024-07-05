import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Container,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { login } from "../../services/authServices";
import { LoginInput } from "../../types/user";
import { AuthContainer, FormBox, SubmitButton } from "./AuthStyles";

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginInput>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(formData);
      navigate("/");
    } catch (err) {
      setError(
        "ログインに失敗しました。メールアドレスとパスワードを確認してください。"
      );
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <AuthContainer>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          ログイン
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <FormBox component="form" onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="メールアドレス"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="パスワード"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <SubmitButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            ログイン
          </SubmitButton>
          <Button
            fullWidth
            variant="text"
            onClick={() => navigate("/register")}
            sx={{ mt: 1 }}
          >
            アカウントをお持ちでない方はこちら
          </Button>
        </FormBox>
      </AuthContainer>
    </Container>
  );
};

export default Login;
