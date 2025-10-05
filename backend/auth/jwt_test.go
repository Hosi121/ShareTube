package auth

import (
    "os"
    "testing"
    "time"

    jwt "github.com/golang-jwt/jwt/v5"
)

func TestGenerateJWT(t *testing.T) {
    userID := uint(1)
    tokenString, err := GenerateJWT(userID)
    if err != nil {
        t.Fatalf("Failed to generate JWT: %v", err)
    }

    claims := &Claims{}
    token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
        return jwtKey, nil
    })

    if err != nil {
        t.Fatalf("Failed to parse JWT: %v", err)
    }

    if !token.Valid {
        t.Fatalf("Token is not valid")
    }

    if claims.UserID != userID {
        t.Fatalf("Expected userID %d but got %d", userID, claims.UserID)
    }

    // Validate expiration window (allow slight clock skew)
    if claims.ExpiresAt == nil {
        t.Fatalf("Token expiration is nil")
    }
    exp := claims.ExpiresAt.Time
    now := time.Now().Add(-2 * time.Second)
    max := time.Now().Add(24 * time.Hour)
    if exp.Before(now) || exp.After(max) {
        t.Fatalf("Token expiration time is not valid")
    }
}

func TestVerifyJWT(t *testing.T) {
    userID := uint(1)
    tokenString, err := GenerateJWT(userID)
    if err != nil {
        t.Fatalf("Failed to generate JWT: %v", err)
    }

    claims, err := VerifyJWT(tokenString)
    if err != nil {
        t.Fatalf("Failed to verify JWT: %v", err)
    }

    if claims.UserID != userID {
        t.Fatalf("Expected userID %d but got %d", userID, claims.UserID)
    }

    if claims.ExpiresAt == nil {
        t.Fatalf("Token expiration is nil")
    }
    exp := claims.ExpiresAt.Time
    now := time.Now().Add(-2 * time.Second)
    max := time.Now().Add(24 * time.Hour)
    if exp.Before(now) || exp.After(max) {
        t.Fatalf("Token expiration time is not valid")
    }
}

func TestVerifyInvalidJWT(t *testing.T) {
    // 無効なトークン
    invalidToken := "invalid.token.string"
    _, err := VerifyJWT(invalidToken)
    if err == nil {
        t.Fatalf("Expected error but got none")
    }

    // 署名が異なるトークン
    userID := uint(1)
    claims := &Claims{
        UserID: userID,
        RegisteredClaims: jwt.RegisteredClaims{
            ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
        },
    }
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    differentKey := []byte("different_secret")
    invalidTokenString, _ := token.SignedString(differentKey)
    _, err = VerifyJWT(invalidTokenString)
    if err == nil {
        t.Fatalf("Expected error but got none")
    }

    // 期限切れのトークン
    expiredClaims := &Claims{
        UserID: userID,
        RegisteredClaims: jwt.RegisteredClaims{
            ExpiresAt: jwt.NewNumericDate(time.Now().Add(-1 * time.Hour)),
        },
    }
    expiredToken := jwt.NewWithClaims(jwt.SigningMethodHS256, expiredClaims)
    // sign with the same secret resolved in runtime
    key := os.Getenv("JWT_SECRET")
    if key == "" {
        key = "your_jwt_secret"
    }
    expiredTokenString, _ := expiredToken.SignedString([]byte(key))
    _, err = VerifyJWT(expiredTokenString)
    if err == nil {
        t.Fatalf("Expected error but got none")
    }
}
