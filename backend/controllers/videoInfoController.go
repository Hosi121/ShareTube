package controllers

import (
    "context"
    "net/http"
    "strconv"

    "backend/pkg/apperrors"
    "backend/services"
    "github.com/gin-gonic/gin"
)

type VideoController struct { svc services.VideoService }

func NewVideoController(s services.VideoService) *VideoController { return &VideoController{svc: s} }

func (vc *VideoController) GetVideo(c *gin.Context) {
    id, err := strconv.ParseUint(c.Param("id"), 10, 32)
    if err != nil {
        c.Error(&apperrors.AppError{Code: "INVALID_ID", Message: "Invalid video ID", StatusCode: http.StatusBadRequest})
        return
    }
    v, err := vc.svc.GetByID(context.Background(), uint(id))
    if err != nil {
        c.Error(err)
        return
    }
    c.JSON(http.StatusOK, v)
}
