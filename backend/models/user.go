package models

import (
    "time"

    "github.com/jinzhu/gorm"
)

// User represents a user in the system
type User struct {
    ID        uint      `json:"id" gorm:"primary_key"`
    Username  string    `json:"username" gorm:"unique;not null"`
    Email     string    `json:"email" gorm:"unique;not null"`
    Password  string    `json:"-" gorm:"not null"`
    CreatedAt time.Time `json:"created_at"`
}

// RegisterInput represents the input for user registration
type RegisterInput struct {
    Username string `json:"username" binding:"required"`
    Email    string `json:"email" binding:"required,email"`
    Password string `json:"password" binding:"required,min=8"`
}

// LoginInput represents the input for user login
type LoginInput struct {
    Email    string `json:"email" binding:"required,email"`
    Password string `json:"password" binding:"required"`
}

var db *gorm.DB

// データベース接続を設定する関数
func SetDatabase(database *gorm.DB) {
    db = database
}

// ユーザーを作成する関数
func CreateUser(user *User) error {
    return db.Create(user).Error
}

// メールアドレスでユーザーを取得する関数
func GetUserByEmail(email string) (*User, error) {
    var user User
    if err := db.Where("email = ?", email).First(&user).Error; err != nil {
        return nil, err
    }
    return &user, nil
}
