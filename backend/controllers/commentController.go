package controllers

import (
    "context"
    "net/http"
    "strconv"

    "backend/services"
    "github.com/gin-gonic/gin"
)

type CommentController struct { svc services.CommentService }

func NewCommentController(s services.CommentService) *CommentController { return &CommentController{svc: s} }

func (cc *CommentController) GetComments(c *gin.Context) {
    videoID, err := strconv.ParseUint(c.Param("video_id"), 10, 32)
    if err != nil { c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Invalid video ID"}); return }
    list, err := cc.svc.ListByVideo(context.Background(), uint(videoID))
    if err != nil { c.Error(err); return }
    c.JSON(http.StatusOK, list)
}

type postCommentBody struct { VideoID uint `json:"video_id" binding:"required"`; Comment string `json:"comment" binding:"required"` }

func (cc *CommentController) PostComment(c *gin.Context) {
    var body postCommentBody
    if err := c.ShouldBindJSON(&body); err != nil { c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()}); return }
    userID := c.GetUint("user_id")
    comment, err := cc.svc.Post(context.Background(), userID, body.VideoID, body.Comment)
    if err != nil { c.Error(err); return }
    c.JSON(http.StatusOK, comment)
}

func (cc *CommentController) LikeComment(c *gin.Context) {
    cid, err := strconv.ParseUint(c.Param("comment_id"), 10, 32)
    if err != nil { c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "Invalid comment ID"}); return }
    likes, err := cc.svc.Like(context.Background(), uint(cid))
    if err != nil { c.Error(err); return }
    c.JSON(http.StatusOK, gin.H{"likes": likes})
}
