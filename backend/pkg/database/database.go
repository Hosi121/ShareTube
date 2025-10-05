package database

import (
    "fmt"
    "log/slog"
    "os"

    "backend/models"
    "gorm.io/driver/mysql"
    "gorm.io/gorm"
)

func NewDB() (*gorm.DB, error) {
    dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
        os.Getenv("DB_USER"),
        os.Getenv("DB_PASSWORD"),
        os.Getenv("DB_HOST"),
        os.Getenv("DB_PORT"),
        os.Getenv("DB_NAME"),
    )
    slog.Info("Connecting to database", "host", os.Getenv("DB_HOST"), "db", os.Getenv("DB_NAME"))
    db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
    if err != nil {
        return nil, err
    }
    if err := db.AutoMigrate(&models.User{}, &models.Class{}, &models.Video{}, &models.Comment{}, &models.VideoTag{}, &models.Tag{}); err != nil {
        return nil, err
    }
    return db, nil
}

