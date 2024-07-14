package controllers

import (
    "net/http"
    "strconv"

    "github.com/gin-gonic/gin"
    "backend/models"
)

func GetProfile(c *gin.Context) {
    userID, err := strconv.ParseUint(c.Param("id"), 10, 32)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
        return
    }

    user, err := models.GetUserByID(uint(userID))
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, user)
}

func GetProfileByUsername(c *gin.Context) {
    username := c.Param("username")

    user, err := models.GetUserByUsername(username)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, user)
}