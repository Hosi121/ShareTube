package controllers

import (
    "net/http"
    "time"

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

func PostComment(c *gin.Context) {
    var input models.PostCommentInput
    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    comment := models.Comment{
        VideoID:   input.VideoID,
        UserID:    c.GetUint("user_id"), // Assuming user ID is stored in context after authentication
        Comment:   input.Comment,
        CreatedAt: time.Now(),
    }

    if err := models.SaveComment(&comment); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, comment)
}