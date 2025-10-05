package controllers

import (
    "context"
    "net/http"
    "strconv"

    "backend/services"
    "github.com/gin-gonic/gin"
)

type ProfileController struct { svc services.ProfileService }

func NewProfileController(s services.ProfileService) *ProfileController { return &ProfileController{svc: s} }

func (pc *ProfileController) GetProfile(c *gin.Context) {
    id, err := strconv.ParseUint(c.Param("id"), 10, 32)
    if err != nil { c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"}); return }
    user, err := pc.svc.GetByID(context.Background(), uint(id))
    if err != nil { c.Error(err); return }
    c.JSON(http.StatusOK, user)
}

func (pc *ProfileController) GetProfileByUsername(c *gin.Context) {
    username := c.Param("username")
    user, err := pc.svc.GetByUsername(context.Background(), username)
    if err != nil { c.Error(err); return }
    c.JSON(http.StatusOK, user)
}
