package controllers

import (
    "net/http"
    "strconv"

    "github.com/gin-gonic/gin"
    "backend/models"
)

func GetComments(c *gin.Context) {
    videoID, err := strconv.ParseUint(c.Param("video_id"), 10, 32)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid video ID"})
        return
    }

    comments, err := models.GetCommentsByVideoID(uint(videoID))
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, comments)
}
