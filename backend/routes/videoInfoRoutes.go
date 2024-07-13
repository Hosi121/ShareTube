package routes

import (
    "github.com/gin-gonic/gin"
    "backend/controllers"
)

func VideoRoutes(router *gin.Engine) {
    router.GET("/videos/:id", controllers.GetVideo)
}

