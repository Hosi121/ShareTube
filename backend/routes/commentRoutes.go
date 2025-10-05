package routes

import (
    "backend/controllers"
    "backend/middleware"
    "github.com/gin-gonic/gin"
)

func CommentRoutes(router *gin.Engine, cc *controllers.CommentController) {
    router.GET("/comments/:video_id", cc.GetComments)
    router.POST("/comments", middleware.AuthMiddleware(), cc.PostComment)
    router.POST("/comments/:comment_id/like", middleware.AuthMiddleware(), cc.LikeComment)
}
