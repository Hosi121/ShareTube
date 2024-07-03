package middleware

import (
    "net/http"
    "strings"

    "github.com/gin-gonic/gin"
    "backend/utils"
)

func AuthMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
		// Authorizationヘッダーの取得
        authHeader := c.GetHeader("Authorization")
        if authHeader == "" {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header is required"})
            c.Abort()
            return
        }
		
		// JWTの検証
        tokenString := strings.TrimPrefix(authHeader, "Bearer ")
        claims, err := utils.VerifyJWT(tokenString)
        if err != nil {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
            c.Abort()
            return
        }

		// ユーザー情報のコンテキストへの追加
        c.Set("userID", claims.UserID)
        c.Next()
    }
}