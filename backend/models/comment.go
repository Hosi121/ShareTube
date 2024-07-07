package models

import (
    "time"

    "github.com/jinzhu/gorm"
)

// Comment represents a comment on a video
type Comment struct {
    ID        uint      `json:"id" gorm:"primary_key"`
    VideoID   uint      `json:"video_id" gorm:"not null"`
    UserID    uint      `json:"user_id" gorm:"not null"`
    Comment   string    `json:"comment" gorm:"not null"`
    CreatedAt time.Time `json:"created_at" gorm:"not null"`
}

// PostCommentInput represents the input for posting a comment
type PostCommentInput struct {
    VideoID uint   `json:"video_id" binding:"required"`
    Comment string `json:"comment" binding:"required"`
}

var db *gorm.DB

// SetDatabase sets the database connection
func SetDatabase(database *gorm.DB) {
    db = database
}

// GetCommentsByVideoID retrieves comments by video ID
func GetCommentsByVideoID(videoID uint) ([]Comment, error) {
    var comments []Comment
    if err := db.Where("video_id = ?", videoID).Find(&comments).Error; err != nil {
        return nil, err
    }
    return comments, nil
}
