package routes

import (
    "github.com/gin-gonic/gin"
    "backend/controllers"
)

func CommentRoutes(router *gin.Engine) {
    router.GET("/comments/:video_id", controllers.GetComments)
    router.POST("/comments", controllers.PostComment)
}