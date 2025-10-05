package routes

import (
	"backend/controllers"
	"backend/middleware"

	"github.com/gin-gonic/gin"
)

func RegisterClassRoutes(r *gin.Engine) {
	r.POST("/class", middleware.AuthMiddleware(), controllers.RegisterClass)
}

func GetAllClassesRoutes(r *gin.Engine) {
	r.GET("/classes", controllers.GetAllClasses)
}
