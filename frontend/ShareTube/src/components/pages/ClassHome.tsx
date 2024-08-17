import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Chip,
} from "@mui/material";
import { Visibility, ThumbUp } from "@mui/icons-material";

// モックデータをインポート
import EduVideoData from "../../testData/EduVideoData.json";

interface Video {
  videoId: string;
  title: string;
  views: number;
  likes: number;
}

interface ClassData {
  classId: string;
  className: string;
  videos: Video[];
}

const ClassVideosPage: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const [classData, setClassData] = useState<ClassData | null>(null);

  useEffect(() => {
    // モックデータから必要な情報のみを抽出
    const simplifiedData = {
      classId: EduVideoData.classId,
      className: EduVideoData.className,
      videos: EduVideoData.videos.map((video) => ({
        videoId: video.videoId,
        title: video.title,
        views: video.views,
        likes: video.likes,
      })),
    };
    setClassData(simplifiedData);
  }, [classId]);

  if (!classData) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          fontWeight="bold"
          color="#3f51b5"
        >
          {classData.className}
        </Typography>
      </Box>

      <Typography variant="h5" gutterBottom fontWeight="bold" color="#3f51b5">
        授業動画一覧
      </Typography>
      <Grid container spacing={3}>
        {classData.videos.map((video) => (
          <Grid item xs={12} sm={6} md={4} key={video.videoId}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {video.title}
                </Typography>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mt={2}
                >
                  <Chip
                    icon={<Visibility />}
                    label={`${video.views} 回視聴`}
                    size="small"
                  />
                  <Chip icon={<ThumbUp />} label={video.likes} size="small" />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ClassVideosPage;
