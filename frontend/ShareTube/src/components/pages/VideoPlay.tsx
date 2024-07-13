import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayerTemplate from '../templates/VideoPlayerTemplate';
import { fetchVideoDetails, likeVideo } from '../../services/videoService';
import { createComment } from '../../services/commentService';
import { VideoDetails } from '../../types/video';
import { PostCommentInput } from '../../types/comment';
import { User } from '../../types/user';
import { getCurrentUser } from '../../services/authService';

const VideoPlayerPage: React.FC = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
  const [videoOwner, setVideoOwner] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const loadVideoDetails = async () => {
      if (videoId) {
        try {
          const details = await fetchVideoDetails(videoId);
          setVideoDetails(details);
        } catch (error) {
          console.error('Error loading video details:', error);
        }
      }
    };

    const loadCurrentUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error('Error loading current user:', error);
      }
    };

    loadVideoDetails();
    loadCurrentUser();
  }, [videoId]);

  const handleAddComment = async (comment: string) => {
    if (videoId && videoDetails && currentUser) {
      try {
        const commentInput: PostCommentInput = {
          video_id: parseInt(videoId, 10),
          comment: comment,
        };
        const newComment = await createComment(commentInput);
        setVideoDetails(prevDetails => {
          if (prevDetails === null) return null;
          return {
            ...prevDetails,
            comments: [...prevDetails.comments, newComment]
          };
        });
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  const handleLikeVideo = async () => {
    if (videoId && videoDetails) {
      try {
        const updatedLikes = await likeVideo(videoId);
        setVideoDetails(prevDetails => {
          if (prevDetails === null) return null;
          return {
            ...prevDetails,
            video: {
              ...prevDetails.video,
              likes: updatedLikes,
            }
          };
        });
      } catch (error) {
        console.error('Error liking video:', error);
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