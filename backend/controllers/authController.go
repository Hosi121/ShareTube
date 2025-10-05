package controllers

import (
    "log/slog"
    "net/http"
    "context"

    "backend/dto"
    "backend/pkg/apperrors"
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
            c.Error(apperrors.ErrDuplicateEmail); return
        case services.ErrDuplicateUser:
            c.Error(apperrors.ErrDuplicateUser); return
        default:
            slog.Error("Register failed", "error", err)
            c.Error(&apperrors.AppError{Code: "CREATE_USER_FAILED", Message: "Failed to create user", StatusCode: http.StatusInternalServerError}); return
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
        case services.ErrUserNotFound:
            c.Error(apperrors.ErrUserNotFound); return
        case services.ErrInvalidPassword:
            c.Error(apperrors.ErrInvalidPassword); return
        default:
            slog.Error("Login failed", "error", err)
            c.Error(&apperrors.AppError{Code: "TOKEN_GEN_FAILED", Message: "Failed to generate token", StatusCode: http.StatusInternalServerError}); return
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
