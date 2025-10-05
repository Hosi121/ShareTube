package middleware

import (
    "net/http"
    "strings"

    "github.com/gin-gonic/gin"
    "backend/auth"
)

func AuthMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        authHeader := c.GetHeader("Authorization")
        if authHeader == "" {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header is required"})
            c.Abort()
            return
        }

        tokenString := strings.TrimPrefix(authHeader, "Bearer ")
        claims, err := auth.VerifyJWT(tokenString)
        if err != nil {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
            c.Abort()
            return
        }

        // Set user id in context for downstream handlers
        c.Set("user_id", claims.UserID)
        c.Set("userID", claims.UserID)
        c.Next()
    }
}
