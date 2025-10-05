package repositories

import (
    "context"

    "backend/models"
    "gorm.io/gorm"
)

type UserRepository interface {
    Create(ctx context.Context, user *models.User) error
    GetByEmail(ctx context.Context, email string) (*models.User, error)
    GetByID(ctx context.Context, id uint) (*models.User, error)
    GetByUsername(ctx context.Context, username string) (*models.User, error)
}

type userRepository struct {
    db *gorm.DB
}

func NewUserRepository(db *gorm.DB) UserRepository {
    return &userRepository{db: db}
}

func (r *userRepository) Create(ctx context.Context, user *models.User) error {
    return r.db.WithContext(ctx).Create(user).Error
}

func (r *userRepository) GetByEmail(ctx context.Context, email string) (*models.User, error) {
    var user models.User
    if err := r.db.WithContext(ctx).Where("email = ?", email).First(&user).Error; err != nil {
        return nil, err
    }
    return &user, nil
}

func (r *userRepository) GetByID(ctx context.Context, id uint) (*models.User, error) {
    var user models.User
    if err := r.db.WithContext(ctx).First(&user, id).Error; err != nil {
        return nil, err
    }
    return &user, nil
}

func (r *userRepository) GetByUsername(ctx context.Context, username string) (*models.User, error) {
    var user models.User
    if err := r.db.WithContext(ctx).Where("username = ?", username).First(&user).Error; err != nil {
        return nil, err
    }
    return &user, nil
}

