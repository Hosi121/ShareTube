package routes

import (
    "github.com/gin-gonic/gin"
    "backend/controllers"
)

func ClassRoutes(r *gin.Engine) {
    r.POST("/class", controllers.RegisterClass)
}