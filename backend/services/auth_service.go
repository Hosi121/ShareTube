package services

import (
    "context"
    "errors"
    "log/slog"

    "backend/auth"
    "backend/dto"
    "backend/models"
    "backend/repositories"
    "gorm.io/gorm"
)

var (
    ErrUserNotFound    = errors.New("user not found")
    ErrInvalidPassword = errors.New("invalid password")
    ErrDuplicateEmail  = errors.New("email already exists")
    ErrDuplicateUser   = errors.New("username already exists")
)

type AuthService interface {
    Register(ctx context.Context, input dto.RegisterRequest) (*dto.RegisterResponse, error)
    Login(ctx context.Context, input dto.LoginRequest) (*dto.LoginResponse, error)
}

type authService struct {
    userRepo repositories.UserRepository
}

func NewAuthService(userRepo repositories.UserRepository) AuthService {
    return &authService{userRepo: userRepo}
}

func (s *authService) Register(ctx context.Context, input dto.RegisterRequest) (*dto.RegisterResponse, error) {
    // Check duplicates
    if _, err := s.userRepo.GetByEmail(ctx, input.Email); err == nil {
        return nil, ErrDuplicateEmail
    } else if !errors.Is(err, gorm.ErrRecordNotFound) {
        // Unexpected DB error
        slog.Error("GetByEmail failed", "error", err)
        return nil, err
    }

    if _, err := s.userRepo.GetByUsername(ctx, input.Username); err == nil {
        return nil, ErrDuplicateUser
    } else if !errors.Is(err, gorm.ErrRecordNotFound) {
        slog.Error("GetByUsername failed", "error", err)
        return nil, err
    }

    hashedPassword, err := auth.HashPassword(input.Password)
    if err != nil {
        return nil, err
    }

    user := models.User{
        Username: input.Username,
        Email:    input.Email,
        Password: hashedPassword,
    }

    if err := s.userRepo.Create(ctx, &user); err != nil {
        return nil, err
    }

    return &dto.RegisterResponse{
        UserID:   user.ID,
        Username: user.Username,
        Message:  "User registered successfully",
    }, nil
}

func (s *authService) Login(ctx context.Context, input dto.LoginRequest) (*dto.LoginResponse, error) {
    user, err := s.userRepo.GetByEmail(ctx, input.Email)
    if err != nil {
        if errors.Is(err, gorm.ErrRecordNotFound) {
            return nil, ErrUserNotFound
        }
        return nil, err
    }

    if !auth.CheckPasswordHash(input.Password, user.Password) {
        return nil, ErrInvalidPassword
    }

    token, err := auth.GenerateJWT(user.ID)
    if err != nil {
        return nil, err
    }

    return &dto.LoginResponse{
        Token:    token,
        Username: user.Username,
        Message:  "Login successful",
    }, nil
}

