import React from "react";
import { Grid } from "@mui/material";
import StatCard from "../molecules/StatCard";

interface AnalyticsOverviewProps {
  totalViews: number;
  averageRetentionRate: number;
  averageCompletionRate: number;
  teacherName: string;
}

const AnalyticsOverview: React.FC<AnalyticsOverviewProps> = ({
  totalViews,
  averageRetentionRate,
  averageCompletionRate,
  teacherName,
}) => (
  <Grid container spacing={3}>
    <StatCard title="総視聴回数" value={totalViews} color="#3f51b5" />
    <StatCard
      title="平均視聴維持率"
      value={`${averageRetentionRate.toFixed(2)}%`}
      color="#3f51b5"
    />
    <StatCard
      title="平均完了率"
      value={`${averageCompletionRate.toFixed(2)}%`}
      color="#3f51b5"
    />
    <StatCard title="担当教員" value={teacherName} color="#3f51b5" />
  </Grid>
);

export default AnalyticsOverview;
