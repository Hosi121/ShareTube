import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import VideoPlayerTemplate from "../templates/VideoPlayerTemplate";
import { fetchVideoDetails, likeVideo } from "../../services/videoService";
import { createComment } from "../../services/commentService";
import { VideoDetails, Video } from "../../types/video";
import { PostCommentInput, VideoComment } from "../../types/comment";
import { User } from "../../types/user";
import { getProfileByUsername } from "../../services/authService";
import mockData from "../../testData/VideoData.json";

const VideoPlayerPage: React.FC = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
  const [videoOwner, setVideoOwner] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [useMockData, setUseMockData] = useState(true);

  useEffect(() => {
    const loadVideoDetails = async () => {
      if (videoId) {
        try {
          if (useMockData) {
            const mockVideo: Video = {
              ...mockData.video,
              created_at: new Date(mockData.video.created_at),
            };
            const mockComments: VideoComment[] = mockData.comments.map(
              (comment) => ({
                ...comment,
                timestamp: new Date(comment.timestamp),
                user: comment.user as User,
              })
            );
            setVideoDetails({
              video: mockVideo,
              comments: mockComments,
            });
            setVideoOwner(mockData.videoOwner as User);
          } else {
            const details = await fetchVideoDetails(videoId);
            setVideoDetails(details);
          }
        } catch (error) {
          console.error("Error loading video details:", error);
        }
      }
    };

    const loadCurrentUser = async () => {
      if (useMockData) {
        setCurrentUser(mockData.currentUser as User);
      } else {
        const username = localStorage.getItem("username");
        if (username) {
          try {
            const user = await getProfileByUsername(username);
            setCurrentUser(user);
          } catch (error) {
            console.error("Error loading current user:", error);
          }
        }
      }
    };

    loadVideoDetails();
    loadCurrentUser();
  }, [videoId, useMockData]);

  const handleAddComment = async (comment: string) => {
    if (videoId && videoDetails && currentUser) {
      try {
        if (useMockData) {
          const newComment: VideoComment = {
            id: Date.now(),
            video_id: parseInt(videoId, 10),
            user_id: currentUser.id,
            comment: comment,
            timestamp: new Date(),
            user: currentUser,
          };
          setVideoDetails((prevDetails) => {
            if (prevDetails === null) return null;
            return {
              ...prevDetails,
              comments: [...prevDetails.comments, newComment],
            };
          });
        } else {
          const commentInput: PostCommentInput = {
            video_id: parseInt(videoId, 10),
            comment: comment,
          };
          const newComment = await createComment(commentInput);
          setVideoDetails((prevDetails) => {
            if (prevDetails === null) return null;
            return {
              ...prevDetails,
              comments: [...prevDetails.comments, newComment],
            };
          });
        }
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const handleLikeVideo = async () => {
    if (videoId && videoDetails) {
      try {
        if (useMockData) {
          // モックデータでいいねを追加
          setVideoDetails((prevDetails) => {
            if (prevDetails === null) return null;
            return {
              ...prevDetails,
              video: {
                ...prevDetails.video,
                likes: prevDetails.video.likes + 1,
              },
            };
          });
        } else {
          const updatedLikes = await likeVideo(videoId);
          setVideoDetails((prevDetails) => {
            if (prevDetails === null) return null;
            return {
              ...prevDetails,
              video: {
                ...prevDetails.video,
                likes: updatedLikes,
              },
            };
          });
        }
      } catch (error) {
        console.error("Error liking video:", error);
      }
    }
  };

  if (!videoDetails) return <div>Loading...</div>;

  return (
    <VideoPlayerTemplate
      video={videoDetails.video}
      comments={videoDetails.comments}
      onAddComment={handleAddComment}
      onLikeVideo={handleLikeVideo}
      videoOwner={videoOwner}
      currentUser={currentUser}
    />
  );
};

export default VideoPlayerPage;
