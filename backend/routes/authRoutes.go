package routes

import (
    "github.com/gin-gonic/gin"
    "backend/controllers"
)

func AuthRoutes(router *gin.Engine) {
    router.POST("/api/register", controllers.RegisterUser)
    router.POST("/api/login", controllers.LoginUser)
    router.POST("/api/logout", controllers.LogoutUser)
}
