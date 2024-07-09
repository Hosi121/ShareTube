package controllers

import (
    "backend/models"
    "github.com/gin-gonic/gin"
    "net/http"
    "os"
    "path/filepath"
    "time"
)

// UploadVideo handles the video upload process
func UploadVideo(c *gin.Context) {
    var input models.UploadVideoInput
    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    file, err := c.FormFile("file")
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "No file is received"})
        return
    }

    // ファイルサイズバリデーション
    const maxFileSize = 10 << 20 // 10 MB
    if file.Size > maxFileSize {
        c.JSON(http.StatusBadRequest, gin.H{"error": "File is too large"})
        return
    }

    // ファイル形式バリデーション
    allowedExtensions := []string{".mp4", ".avi", ".mov"}
    fileExtension := filepath.Ext(file.Filename)
    isAllowed := false
    for _, ext := range allowedExtensions {
        if fileExtension == ext {
            isAllowed = true
            break
        }
    }
    if !isAllowed {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid file format"})
        return
    }

    // 一時保存ディレクトリにファイルを保存
    saveDir := "./uploads"
    if _, err := os.Stat(saveDir); os.IsNotExist(err) {
        os.Mkdir(saveDir, os.ModePerm)
    }

    filePath := filepath.Join(saveDir, file.Filename)
    if err := c.SaveUploadedFile(file, filePath); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    // データベースに動画情報を保存
    video := models.Video{
        UserID:      1, // 実際のユーザーIDに置き換える
        Title:       input.Title,
        Description: input.Description,
        VideoURL:    filePath,
        CreatedAt:   time.Now(),
    }

    if err := models.DB.Create(&video).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Video uploaded successfully", "video": video})
}
