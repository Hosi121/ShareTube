package routes

import (
    "backend/controllers"
    "backend/middleware"

    "github.com/gin-gonic/gin"
)

func RegisterClassRoutes(r *gin.Engine, cc *controllers.ClassController) {
    r.POST("/class", middleware.AuthMiddleware(), cc.RegisterClass)
}

func GetAllClassesRoutes(r *gin.Engine, cc *controllers.ClassController) {
    r.GET("/classes", cc.GetAllClasses)
}
