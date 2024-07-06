package controllers

import (
    "net/http"
    "net/http/httptest"
    "strings"
    "testing"
    "backend/models"
    "github.com/gin-gonic/gin"
    "github.com/stretchr/testify/assert"
    "golang.org/x/crypto/bcrypt"
)

func TestMain(m *testing.M) {
    models.ConnectDatabase()
    resetDatabase() // テスト前にデータベースをリセット
    m.Run()
}

func resetDatabase() {
    models.DB.Exec("DROP DATABASE IF EXISTS test_video_sns")
    models.DB.Exec("CREATE DATABASE test_video_sns")
    models.ConnectDatabase()
}

func TestRegisterUser(t *testing.T) {
    gin.SetMode(gin.TestMode)

    resetDatabase() // データベースをリセット

    router := gin.Default()
    router.POST("/api/register", RegisterUser)

    // 正常系のテスト
    newUser := `{"username": "testuser", "email": "test@example.com", "password": "password123"}`
    req, _ := http.NewRequest(http.MethodPost, "/api/register", strings.NewReader(newUser))
    req.Header.Set("Content-Type", "application/json")

    w := httptest.NewRecorder()
    router.ServeHTTP(w, req)

    assert.Equal(t, http.StatusOK, w.Code)

    // 異常系のテスト: 重複ユーザー
    w = httptest.NewRecorder()
    router.ServeHTTP(w, req)
    assert.Equal(t, http.StatusBadRequest, w.Code)

    // 異常系のテスト: 不正なリクエスト
    invalidUser := `{"username": "", "email": "invalid-email", "password": "short"}`
    req, _ = http.NewRequest(http.MethodPost, "/api/register", strings.NewReader(invalidUser))
    req.Header.Set("Content-Type", "application/json")

    w = httptest.NewRecorder()
    router.ServeHTTP(w, req)
    assert.Equal(t, http.StatusBadRequest, w.Code)
}

func TestLoginUser(t *testing.T) {
    gin.SetMode(gin.TestMode)

    resetDatabase() // データベースをリセット

    // テスト用ユーザーの作成
    hashedPassword, _ := bcrypt.GenerateFromPassword([]byte("password123"), bcrypt.DefaultCost)
    user := models.User{
        Username: "testuser",
        Email:    "test@example.com",
        Password: string(hashedPassword),
    }
    models.DB.Create(&user)

    router := gin.Default()
    router.POST("/api/login", LoginUser)

    // 正常系のテスト
    loginDetails := `{"email": "test@example.com", "password": "password123"}`
    req, _ := http.NewRequest(http.MethodPost, "/api/login", strings.NewReader(loginDetails))
    req.Header.Set("Content-Type", "application/json")

    w := httptest.NewRecorder()
    router.ServeHTTP(w, req)

    assert.Equal(t, http.StatusOK, w.Code)

    // 異常系のテスト: 無効なメール
    invalidEmail := `{"email": "wrong@example.com", "password": "password123"}`
    req, _ = http.NewRequest(http.MethodPost, "/api/login", strings.NewReader(invalidEmail))
    req.Header.Set("Content-Type", "application/json")

    w = httptest.NewRecorder()
    router.ServeHTTP(w, req)
    assert.Equal(t, http.StatusUnauthorized, w.Code)

    // 異常系のテスト: 無効なパスワード
    invalidPassword := `{"email": "test@example.com", "password": "wrongpassword"}`
    req, _ = http.NewRequest(http.MethodPost, "/api/login", strings.NewReader(invalidPassword))
    req.Header.Set("Content-Type", "application/json")

    w = httptest.NewRecorder()
    router.ServeHTTP(w, req)
    assert.Equal(t, http.StatusUnauthorized, w.Code)
}

func TestLogoutUser(t *testing.T) {
    gin.SetMode(gin.TestMode)

    resetDatabase() // データベースをリセット

    router := gin.Default()
    router.POST("/api/logout", LogoutUser)

    req, _ := http.NewRequest(http.MethodPost, "/api/logout", nil)

    w := httptest.NewRecorder()
    router.ServeHTTP(w, req)

    assert.Equal(t, http.StatusOK, w.Code)
}
