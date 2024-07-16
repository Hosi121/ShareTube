import React from "react";
import { Paper, Grid } from "@mui/material";
import Typography from "../atoms/typography";

interface StatCardProps {
  title: string;
  value: string | number;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, color }) => (
  <Grid item xs={12} md={3}>
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="h4" sx={{ color, fontWeight: "bold" }}>
        {value}
      </Typography>
    </Paper>
  </Grid>
);

export default StatCard;
