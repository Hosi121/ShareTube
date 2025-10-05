package routes

import (
    "github.com/gin-gonic/gin"
    "backend/controllers"
)

func VideoRoutes(router *gin.Engine, vc *controllers.VideoController) {
    router.GET("/videos/:id", vc.GetVideo)
    router.GET("/videos/search", vc.Search)
}
