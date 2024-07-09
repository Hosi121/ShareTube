package routes

import (
    "backend/controllers"
    "github.com/gin-gonic/gin"
)

// VideoUploadRoutes sets up the video upload routes
func VideoUploadRoutes(router *gin.Engine) {
    videoGroup := router.Group("/videos")
    {
        videoGroup.POST("/upload", controllers.UploadVideo)
    }
}
