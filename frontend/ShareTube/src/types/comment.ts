import { User } from './user';

export interface VideoComment {
    id: number;
    video_id: number;
    user_id: number;
    comment: string;
    timestamp: string;
    user: User
}

export interface PostCommentInput {
    video_id: number;
    comment: string;
}

