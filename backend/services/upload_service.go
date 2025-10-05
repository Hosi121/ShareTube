package services

import (
    "context"
    "crypto/rand"
    "encoding/hex"
    "io"
    "mime/multipart"
    "os"
    "path/filepath"
    "strings"
    "time"

    "backend/models"
    "backend/repositories"
)

type UploadService interface {
    UploadVideo(ctx context.Context, userID uint, title, description string, file *multipart.FileHeader) (*models.Video, error)
}

type uploadService struct { videos repositories.VideoRepository }

func NewUploadService(videos repositories.VideoRepository) UploadService { return &uploadService{videos: videos} }

func (s *uploadService) UploadVideo(ctx context.Context, userID uint, title, description string, file *multipart.FileHeader) (*models.Video, error) {
    const maxFileSize = 10 << 20 // 10MB
    if file.Size > maxFileSize {
        return nil, ErrFileTooLarge
    }
    allowed := []string{".mp4", ".avi", ".mov"}
    ext := strings.ToLower(filepath.Ext(file.Filename))
    ok := false
    for _, a := range allowed { if a == ext { ok = true; break } }
    if !ok { return nil, ErrInvalidFileFormat }

    saveDir := os.Getenv("UPLOAD_DIR")
    if saveDir == "" { saveDir = "./uploads" }
    if _, err := os.Stat(saveDir); os.IsNotExist(err) {
        if err := os.MkdirAll(saveDir, 0o750); err != nil { return nil, err }
    }

    // generate safe filename
    rb := make([]byte, 16)
    if _, err := rand.Read(rb); err != nil { return nil, err }
    safe := hex.EncodeToString(rb) + ext
    path := filepath.Join(saveDir, safe)

    src, err := file.Open()
    if err != nil { return nil, err }
    defer src.Close()
    dst, err := os.OpenFile(path, os.O_CREATE|os.O_WRONLY|os.O_TRUNC, 0o640)
    if err != nil { return nil, err }
    if _, err := io.Copy(dst, src); err != nil { dst.Close(); _ = os.Remove(path); return nil, err }
    dst.Close()

    v := models.Video{UserID: userID, Title: title, Description: description, VideoURL: path, Likes: 0, CreatedAt: time.Now()}
    if err := s.videos.Create(ctx, &v); err != nil { _ = os.Remove(path); return nil, err }
    return &v, nil
}

var (
    ErrFileTooLarge      = &UploadError{"FILE_TOO_LARGE", "File is too large"}
    ErrInvalidFileFormat = &UploadError{"INVALID_FILE_FORMAT", "Invalid file format"}
)

type UploadError struct { Code, Message string }
func (e *UploadError) Error() string { return e.Message }

