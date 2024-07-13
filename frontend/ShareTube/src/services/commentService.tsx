import api from "./api";
import {VideoComment, PostCommentInput} from "../types/comment";



export const fetchComments = async (videoId: number): Promise<VideoComment[]> => {
  try {
    const response = await api.get<VideoComment[]>(
      `/videos/${videoId}/comments`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

export const createComment = async (
  commentData: PostCommentInput
): Promise<VideoComment> => {
  try {
    const response = await api.post<VideoComment>(
      `/comments`,
      commentData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};

export const updateComment = async (
  commentId: number,
  content: string
): Promise<Comment> => {
  try {
    const response = await api.put<Comment>(
      `/comments/${commentId}`,
      { content }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating comment:", error);
    throw error;
  }
};

export const deleteComment = async (commentId: number): Promise<void> => {
  try {
    await api.delete(`/comments/${commentId}`);
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};

export const likeComment = async (commentId: number): Promise<number> => {
  try {
    const response = await api.post<{ likes: number }>(
      `/comments/${commentId}/like`
    );
    return response.data.likes;
  } catch (error) {
    console.error("Error liking comment:", error);
    throw error;
  }
};
