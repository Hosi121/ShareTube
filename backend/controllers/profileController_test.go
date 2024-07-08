package controllers

import (
    "backend/models"
    "encoding/json"
    "errors"
    "net/http"
    "net/http/httptest"
    "testing"

    "github.com/gin-gonic/gin"
    "github.com/stretchr/testify/assert"
)

// テスト用のユーザーデータを用意
var mockUser = models.User{ID: 1, Username: "TestUser", Email: "test@example.com"}

func TestGetProfile(t *testing.T) {
    // テストのためのGinエンジンをセットアップ
    r := gin.Default()
    r.GET("/profile/:id", GetProfile)

    // 正常系テスト
    t.Run("Normal Case", func(t *testing.T) {
        originalFunc := models.GetUserByID
        defer func() { models.GetUserByID = originalFunc }() // 元の関数を復元
        models.GetUserByID = func(userID uint) (models.User, error) {
            return mockUser, nil
        }
        req, _ := http.NewRequest("GET", "/profile/1", nil)
        w := httptest.NewRecorder()
        r.ServeHTTP(w, req)

        assert.Equal(t, http.StatusOK, w.Code)

        var user models.User
        err := json.Unmarshal(w.Body.Bytes(), &user)
        assert.NoError(t, err)
        assert.Equal(t, "TestUser", user.Username)
    })

    // 異常系テスト: 無効なuser_id
    t.Run("Invalid User ID", func(t *testing.T) {
        req, _ := http.NewRequest("GET", "/profile/invalid", nil)
        w := httptest.NewRecorder()
        r.ServeHTTP(w, req)

        assert.Equal(t, http.StatusBadRequest, w.Code)
    })

    // 異常系テスト: ユーザー取得エラー
    t.Run("Error Case", func(t *testing.T) {
        originalFunc := models.GetUserByID
        defer func() { models.GetUserByID = originalFunc }() // 元の関数を復元
        models.GetUserByID = func(userID uint) (models.User, error) {
            return models.User{}, errors.New("Database error")
        }
        req, _ := http.NewRequest("GET", "/profile/1", nil)
        w := httptest.NewRecorder()
        r.ServeHTTP(w, req)

        assert.Equal(t, http.StatusInternalServerError, w.Code)
    })
}
