package routes

import (
    "github.com/gin-gonic/gin"
    "backend/controllers"
)

func AuthRoutes(r *gin.Engine) {
    r.POST("/register", controllers.Register)
    r.POST("/login", controllers.Login)
    r.POST("/logout", controllers.Logout)
}