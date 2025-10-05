package repositories

import (
    "context"

    "backend/models"
    "gorm.io/gorm"
)

type ClassRepository interface {
    Create(ctx context.Context, class *models.Class) error
    ListAll(ctx context.Context) ([]models.Class, error)
}

type classRepository struct { db *gorm.DB }

func NewClassRepository(db *gorm.DB) ClassRepository { return &classRepository{db: db} }

func (r *classRepository) Create(ctx context.Context, class *models.Class) error {
    return r.db.WithContext(ctx).Create(class).Error
}

func (r *classRepository) ListAll(ctx context.Context) ([]models.Class, error) {
    var out []models.Class
    if err := r.db.WithContext(ctx).Find(&out).Error; err != nil {
        return nil, err
    }
    return out, nil
}

