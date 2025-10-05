package services

import (
    "context"

    "backend/models"
    "backend/repositories"
)

type ClassService interface {
    Register(ctx context.Context, class *models.Class) error
    ListAll(ctx context.Context) ([]models.Class, error)
}

type classService struct { repo repositories.ClassRepository }

func NewClassService(repo repositories.ClassRepository) ClassService { return &classService{repo: repo} }

func (s *classService) Register(ctx context.Context, class *models.Class) error {
    return s.repo.Create(ctx, class)
}

func (s *classService) ListAll(ctx context.Context) ([]models.Class, error) {
    return s.repo.ListAll(ctx)
}

