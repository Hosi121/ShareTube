import axios from "axios";

const API_URL = "http://your-api-url/api";

export interface Comment {
  id: number;
  user_id: number;
  video_id: number;
  content: string;
  created_at: string;
}

export interface CreateCommentInput {
  video_id: number;
  content: string;
}

export const fetchComments = async (videoId: number): Promise<Comment[]> => {
  try {
    const response = await axios.get<Comment[]>(
      `${API_URL}/videos/${videoId}/comments`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

export const createComment = async (
  commentData: CreateCommentInput
): Promise<Comment> => {
  try {
    const response = await axios.post<Comment>(
      `${API_URL}/comments`,
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
    const response = await axios.put<Comment>(
      `${API_URL}/comments/${commentId}`,
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
    await axios.delete(`${API_URL}/comments/${commentId}`);
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};

export const likeComment = async (commentId: number): Promise<number> => {
  try {
    const response = await axios.post<{ likes: number }>(
      `${API_URL}/comments/${commentId}/like`
    );
    return response.data.likes;
  } catch (error) {
    console.error("Error liking comment:", error);
    throw error;
  }
};
