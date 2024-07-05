package models

import "time"

// Video represents a video in the system
type Video struct {
	ID          uint      `json:"id" gorm:"primary_key"`
	UserID      uint      `json:"user_id" gorm:"not null"`
	Title       string    `json:"title" gorm:"not null"`
	Description string    `json:"description"`
	VideoURL    string    `json:"video_url" gorm:"not null"`
	Likes       int       `json:"likes"`
	CreatedAt   time.Time `json:"created_at"`
	Tags        []Tag     `json:"tags" gorm:"many2many:video_tags;"`
}

// UploadVideoInput represents the input for uploading a video
type UploadVideoInput struct {
	Title       string `json:"title" binding:"required"`
	Description string `json:"description"`
	File        string `json:"file" binding:"required"`
}

