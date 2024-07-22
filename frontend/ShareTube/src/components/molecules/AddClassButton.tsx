import React from "react";
import { Button, ButtonProps } from "@mui/material";
import { Link } from "react-router-dom";

const AddClassButton: React.FC<ButtonProps> = ({ sx, ...props }) => {
  return (
    <Button
      color="primary"
      variant="contained"
      component={Link}
      to="/eduhome/createclass"
      sx={{
        borderRadius: 28,
        ...sx,
      }}
      {...props}
    >
      授業を追加
    </Button>
  );
};

export default AddClassButton;
