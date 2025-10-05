package middleware

import (
    "net/http"

    "backend/pkg/apperrors"
    "github.com/gin-gonic/gin"
)

func ErrorHandler() gin.HandlerFunc {
    return func(c *gin.Context) {
        c.Next()
        if len(c.Errors) == 0 {
            return
        }
        last := c.Errors.Last().Err
        if appErr, ok := last.(*apperrors.AppError); ok {
            c.JSON(appErr.StatusCode, appErr)
            return
        }
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Internal server error"})
    }
}

