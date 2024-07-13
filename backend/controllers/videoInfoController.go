package controllers

import (
    "net/http"
    "strconv"

    "github.com/gin-gonic/gin"
    "backend/models"
)

func GetVideo(c *gin.Context) {
    videoID, err := strconv.ParseUint(c.Param("id"), 10, 32)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid video ID"})
        return
    }

    video, err := models.GetVideoByID(uint(videoID))
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, video)
}

