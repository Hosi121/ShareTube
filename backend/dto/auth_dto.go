package dto

// RegisterRequest represents the input for user registration (API layer)
type RegisterRequest struct {
    Username string `json:"username" binding:"required,min=3,max=50"`
    Email    string `json:"email" binding:"required,email"`
    Password string `json:"password" binding:"required,min=8"`
}

type RegisterResponse struct {
    UserID   uint   `json:"user_id"`
    Username string `json:"username"`
    Message  string `json:"message"`
}

// LoginRequest represents the input for user login (API layer)
type LoginRequest struct {
    Email    string `json:"email" binding:"required,email"`
    Password string `json:"password" binding:"required"`
}

type LoginResponse struct {
    Token    string `json:"token"`
    Username string `json:"username"`
    Message  string `json:"message"`
}

