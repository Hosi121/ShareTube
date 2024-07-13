import { VideoComment } from './comment';

export interface Video {
    id: number;
    user_id: number;
    title: string;
    description: string;
    video_url: string;
    likes: number;
    created_at: Date;
    tags: Tag[];
}

export interface Tag {
    id: number;
    name: string;
}

export interface UploadVideoInput {
    title: string;
    description: string;
    file: File;
}

export interface VideoDetails {
    video: Video;
    comments: VideoComment[];
}
