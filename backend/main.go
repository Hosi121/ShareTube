package main

import (
    "github.com/gin-gonic/gin"
    "backend/controllers"
    "backend/middleware"
    "backend/models"
    "backend/routes"
)

func main() {
    r := gin.Default()

    models.ConnectDatabase()

    r.Use(middleware.CORSMiddleware())

    routes.AuthRoutes(r)
    routes.VideoRoutes(r)
    routes.CommentRoutes(r)
    routes.ProfileRoutes(r)

    r.Run()
}

