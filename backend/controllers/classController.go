package controllers

import (
    "context"
    "net/http"

    "backend/models"
    "backend/services"
    "github.com/gin-gonic/gin"
)

type ClassController struct { svc services.ClassService }

func NewClassController(s services.ClassService) *ClassController { return &ClassController{svc: s} }

// POST /class
func (cc *ClassController) RegisterClass(c *gin.Context) {
    var in models.Class
    if err := c.ShouldBindJSON(&in); err != nil { c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()}); return }
    if err := cc.svc.Register(context.Background(), &in); err != nil { c.Error(err); return }
    c.JSON(http.StatusCreated, in)
}

// GET /classes
func (cc *ClassController) GetAllClasses(c *gin.Context) {
    classes, err := cc.svc.ListAll(context.Background())
    if err != nil { c.Error(err); return }
    c.JSON(http.StatusOK, classes)
}
