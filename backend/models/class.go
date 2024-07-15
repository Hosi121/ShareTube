package models

import (
    "time"
)

// Class represents a class in the system
type Class struct {
    ID            uint      `json:"id" gorm:"primary_key"`
    ClassName     string    `json:"className" gorm:"not null"`
    ClassLocation string    `json:"classLocation" gorm:"not null"`
    TeacherName   string    `json:"teacherName" gorm:"not null"`
    CreatedAt     time.Time `json:"created_at"`
    UpdatedAt     time.Time `json:"updated_at"`
}

// CreateClass creates a new class
func CreateClass(class *Class) error {
    return DB.Create(class).Error
}

// GetClassByID retrieves a class by its ID
func GetClassByID(id uint) (*Class, error) {
    var class Class
    if err := DB.First(&class, id).Error; err != nil {
        return nil, err
    }
    return &class, nil
}

// GetClassByName retrieves a class by its name
func GetClassByName(className string) (*Class, error) {
    var class Class
    if err := DB.Where("class_name = ?", className).First(&class).Error; err != nil {
        return nil, err
    }
    return &class, nil
}

// UpdateClass updates an existing class
func UpdateClass(class *Class) error {
    return DB.Save(class).Error
}

// DeleteClass deletes a class
func DeleteClass(id uint) error {
    return DB.Delete(&Class{}, id).Error
}