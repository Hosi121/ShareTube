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

export interface VideoAnalytics {
    videoId: number;
    title: string;
    views: number;
    averageViewDuration: number; // 秒単位
    totalDuration: number; // 秒単位（新しく追加）
    retentionRate: number; // パーセンテージ (0-100)
    engagementRate: number; // パーセンテージ (0-100)
    comments: number;
}

export interface ClassAnalytics {
    classId: string;
    className: string;
    totalViews: number;
    averageRetentionRate: number;
    videos: VideoAnalytics[];
}