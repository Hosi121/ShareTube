package routes

import (
    "backend/controllers"
    "github.com/gin-gonic/gin"
)

func VideoUploadRoutes(router *gin.Engine) {
    router.POST("/upload", controllers.UploadVideo)
}
