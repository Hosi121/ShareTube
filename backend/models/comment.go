package models

import "time"

// Comment represents a comment on a video
type Comment struct {
	ID        uint      `json:"id" gorm:"primary_key"`
	VideoID   uint      `json:"video_id" gorm:"not null"`
	UserID    uint      `json:"user_id" gorm:"not null"`
	Comment   string    `json:"comment" gorm:"not null"`
	Timestamp time.Time `json:"timestamp" gorm:"not null"`
}

// PostCommentInput represents the input for posting a comment
type PostCommentInput struct {
	VideoID uint   `json:"video_id" binding:"required"`
	Comment string `json:"comment" binding:"required"`
}

