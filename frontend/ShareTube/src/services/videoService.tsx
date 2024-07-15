import api from "./api";
import { Video, UploadVideoInput , VideoDetails} from "../types/video";

export const fetchVideoDetails = async (videoId: string): Promise<VideoDetails> => {
  try {
    const response = await api.get<VideoDetails>(
      `/videos/${videoId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching video details:", error);
    throw error;
  }
};

export const likeVideo = async (videoId: string): Promise<number> => {
  try {
    const response = await api.post<{ likes: number }>(
      `/videos/${videoId}/like`
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
    const response = await api.get<Video[]>(`/videos`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error;
  }
};

export const uploadVideo = async (videoData: UploadVideoInput): Promise<Video> => {
  try {
    const formData = new FormData();
    formData.append('title', videoData.title);
    formData.append('description', videoData.description);
    formData.append('file', videoData.file);

    console.log('FormData:', formData); // FormDataの内容をログに出力

    const response = await api.post<Video>('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Response:', response.data); // レスポンスをログに出力

    return response.data;
  } catch (error) {
    console.error('Error uploading video:', error);
    throw error;
  }
};

export const updateVideo = async (
  videoId: string,
  updateData: Partial<Video>
): Promise<Video> => {
  try {
    const response = await api.put<Video>(
      `/videos/${videoId}`,
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
    await api.delete(`/videos/${videoId}`);
  } catch (error) {
    console.error("Error deleting video:", error);
    throw error;
  }
};
