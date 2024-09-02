import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Typography, Container, Avatar } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { login } from "../../store/authSlice"; // Reduxのloginアクションをインポート
import { LoginInput } from "../../types/user";
import {
  StyledTextField,
  AuthContainer,
  FormBox,
  SubmitButton,
} from "./AuthStyles";
import { RootState } from "../../store";

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginInput>({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStatus = useSelector((state: RootState) => state.auth.status);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const resultAction = await dispatch(login(formData));
      if (login.fulfilled.match(resultAction)) {
        const { username } = resultAction.payload;
        navigate(`/user/${username}`);
      } else {
        setError("ログインに失敗しました。メールアドレスとパスワードを確認してください。");
      }
    } catch (err) {
      console.error("Login error details:", err);
      setError("ログインに失敗しました。メールアドレスとパスワードを確認してください。");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <AuthContainer elevation={6}>
        <Avatar sx={{ m: 1, bgcolor: "primary.main", width: 56, height: 56 }}>
          <LockOutlinedIcon fontSize="large" />
        </Avatar>
        <Typography component="h1" variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
          ログイン
        </Typography>
        {authStatus === "failed" && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <FormBox component="form" onSubmit={handleSubmit}>
          <StyledTextField
            required
            fullWidth
            id="email"
            label="メールアドレス"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
          />
          <StyledTextField
            required
            fullWidth
            name="password"
            label="パスワード"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
          />
          <SubmitButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={authStatus === "loading"}
          >
            ログイン
          </SubmitButton>
          <Button
            fullWidth
            variant="text"
            onClick={() => navigate("/register")}
            sx={{ mt: 2, textTransform: "none" }}
          >
            アカウントをお持ちでない方はこちら
          </Button>
        </FormBox>
      </AuthContainer>
    </Container>
  );
};

export default Login;