import axios from "axios";
import { Video, UploadVideoInput } from "../types/video";

const API_URL = "http://localhost:8080";

export interface Comment {
  id: number;
  user_id: number;
  video_id: number;
  content: string;
  created_at: string;
}

export interface VideoDetails extends Video {
  comments: Comment[];
}

export const fetchVideoDetails = async (
  videoId: string
): Promise<VideoDetails> => {
  try {
    const response = await axios.get<VideoDetails>(
      `${API_URL}/videos/${videoId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching video details:", error);
    throw error;
  }
};

export const likeVideo = async (videoId: string): Promise<number> => {
  try {
    const response = await axios.post<{ likes: number }>(
      `${API_URL}/videos/${videoId}/like`
    );
    return response.data.likes;
  } catch (error) {
    console.error("Error liking video:", error);
    throw error;
  }
};

export const fetchVideos = async (params?: {
  query?: string;
  tags?: string[];
}): Promise<Video[]> => {
  try {
    const response = await axios.get<Video[]>(`${API_URL}/videos`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error;
  }
};

export const uploadVideo = async (
  videoData: UploadVideoInput
): Promise<Video> => {
  try {
    const formData = new FormData();
    formData.append("title", videoData.title);
    formData.append("description", videoData.description);
    formData.append("file", videoData.file);

    const response = await axios.post<Video>(`${API_URL}/videos`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading video:", error);
    throw error;
  }
};

export const updateVideo = async (
  videoId: string,
  updateData: Partial<Video>
): Promise<Video> => {
  try {
    const response = await axios.put<Video>(
      `${API_URL}/videos/${videoId}`,
      updateData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating video:", error);
    throw error;
  }
};

export const deleteVideo = async (videoId: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/videos/${videoId}`);
  } catch (error) {
    console.error("Error deleting video:", error);
    throw error;
  }
};
