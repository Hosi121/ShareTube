package controllers

import (
    "net/http"
    "backend/models"
    "backend/utils"
    "github.com/gin-gonic/gin"
    "github.com/jinzhu/gorm"
)

// User registration handler
func Register(c *gin.Context) {
    var input models.RegisterInput
    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
        return
    }

    // Check if the user already exists
    if _, err := models.GetUserByEmail(input.Email); err == nil {
        c.JSON(http.StatusConflict, gin.H{"error": "Email already registered"})
        return
    }

    hashedPassword, err := utils.HashPassword(input.Password)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
        return
    }

    user := models.User{
        Username: input.Username,
        Email:    input.Email,
        Password: hashedPassword,
    }

    if err := models.CreateUser(&user); err != nil {
        if gorm.IsRecordNotFoundError(err) {
            c.JSON(http.StatusConflict, gin.H{"error": "Username already exists"})
            return
        }
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "User registered successfully"})
}

// User login handler
func Login(c *gin.Context) {
    var input models.LoginInput
    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
        return
    }

    user, err := models.GetUserByEmail(input.Email)
    if err != nil {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
        return
    }

    if !utils.CheckPasswordHash(input.Password, user.Password) {
        c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
        return
    }

    token, err := utils.GenerateJWT(user.ID)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"token": token, "username": user.Username, "message": "Login successful"})
}

// User logout handler
func Logout(c *gin.Context) {
    // Invalidate the JWT token by simply returning a success message
    c.JSON(http.StatusOK, gin.H{"message": "User logged out successfully"})
}
