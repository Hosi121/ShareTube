package controllers

import (
	"backend/auth"
	"backend/models"
	"errors"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// User registration handler
func Register(c *gin.Context) {
	var input models.RegisterInput

	// Log the incoming request for debugging
	if err := c.ShouldBindJSON(&input); err != nil {
		log.Printf("Error binding JSON: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input", "details": err.Error()})
		return
	}

	log.Printf("Registering user: %v", input)

	// Check if the user already exists
	if _, err := models.GetUserByEmail(input.Email); err == nil {
		log.Printf("Email already registered: %s", input.Email)
		c.JSON(http.StatusConflict, gin.H{"error": "Email already registered"})
		return
	}

	hashedPassword, err := auth.HashPassword(input.Password)
	if err != nil {
		log.Printf("Error hashing password: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}

	user := models.User{
		Username: input.Username,
		Email:    input.Email,
		Password: hashedPassword,
	}

	if err := models.CreateUser(&user); err != nil {
		log.Printf("Error creating user: %v", err)
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusConflict, gin.H{"error": "Username already exists"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	log.Printf("User registered successfully: %s", input.Email)
	c.JSON(http.StatusOK, gin.H{"message": "User registered successfully"})
}

// User login handler
func Login(c *gin.Context) {
	var input models.LoginInput

	// Log the incoming request for debugging
	if err := c.ShouldBindJSON(&input); err != nil {
		log.Printf("Error binding JSON: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input", "details": err.Error()})
		return
	}

	log.Printf("Login attempt for email: %s", input.Email)

	user, err := models.GetUserByEmail(input.Email)
	if err != nil {
		log.Printf("Invalid email: %s", input.Email)
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	if !auth.CheckPasswordHash(input.Password, user.Password) {
		log.Printf("Invalid password for email: %s", input.Email)
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	token, err := auth.GenerateJWT(user.ID)
	if err != nil {
		log.Printf("Error generating token: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	log.Printf("Login successful for email: %s", input.Email)
	c.JSON(http.StatusOK, gin.H{"token": token, "username": user.Username, "message": "Login successful"})
}

// User logout handler
func Logout(c *gin.Context) {
	// Invalidate the JWT token by simply returning a success message
	log.Printf("User logged out")
	c.JSON(http.StatusOK, gin.H{"message": "User logged out successfully"})
}