package main

import (
    "backend/models"
    "backend/routes"
    "backend/middleware"
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

    // CORS ミドルウェアを適用
    r.Use(middleware.CORSMiddleware())

    models.ConnectDatabase()

    // データベース接続を設定
    models.SetDatabase(models.DB)

    // ルートを設定
    routes.AuthRoutes(r)
    routes.ProfileRoutes(r) 
    routes.CommentRoutes(r)

    // ポートを指定してサーバーを起動
    port := os.Getenv("PORT")
    if port == "" {
        port = "8080"
    }
    r.Run(":" + port)
}
