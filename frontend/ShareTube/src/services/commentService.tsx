// src/api/comments.ts

import api from "./api";
import { VideoComment, PostCommentInput } from "../types/comment";

// コメントの取得
export const fetchComments = async (videoId: number): Promise<VideoComment[]> => {
  try {
    const response = await api.get<VideoComment[]>(
      `/comments/${videoId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

// コメントの作成
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

// コメントの更新
export const updateComment = async (
  commentId: number,
  content: string
): Promise<VideoComment> => {
  try {
    const response = await api.put<VideoComment>(
      `/comments/${commentId}`,
      { comment: content }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating comment:", error);
    throw error;
  }
};

// コメントの削除
export const deleteComment = async (commentId: number): Promise<void> => {
  try {
    await api.delete(`/comments/${commentId}`);
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};

// コメントに「いいね」
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