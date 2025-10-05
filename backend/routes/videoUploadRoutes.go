package routes

import (
    "backend/controllers"
    "backend/middleware"
    "github.com/gin-gonic/gin"
)

func VideoUploadRoutes(router *gin.Engine, uc *controllers.UploadController) {
    router.POST("/upload", middleware.AuthMiddleware(), uc.UploadVideo)
}
