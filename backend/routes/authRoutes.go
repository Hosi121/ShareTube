package routes

import (
    "github.com/gin-gonic/gin"
    "backend/controllers"
)

func AuthRoutes(r *gin.Engine, auth *controllers.AuthController) {
    r.POST("/register", auth.Register)
    r.POST("/login", auth.Login)
    r.POST("/logout", auth.Logout)
}
