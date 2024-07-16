import React from "react";
import {
  CircularProgress as MuiCircularProgress,
  CircularProgressProps,
} from "@mui/material";

const CircularProgress: React.FC<CircularProgressProps> = (props) => (
  <MuiCircularProgress {...props} />
);

export default CircularProgress;
