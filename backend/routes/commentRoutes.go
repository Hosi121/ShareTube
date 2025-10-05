package routes

import (
    "backend/controllers"
    "backend/middleware"
    "github.com/gin-gonic/gin"
)

func CommentRoutes(router *gin.Engine) {
    router.GET("/comments/:video_id", controllers.GetComments)
    router.POST("/comments", middleware.AuthMiddleware(), controllers.PostComment)
    router.POST("/comments/:comment_id/like", middleware.AuthMiddleware(), controllers.LikeComment)
}
