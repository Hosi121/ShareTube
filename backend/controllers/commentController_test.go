package controllers

import (
    "backend/models"
    "encoding/json"
    "errors"
    "net/http"
    "net/http/httptest"
    "testing"
    "time"

    "github.com/gin-gonic/gin"
    "github.com/stretchr/testify/assert"
)

// テスト用のコメントデータを用意
var mockComments = []models.Comment{
    {ID: 1, VideoID: 1, UserID: 1, Comment: "Test Comment 1", CreatedAt: time.Now()},
    {ID: 2, VideoID: 1, UserID: 2, Comment: "Test Comment 2", CreatedAt: time.Now()},
}

func TestGetComments(t *testing.T) {
    // テストのためのGinエンジンをセットアップ
    r := gin.Default()
    r.GET("/comments/:video_id", GetComments)

    // 正常系テスト
    t.Run("Normal Case", func(t *testing.T) {
        originalFunc := models.GetCommentsByVideoID
        defer func() { models.GetCommentsByVideoID = originalFunc }() // 元の関数を復元
        models.GetCommentsByVideoID = func(videoID uint) ([]models.Comment, error) {
            return mockComments, nil
        }
        req, _ := http.NewRequest("GET", "/comments/1", nil)
        w := httptest.NewRecorder()
        r.ServeHTTP(w, req)

        assert.Equal(t, http.StatusOK, w.Code)

        var comments []models.Comment
        err := json.Unmarshal(w.Body.Bytes(), &comments)
        assert.NoError(t, err)
        assert.Len(t, comments, 2)
        assert.Equal(t, "Test Comment 1", comments[0].Comment)
    })

    // 異常系テスト: 無効なvideo_id
    t.Run("Invalid Video ID", func(t *testing.T) {
        req, _ := http.NewRequest("GET", "/comments/invalid", nil)
        w := httptest.NewRecorder()
        r.ServeHTTP(w, req)

        assert.Equal(t, http.StatusBadRequest, w.Code)
    })

    // 異常系テスト: コメント取得エラー
    t.Run("Error Case", func(t *testing.T) {
        originalFunc := models.GetCommentsByVideoID
        defer func() { models.GetCommentsByVideoID = originalFunc }() // 元の関数を復元
        models.GetCommentsByVideoID = func(videoID uint) ([]models.Comment, error) {
            return nil, errors.New("Database error")
        }
        req, _ := http.NewRequest("GET", "/comments/1", nil)
        w := httptest.NewRecorder()
        r.ServeHTTP(w, req)

        assert.Equal(t, http.StatusInternalServerError, w.Code)
    })
}
