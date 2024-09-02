import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography } from "@mui/material";
import { RootState } from "../../store";
import { login } from "../../store/authSlice";

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Accessing state from Redux store
  const authStatus = useSelector((state: RootState) => state.auth.status);
  const authError = useSelector((state: RootState) => state.auth.error);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Dispatching login action
    dispatch(login(formData))
      .unwrap()
      .then(() => {
        navigate("/dashboard"); // Redirect to dashboard on successful login
      })
      .catch(() => {
        // Handle error automatically through Redux
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" component="h1" gutterBottom>
        Login
      </Typography>
      <TextField
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
        required
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
        required
      />
      {authStatus === "failed" && authError && (
        <Typography color="error">{authError}</Typography>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={authStatus === "loading"}
      >
        {authStatus === "loading" ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
