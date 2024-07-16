import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Box } from "@mui/material";
import {
  getClassAnalytics,
  getClassInfo,
} from "../../services/videoAnalyticsService";
import { ClassAnalytics as ClassAnalyticsType } from "../../types/video";
import { Class } from "../../types/class";
import { generateCSV, downloadCSV } from "../utils/csvExport";
import CircularProgress from "../atoms/CircularProgress";
import Typography from "../atoms/typography";
import AnalyticsHeader from "../organisms/AnalyticsHeader";
import AnalyticsOverview from "../organisms/AnalyticsOverview";
import AnalyticsCharts from "../organisms/AnalyticsChart";

const ClassAnalytics: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const [analytics, setAnalytics] = useState<ClassAnalyticsType | null>(null);
  const [classInfo, setClassInfo] = useState<Class | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (classId) {
        const [analyticsData, classData] = await Promise.all([
          getClassAnalytics(classId),
          getClassInfo(classId),
        ]);
        setAnalytics(analyticsData);
        setClassInfo(classData);
        setLoading(false);
      }
    };
    fetchData();
  }, [classId]);

  const handleExportCSV = () => {
    if (analytics) {
      const csvContent = generateCSV(analytics);
      downloadCSV(csvContent, `${classInfo?.className}_analytics.csv`);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!analytics || !classInfo) {
    return <Typography>データの取得に失敗しました。</Typography>;
  }

  const averageCompletionRate =
    analytics.videos.reduce(
      (sum, video) =>
        sum + (video.averageViewDuration / video.totalDuration) * 100,
      0
    ) / analytics.videos.length;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <AnalyticsHeader
        title={`${classInfo.className} - アナリティクス`}
        onExportCSV={handleExportCSV}
      />
      <AnalyticsOverview
        totalViews={analytics.totalViews}
        averageRetentionRate={analytics.averageRetentionRate}
        averageCompletionRate={averageCompletionRate}
        teacherName={classInfo.teacherName}
      />
      <Box sx={{ mt: 4 }}>
        <AnalyticsCharts videos={analytics.videos} />
      </Box>
    </Container>
  );
};

export default ClassAnalytics;
