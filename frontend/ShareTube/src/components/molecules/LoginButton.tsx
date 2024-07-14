import React from "react";
import { Button, ButtonProps } from "@mui/material";
import { Link } from "react-router-dom";

const LoginButton: React.FC<ButtonProps> = ({ sx, ...props }) => {
  return (
    <Button
      color="primary"
      variant="contained"
      component={Link}
      to="/login"
      sx={{
        borderRadius: 28,
        ...sx,
      }}
      {...props}
    >
      ログイン
    </Button>
  );
};

export default LoginButton;
