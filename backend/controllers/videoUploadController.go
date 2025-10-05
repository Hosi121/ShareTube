package controllers

import (
    "context"
    "log"
    "net/http"

    "backend/services"
    "github.com/gin-gonic/gin"
)

type UploadController struct { svc services.UploadService }

func NewUploadController(s services.UploadService) *UploadController { return &UploadController{svc: s} }

// UploadVideo handles the video upload process
func (uc *UploadController) UploadVideo(c *gin.Context) {
    log.Println("Starting UploadVideo handler")
    file, err := c.FormFile("file")
    if err != nil { c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "No file is received"}); return }
    title := c.PostForm("title")
    description := c.PostForm("description")

    userID := c.GetUint("user_id")
    if userID == 0 { c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"}); return }

    video, err := uc.svc.UploadVideo(context.Background(), userID, title, description, file)
    if err != nil { c.Error(err); return }
    c.JSON(http.StatusOK, gin.H{"message": "Video uploaded successfully", "video": video})
}
