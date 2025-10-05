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

func (vc *VideoController) Search(c *gin.Context) {
    q := c.Query("q")
    if q == "" {
        c.Error(&apperrors.AppError{Code: "INVALID_QUERY", Message: "Missing query", StatusCode: http.StatusBadRequest})
        return
    }
    topK := 10
    if v := c.Query("top_k"); v != "" {
        if n, err := strconv.Atoi(v); err == nil { topK = n }
    }
    res, err := vc.svc.Search(context.Background(), q, topK)
    if err != nil { c.Error(err); return }
    c.JSON(http.StatusOK, res)
}
