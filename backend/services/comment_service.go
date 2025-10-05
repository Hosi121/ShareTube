package services

import (
    "context"
    "time"

    "backend/models"
    "backend/pkg/apperrors"
    "backend/repositories"
    "gorm.io/gorm"
)

type CommentService interface {
    ListByVideo(ctx context.Context, videoID uint) ([]models.Comment, error)
    Post(ctx context.Context, userID, videoID uint, text string) (*models.Comment, error)
    Like(ctx context.Context, commentID uint) (int, error)
}

type commentService struct { repo repositories.CommentRepository }

func NewCommentService(repo repositories.CommentRepository) CommentService { return &commentService{repo: repo} }

func (s *commentService) ListByVideo(ctx context.Context, videoID uint) ([]models.Comment, error) {
    return s.repo.GetByVideoID(ctx, videoID)
}

func (s *commentService) Post(ctx context.Context, userID, videoID uint, text string) (*models.Comment, error) {
    c := models.Comment{UserID: userID, VideoID: videoID, Comment: text, CreatedAt: time.Now()}
    if err := s.repo.Create(ctx, &c); err != nil {
        return nil, err
    }
    return &c, nil
}

func (s *commentService) Like(ctx context.Context, commentID uint) (int, error) {
    c, err := s.repo.GetByID(ctx, commentID)
    if err != nil {
        if err == gorm.ErrRecordNotFound {
            return 0, apperrors.ErrCommentNotFound
        }
        return 0, err
    }
    c.Likes++
    if err := s.repo.Save(ctx, c); err != nil {
        return 0, err
    }
    return c.Likes, nil
}

