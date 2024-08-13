package auth

import (
    "testing"
    "time"
    "github.com/dgrijalva/jwt-go"
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

    expectedExpirationTime := time.Now().Add(24 * time.Hour).Unix()
    if claims.ExpiresAt < time.Now().Unix() || claims.ExpiresAt > expectedExpirationTime {
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

    expectedExpirationTime := time.Now().Add(24 * time.Hour).Unix()
    if claims.ExpiresAt < time.Now().Unix() || claims.ExpiresAt > expectedExpirationTime {
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
        StandardClaims: jwt.StandardClaims{
            ExpiresAt: time.Now().Add(24 * time.Hour).Unix(),
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
        StandardClaims: jwt.StandardClaims{
            ExpiresAt: time.Now().Add(-1 * time.Hour).Unix(),
        },
    }
    expiredToken := jwt.NewWithClaims(jwt.SigningMethodHS256, expiredClaims)
    expiredTokenString, _ := expiredToken.SignedString(jwtKey)
    _, err = VerifyJWT(expiredTokenString)
    if err == nil {
        t.Fatalf("Expected error but got none")
    }
}

