package repositories

import (
    "context"

    "backend/models"
    "gorm.io/gorm"
)

type CommentRepository interface {
    GetByVideoID(ctx context.Context, videoID uint) ([]models.Comment, error)
    Create(ctx context.Context, comment *models.Comment) error
    GetByID(ctx context.Context, id uint) (*models.Comment, error)
    Save(ctx context.Context, comment *models.Comment) error
}

type commentRepository struct { db *gorm.DB }

func NewCommentRepository(db *gorm.DB) CommentRepository { return &commentRepository{db: db} }

func (r *commentRepository) GetByVideoID(ctx context.Context, videoID uint) ([]models.Comment, error) {
    var list []models.Comment
    if err := r.db.WithContext(ctx).Where("video_id = ?", videoID).Find(&list).Error; err != nil {
        return nil, err
    }
    return list, nil
}

func (r *commentRepository) Create(ctx context.Context, comment *models.Comment) error {
    return r.db.WithContext(ctx).Create(comment).Error
}

func (r *commentRepository) GetByID(ctx context.Context, id uint) (*models.Comment, error) {
    var c models.Comment
    if err := r.db.WithContext(ctx).First(&c, id).Error; err != nil {
        return nil, err
    }
    return &c, nil
}

func (r *commentRepository) Save(ctx context.Context, comment *models.Comment) error {
    return r.db.WithContext(ctx).Save(comment).Error
}

