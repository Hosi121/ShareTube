import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { VideoDetails, Video } from '../types/video';
import { User } from '../types/user';
import { VideoComment, PostCommentInput } from '../types/comment';
import api from '../services/api';
import mockData from '../testData/VideoData.json';

interface VideoState {
  videoDetails: VideoDetails | null;
  videoOwner: User | null;
  currentUser: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: VideoState = {
  videoDetails: null,
  videoOwner: null,
  currentUser: null,
  status: 'idle',
  error: null,
};

export const fetchVideoDetails = createAsyncThunk(
  'video/fetchVideoDetails',
  async (videoId: string, { rejectWithValue }) => {
    try {
      const response = await api.get<VideoDetails>(`/videos/${videoId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch video details');
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'video/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const username = localStorage.getItem('username');
      if (!username) throw new Error('No username found in localStorage');
      const response = await api.get<User>(`/profile/${username}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch current user');
    }
  }
);

export const addComment = createAsyncThunk(
  'video/addComment',
  async ({ videoId, comment }: { videoId: string; comment: string }, { rejectWithValue }) => {
    try {
      const response = await api.post<VideoComment>(`/videos/${videoId}/comments`, { comment });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to add comment');
    }
  }
);

export const likeVideo = createAsyncThunk(
  'video/likeVideo',
  async (videoId: string, { rejectWithValue }) => {
    try {
      const response = await api.post<number>(`/videos/${videoId}/like`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to like video');
    }
  }
);

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideoDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVideoDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.videoDetails = action.payload;
      })
      .addCase(fetchVideoDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        if (state.videoDetails) {
          state.videoDetails.comments.push(action.payload);
        }
      })
      .addCase(likeVideo.fulfilled, (state, action) => {
        if (state.videoDetails && state.videoDetails.video) {
          state.videoDetails.video.likes = action.payload;
        }
      });
  },
});

export default videoSlice.reducer;