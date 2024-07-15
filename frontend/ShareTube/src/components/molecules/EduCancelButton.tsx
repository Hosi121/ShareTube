import React from "react";
import { Button, ButtonProps } from "@mui/material";
import { Link } from "react-router-dom";

const EduCancelButton: React.FC<ButtonProps> = ({ sx, ...props }) => {
  return (
    <Button
      color="primary"
      variant="contained"
      component={Link}
      to="/eduhome"
      sx={{
        borderRadius: 28,
        ...sx,
      }}
      {...props}
    >
      キャンセル
    </Button>
  );
};

export default EduCancelButton;
