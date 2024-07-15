package models

import (
    "time"
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

// CreateUser creates a new user
func CreateUser(user *User) error {
    return DB.Create(user).Error
}

// GetUserByID retrieves a user by its ID
func GetUserByID(id uint) (*User, error) {
    var user User
    if err := DB.First(&user, id).Error; err != nil {
        return nil, err
    }
    return &user, nil
}

// GetUserByEmail retrieves a user by its email
func GetUserByEmail(email string) (*User, error) {
    var user User
    if err := DB.Where("email = ?", email).First(&user).Error; err != nil {
        return nil, err
    }
    return &user, nil
}

// GetUserByUsername retrieves a user by its username
func GetUserByUsername(username string) (*User, error) {
    var user User
    if err := DB.Where("username = ?", username).First(&user).Error; err != nil {
        return nil, err
    }
    return &user, nil
}