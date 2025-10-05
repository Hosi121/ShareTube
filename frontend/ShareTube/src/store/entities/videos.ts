import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Video } from '../../types/video';

const videosAdapter = createEntityAdapter<Video>({ selectId: (v) => v.id as unknown as string });

const videosSlice = createSlice({
  name: 'entities/videos',
  initialState: videosAdapter.getInitialState(),
  reducers: {
    videosReceived: videosAdapter.setAll,
    videoAdded: videosAdapter.addOne,
    videoUpdated: videosAdapter.updateOne,
  },
});

export const { videosReceived, videoAdded, videoUpdated } = videosSlice.actions;
export default videosSlice.reducer;

