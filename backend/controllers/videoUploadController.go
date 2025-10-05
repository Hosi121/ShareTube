package controllers

import (
    "backend/models"
    "crypto/rand"
    "encoding/hex"
    "github.com/gin-gonic/gin"
    "log"
    "net/http"
    "os"
    "path/filepath"
    "strings"
    "time"
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

    // ファイル形式バリデーション（拡張子検証を小文字で）
    allowedExtensions := []string{".mp4", ".avi", ".mov"}
    fileExtension := strings.ToLower(filepath.Ext(file.Filename))
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
        // より制限的なパーミッションでディレクトリ作成
        if err := os.MkdirAll(saveDir, 0o750); err != nil {
            c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to prepare upload directory"})
            return
        }
    }
    log.Println("Directory setup completed")

    // 安全な一意のファイル名を生成
    // 元のファイル名は保存に使用しない（パストラバーサル対策）
    randBytes := make([]byte, 16)
    if _, err := rand.Read(randBytes); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to generate filename"})
        return
    }
    safeName := hex.EncodeToString(randBytes) + fileExtension

    filePath := filepath.Join(saveDir, safeName)
    if err := c.SaveUploadedFile(file, filePath); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    log.Println("File saved to disk")

    // コンテキストからユーザーIDを取得
    userID := c.GetUint("user_id")
    if userID == 0 {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
        // 後続のDB保存前なのでファイル削除は不要
        return
    }
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
        // DB保存に失敗した場合、ディスクのファイルをクリーンアップ
        _ = os.Remove(filePath)
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    log.Printf("Video record saved successfully: %+v", video)
    c.JSON(http.StatusOK, gin.H{"message": "Video uploaded successfully", "video": video})
}
