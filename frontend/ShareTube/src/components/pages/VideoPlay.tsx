import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import VideoPlayerTemplate from "../templates/VideoPlayerTemplate";
import { fetchVideoDetails, likeVideo } from "../../services/videoService";
import { createComment } from "../../services/commentService";
import { Video, Comment } from "../../types/video";

const VideoPlayerPage: React.FC = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const [video, setVideo] = useState<Video | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const loadVideoDetails = async () => {
      if (videoId) {
        try {
          const details = await fetchVideoDetails(videoId);
          setVideo(details);
          setComments(details.comments);
        } catch (error) {
          console.error("Error loading video details:", error);
        }
      }
    };
    loadVideoDetails();
  }, [videoId]);

  const handleAddComment = async (comment: string) => {
    if (videoId && video) {
      try {
        const newComment = await createComment({
          video_id: Number(videoId),
          content: comment,
        });
        setComments((prevComments) => [...prevComments, newComment]);
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const handleLikeVideo = async () => {
    if (videoId && video) {
      try {
        const updatedLikes = await likeVideo(videoId);
        setVideo((prevVideo) => ({
          ...prevVideo!,
          likes: updatedLikes,
        }));
      } catch (error) {
        console.error("Error liking video:", error);
      }
    }
  };

  if (!video) return <div>Loading...</div>;

  return (
    <VideoPlayerTemplate
      video={video}
      comments={comments}
      onAddComment={handleAddComment}
      onLikeVideo={handleLikeVideo}
    />
  );
};

export default VideoPlayerPage;
