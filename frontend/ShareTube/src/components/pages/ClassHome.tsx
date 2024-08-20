import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import EduVideoList from "../organisms/EduVideoList";
import { Video } from "../../types/video";

// モックデータをインポート
import mockData from "../../testData/EduVideoData.json";

interface ClassData {
  id: string;
  className: string;
  videos: Video[];
}

const ClassHome: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const [classData, setClassData] = useState<ClassData | null>(null);

  useEffect(() => {
    // モックデータを Video 型に変換
    const convertedVideos: Video[] = mockData.videos.map((video) => ({
      id: video.id,
      user_id: video.user_id,
      title: video.title,
      description: video.description,
      video_url: video.video_url,
      likes: video.likes,
      created_at: new Date(video.created_at),
      tags: video.tags,
    }));

    setClassData({
      id: mockData.class.id,
      className: mockData.class.className,
      videos: convertedVideos,
    });
  }, [classId]);

  if (!classData) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <EduVideoList className={classData.className} videos={classData.videos} />
  );
};

export default ClassHome;
