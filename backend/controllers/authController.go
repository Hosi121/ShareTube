package controllers

import (
    "log/slog"
    "net/http"
    "context"

    "backend/dto"
    "backend/services"
    "github.com/gin-gonic/gin"
)

type AuthController struct {
    service services.AuthService
}

func NewAuthController(s services.AuthService) *AuthController {
    return &AuthController{service: s}
}

// POST /register
func (ac *AuthController) Register(c *gin.Context) {
    var input dto.RegisterRequest
    if err := c.ShouldBindJSON(&input); err != nil {
        slog.Warn("Error binding JSON", "error", err)
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input", "details": err.Error()})
        return
    }

    resp, err := ac.service.Register(context.Background(), input)
    if err != nil {
        switch err {
        case services.ErrDuplicateEmail:
            c.JSON(http.StatusConflict, gin.H{"error": "Email already registered"})
            return
        case services.ErrDuplicateUser:
            c.JSON(http.StatusConflict, gin.H{"error": "Username already exists"})
            return
        default:
            slog.Error("Register failed", "error", err)
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
            return
        }
    }

    slog.Info("User registered successfully", "email", input.Email)
    c.JSON(http.StatusOK, resp)
}

// POST /login
func (ac *AuthController) Login(c *gin.Context) {
    var input dto.LoginRequest
    if err := c.ShouldBindJSON(&input); err != nil {
        slog.Warn("Error binding JSON", "error", err)
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input", "details": err.Error()})
        return
    }

    resp, err := ac.service.Login(context.Background(), input)
    if err != nil {
        switch err {
        case services.ErrUserNotFound, services.ErrInvalidPassword:
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
            return
        default:
            slog.Error("Login failed", "error", err)
            c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
            return
        }
    }

    slog.Info("Login successful", "email", input.Email)
    c.JSON(http.StatusOK, resp)
}

// POST /logout
func (ac *AuthController) Logout(c *gin.Context) {
    slog.Info("User logged out")
    c.JSON(http.StatusOK, gin.H{"message": "User logged out successfully"})
}
