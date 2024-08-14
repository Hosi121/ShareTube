package routes

import (
	"backend/controllers"

	"github.com/gin-gonic/gin"
)

func ClassRoutes(r *gin.Engine) {
	r.POST("/class", controllers.RegisterClass)
}

func RegisterRoutes(r *gin.Engine) {
	r.GET("/classes", controllers.GetAllClasses)
}
