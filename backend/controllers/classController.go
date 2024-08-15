package controllers

import (
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

// RegisterClass handles the creation of a new class
func RegisterClass(c *gin.Context) {
	var newClass models.Class

	// Bind the JSON body to newClass
	if err := c.ShouldBindJSON(&newClass); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Create the class in the database
	if err := models.CreateClass(&newClass); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, newClass)
}

// GetAllClasses retrieves all classes from the database
func GetAllClasses(c *gin.Context) {
	var classes []models.Class
	if err := models.DB.Find(&classes).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, classes)
}
