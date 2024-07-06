package middleware

import (
    "net/http"
    "strings"

    "github.com/gin-gonic/gin"
    "backend/utils"
)

// AuthMiddleware returns a Gin middleware function for authenticating requests using JWT.
func AuthMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        authHeader := c.GetHeader("Authorization")
        if authHeader == "" {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header is required"})
            c.Abort()
            return
        }

        tokenString := strings.TrimPrefix(authHeader, "Bearer ")
        claims, err := utils.VerifyJWT(tokenString)
        if err != nil {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
            c.Abort()
            return
        }

        // Set the user ID from the JWT claims into the Gin context
        c.Set("userID", claims.UserID)
        c.Next()
    }
}
