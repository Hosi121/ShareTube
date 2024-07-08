package routes

import (
    "github.com/gin-gonic/gin"
    "backend/controllers"
)

func ProfileRoutes(router *gin.Engine) {
    router.GET("/profile/:id", controllers.GetProfile)
}