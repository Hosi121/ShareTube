package routes

import (
	"backend/controllers"

	"github.com/gin-gonic/gin"
)

func RegisterClassRoutes(r *gin.Engine) {
	r.POST("/class", controllers.RegisterClass)
}

func GetAllClassesRoutes(r *gin.Engine) {
	r.GET("/classes", controllers.GetAllClasses)
}
