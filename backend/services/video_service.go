package services

import (
    "context"

    "backend/models"
    "backend/pkg/apperrors"
    "backend/repositories"
    "gorm.io/gorm"
)

type VideoService interface {
    GetByID(ctx context.Context, id uint) (*models.Video, error)
    Search(ctx context.Context, query string, topK int) ([]models.Video, error)
}

type videoService struct { repo repositories.VideoRepository }

func NewVideoService(repo repositories.VideoRepository) VideoService { return &videoService{repo: repo} }

func (s *videoService) GetByID(ctx context.Context, id uint) (*models.Video, error) {
    v, err := s.repo.GetByID(ctx, id)
    if err != nil {
        if err == gorm.ErrRecordNotFound {
            return nil, apperrors.ErrVideoNotFound
        }
        return nil, err
    }
    return v, nil
}

func (s *videoService) Search(ctx context.Context, query string, topK int) ([]models.Video, error) {
    return s.repo.Search(ctx, query, topK)
}
