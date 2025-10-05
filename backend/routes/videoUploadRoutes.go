package routes

import (
    "backend/controllers"
    "backend/middleware"
    "github.com/gin-gonic/gin"
)

func VideoUploadRoutes(router *gin.Engine) {
    router.POST("/upload", middleware.AuthMiddleware(), controllers.UploadVideo)
}
