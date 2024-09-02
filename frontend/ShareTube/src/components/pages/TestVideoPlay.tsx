import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import VideoPlayerTemplate from "../templates/VideoPlayerTemplate";
import { fetchVideoDetails, likeVideo } from "../../services/videoService"; // These should also be moved to a Redux slice
import { VideoDetails, Video } from "../../types/video";
import { VideoComment } from "../../types/comment";
import { RootState } from "../../store";
import { getProfileByUsername as getProfileByUsernameThunk } from "../../store/authSlice";

const VideoPlayerPage: React.FC = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const dispatch = useDispatch();

  // Accessing Redux state
  const videoDetails = useSelector((state: RootState) => state.video.videoDetails);
  const videoOwner = useSelector((state: RootState) => state.video.videoOwner);
  const currentUser = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (videoId) {
      dispatch(fetchVideoDetails(videoId)); // This should be a Redux action, create a slice for `video`
    }

    if (!currentUser) {
      const username = localStorage.getItem("username");
      if (username) {
        dispatch(getProfileByUsernameThunk(username));
      }
    }
  }, [videoId, dispatch, currentUser]);

  const handleAddComment = async (comment: string) => {
    if (videoId && videoDetails && currentUser) {
      try {
        const commentInput: PostCommentInput = {
          video_id: parseInt(videoId, 10),
          comment: comment,
        };

        // Dispatch a Redux action to add a comment
        dispatch(addComment(commentInput)); // This action needs to be created in your `videoSlice`
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const handleLikeVideo = async () => {
    if (videoId && videoDetails) {
      try {
        dispatch(likeVideo(videoId)); // Again, this should be a Redux action
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