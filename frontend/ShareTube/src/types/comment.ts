import { User } from './user';

export interface VideoComment {
    id: number;
    video_id: number;
    user_id: number;
    comment: string;
    timestamp: Date;
    user: User
}

export interface PostCommentInput {
    video_id: number;
    comment: string;
}

