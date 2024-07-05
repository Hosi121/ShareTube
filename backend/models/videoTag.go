package models

// VideoTag represents the many-to-many relationship between videos and tags
type VideoTag struct {
	VideoID uint `json:"video_id" gorm:"primary_key"`
	TagID   uint `json:"tag_id" gorm:"primary_key"`
}

