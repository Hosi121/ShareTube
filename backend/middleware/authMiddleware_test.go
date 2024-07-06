package middleware

import (
    "net/http"
    "net/http/httptest"
    "testing"

    "github.com/gin-gonic/gin"
    "backend/utils"
)

func TestAuthMiddleware(t *testing.T) {
    gin.SetMode(gin.TestMode)

    // ユーザーIDを1とするトークンを生成
    tokenString, err := utils.GenerateJWT(1)
    if err != nil {
        t.Fatalf("Failed to generate JWT: %v", err)
    }

    tests := []struct {
        name           string
        token          string
        expectedStatus int
    }{
        {
            name:           "Valid token",
            token:          "Bearer " + tokenString,
            expectedStatus: http.StatusOK,
        },
        {
            name:           "Missing token",
            token:          "",
            expectedStatus: http.StatusUnauthorized,
        },
        {
            name:           "Invalid token",
            token:          "Bearer invalid.token.string",
            expectedStatus: http.StatusUnauthorized,
        },
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            router := gin.New()
            router.Use(AuthMiddleware())
            router.GET("/protected", func(c *gin.Context) {
                c.Status(http.StatusOK)
            })

            req, _ := http.NewRequest(http.MethodGet, "/protected", nil)
            if tt.token != "" {
                req.Header.Set("Authorization", tt.token)
            }

            w := httptest.NewRecorder()
            router.ServeHTTP(w, req)

            if w.Code != tt.expectedStatus {
                t.Fatalf("Expected status %d but got %d", tt.expectedStatus, w.Code)
            }
        })
    }
}
