package routes

import (
    "github.com/gin-gonic/gin"
    "backend/controllers"
)

func ProfileRoutes(router *gin.Engine, pc *controllers.ProfileController) {
    router.GET("/profile/:username", pc.GetProfileByUsername)
}
