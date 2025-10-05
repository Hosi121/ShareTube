package services

import (
    "context"

    "backend/models"
    "backend/repositories"
)

type ProfileService interface {
    GetByID(ctx context.Context, id uint) (*models.User, error)
    GetByUsername(ctx context.Context, username string) (*models.User, error)
}

type profileService struct { users repositories.UserRepository }

func NewProfileService(users repositories.UserRepository) ProfileService { return &profileService{users: users} }

func (s *profileService) GetByID(ctx context.Context, id uint) (*models.User, error) {
    return s.users.GetByID(ctx, id)
}

func (s *profileService) GetByUsername(ctx context.Context, username string) (*models.User, error) {
    return s.users.GetByUsername(ctx, username)
}

