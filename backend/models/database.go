package models

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func SetDatabase(database *gorm.DB) {
	DB = database
}

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

	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Could not connect to the database: %v", err)
	}

	// Create tables
	DB.AutoMigrate(&User{}, &Class{}, &Video{}, &Comment{}, &VideoTag{}, &Tag{})
}

// ResetDatabase resets the database by dropping and recreating it
func ResetDatabase() {
	DB.Exec("DROP DATABASE IF EXISTS test_video_sns")
	DB.Exec("CREATE DATABASE test_video_sns")
	ConnectDatabase()
}