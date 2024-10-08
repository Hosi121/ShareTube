package models

import (
	"errors"
	"log/slog"
	"time"

	"gorm.io/gorm"
)

// Comment represents a comment on a video
type Comment struct {
	ID        uint      `json:"id" gorm:"primary_key"`
	VideoID   uint      `json:"video_id" gorm:"not null"`
	UserID    uint      `json:"user_id" gorm:"not null"`
	Comment   string    `json:"comment" gorm:"not null"`
	Likes     int       `json:"likes" gorm:"default:0"`
	CreatedAt time.Time `json:"created_at" gorm:"not null"`
}

// PostCommentInput represents the input for posting a comment
type PostCommentInput struct {
	VideoID uint   `json:"video_id" binding:"required"`
	Comment string `json:"comment" binding:"required"`
}

// GetCommentsByVideoID retrieves comments by video ID
func GetCommentsByVideoID(videoID uint) ([]Comment, error) {
	var comments []Comment
	if err := DB.Where("video_id = ?", videoID).Find(&comments).Error; err != nil {
		return nil, err
	}
	return comments, nil
}

func SaveComment(comment *Comment) error {
	if err := DB.Create(comment).Error; err != nil {
		return err
	}
	return nil
}

func LikeComment(commentID uint) (int, error) {
	var comment Comment
	if err := DB.First(&comment, commentID).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			// Log warning for 4xx client error when record is not found
			slog.Warn("Record not found (4xx client error)", "commentID", commentID)
		}
		return 0, err
	}
	comment.Likes++
	if err := DB.Save(&comment).Error; err != nil {
		return 0, err
	}
	return comment.Likes, nil
}
