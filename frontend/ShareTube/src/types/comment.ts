export interface Comment {
    id: number;
    video_id: number;
    user_id: number;
    comment: string;
    timestamp: string;
}

export interface PostCommentInput {
    video_id: number;
    comment: string;
}

