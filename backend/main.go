package main

import (
    "backend/config"
    "backend/controllers"
    "backend/middleware"
    "backend/pkg/database"
    "backend/repositories"
    "backend/routes"
    "backend/services"
    "log"

    "github.com/gin-gonic/gin"
)

func main() {
	// 環境設定をロード
	cfg := config.LoadConfig()

    r := gin.Default()

    // CORS ミドルウェアを適用
    r.Use(middleware.CORSMiddleware())
    // Error ハンドラを適用
    r.Use(middleware.ErrorHandler())

    // データベース接続を設定 (DI)
    db, err := database.NewDB()
    if err != nil {
        log.Fatalf("failed to connect DB: %v", err)
    }

    // Repository and Service wiring
    userRepo := repositories.NewUserRepository(db)
    videoRepo := repositories.NewVideoRepository(db)
    commentRepo := repositories.NewCommentRepository(db)
    classRepo := repositories.NewClassRepository(db)

    authService := services.NewAuthService(userRepo)
    videoService := services.NewVideoService(videoRepo)
    commentService := services.NewCommentService(commentRepo)
    classService := services.NewClassService(classRepo)
    profileService := services.NewProfileService(userRepo)
    uploadService := services.NewUploadService(videoRepo)

    authController := controllers.NewAuthController(authService)
    videoController := controllers.NewVideoController(videoService)
    commentController := controllers.NewCommentController(commentService)
    classController := controllers.NewClassController(classService)
    profileController := controllers.NewProfileController(profileService)
    uploadController := controllers.NewUploadController(uploadService)

    // ルートを設定
    routes.AuthRoutes(r, authController)
    routes.ProfileRoutes(r, profileController)
    routes.CommentRoutes(r, commentController)
    routes.VideoUploadRoutes(r, uploadController)
    routes.VideoRoutes(r, videoController)
    routes.RegisterClassRoutes(r, classController)
    routes.GetAllClassesRoutes(r, classController)

	// ポートを指定してサーバーを起動
	log.Printf("Server is running on port %s", cfg.Port)
	r.Run(":" + cfg.Port)
}
