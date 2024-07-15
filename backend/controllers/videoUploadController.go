package controllers

import (
    "backend/models"
    "github.com/gin-gonic/gin"
    "net/http"
    "os"
    "path/filepath"
    "time"
    "log"
)

// UploadVideo handles the video upload process
func UploadVideo(c *gin.Context) {
    log.Println("Starting UploadVideo handler")

    // ファイルを取得
    file, err := c.FormFile("file")
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "No file is received"})
        return
    }
    log.Println("File received")

    // タイトルと説明を取得
    title := c.PostForm("title")
    description := c.PostForm("description")
    log.Printf("Received title: %s, description: %s, file: %s", title, description, file.Filename)

    // ファイルサイズバリデーション
    const maxFileSize = 10 << 20 // 10 MB
    if file.Size > maxFileSize {
        c.JSON(http.StatusBadRequest, gin.H{"error": "File is too large"})
        return
    }
    log.Println("File size validation passed")

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
    log.Println("File format validation passed")

    // 保存ディレクトリの設定（環境変数または設定ファイルから取得）
    saveDir := os.Getenv("UPLOAD_DIR")
    if saveDir == "" {
        saveDir = "./uploads"
    }

    if _, err := os.Stat(saveDir); os.IsNotExist(err) {
        os.Mkdir(saveDir, os.ModePerm)
    }
    log.Println("Directory setup completed")

    filePath := filepath.Join(saveDir, file.Filename)
    if err := c.SaveUploadedFile(file, filePath); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    log.Println("File saved to disk")

    // コンテキストからユーザーIDを取得
    // テスト用にユーザーIDをハードコード
    userID := uint(1)
    log.Printf("User ID: %d", userID)

    // データベースに動画情報を保存
    video := models.Video{
        UserID:      userID,
        Title:       title,
        Description: description,
        VideoURL:    filePath,
        Likes:       0, // Likes フィールドを初期化
        CreatedAt:   time.Now(),
    }

    log.Printf("Attempting to save video record: %+v", video)

    if err := models.DB.Create(&video).Error; err != nil {
        log.Printf("Error creating video record: %v", err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    log.Printf("Video record saved successfully: %+v", video)
    c.JSON(http.StatusOK, gin.H{"message": "Video uploaded successfully", "video": video})
}
