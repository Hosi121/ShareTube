package repositories

import (
    "context"

    "backend/models"
    "gorm.io/gorm"
)

type VideoRepository interface {
    GetByID(ctx context.Context, id uint) (*models.Video, error)
    Create(ctx context.Context, video *models.Video) error
    Search(ctx context.Context, query string, limit int) ([]models.Video, error)
}

type videoRepository struct {
    db *gorm.DB
}

func NewVideoRepository(db *gorm.DB) VideoRepository {
    return &videoRepository{db: db}
}

func (r *videoRepository) GetByID(ctx context.Context, id uint) (*models.Video, error) {
    var v models.Video
    if err := r.db.WithContext(ctx).Preload("Tags").First(&v, id).Error; err != nil {
        return nil, err
    }
    return &v, nil
}

func (r *videoRepository) Create(ctx context.Context, video *models.Video) error {
    return r.db.WithContext(ctx).Create(video).Error
}

func (r *videoRepository) Search(ctx context.Context, query string, limit int) ([]models.Video, error) {
    var list []models.Video
    q := "%" + query + "%"
    tx := r.db.WithContext(ctx).Preload("Tags").Where("title LIKE ? OR description LIKE ?", q, q)
    if limit > 0 {
        tx = tx.Limit(limit)
    }
    if err := tx.Find(&list).Error; err != nil {
        return nil, err
    }
    return list, nil
}
