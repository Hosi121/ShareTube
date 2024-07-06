package models

import (
    "fmt"
    "log"
    "os"

    "github.com/jinzhu/gorm"
    _ "github.com/jinzhu/gorm/dialects/mysql"
)

var DB *gorm.DB

// ConnectDatabase initializes the database connection
func ConnectDatabase() {
    var err error
    dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
        os.Getenv("DB_USER"),
        os.Getenv("DB_PASSWORD"),
        os.Getenv("DB_HOST"),
        os.Getenv("DB_PORT"),
        os.Getenv("DB_NAME"),
    )

    log.Printf("Connecting to database with DSN: %s", dsn) // デバッグ用のログ出力

    DB, err = gorm.Open("mysql", dsn)
    if err != nil {
        log.Fatalf("Could not connect to the database: %v", err)
    }

    // Create tables
    DB.AutoMigrate(&User{})
}

// ResetDatabase resets the database by dropping and recreating it
func ResetDatabase() {
    DB.Exec("DROP DATABASE IF EXISTS test_video_sns")
    DB.Exec("CREATE DATABASE test_video_sns")
    ConnectDatabase()
}
