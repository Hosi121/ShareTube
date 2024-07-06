package main

import (
    "backend/models"
    "backend/routes"
    "github.com/gin-gonic/gin"
    "github.com/joho/godotenv"
    "log"
    "os"
)

func main() {
    // 環境変数をロード
    err := godotenv.Load()
    if err != nil {
        log.Fatal("Error loading .env file")
    }

    r := gin.Default()

    models.ConnectDatabase()

    routes.AuthRoutes(r)

    // ポートを指定してサーバーを起動
    port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
    }
    r.Run(":" + port)
}
