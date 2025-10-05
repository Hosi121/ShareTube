package auth

import (
    "errors"
    "os"
    "time"

    jwt "github.com/golang-jwt/jwt/v5"
)

// getJWTSecret returns the signing key from env var `JWT_SECRET`.
// Falls back to a default for local/dev if unset.
func getJWTSecret() []byte {
    secret := os.Getenv("JWT_SECRET")
    if secret == "" {
        // Fallback for local/dev and tests if not provided via env
        secret = "your_jwt_secret"
    }
    return []byte(secret)
}

type Claims struct {
    UserID uint `json:"user_id"`
    jwt.RegisteredClaims
}

// 指定されたユーザーIDに対してJWTを生成します
func GenerateJWT(userID uint) (string, error) {
    expirationTime := time.Now().Add(24 * time.Hour)
    claims := &Claims{
        UserID: userID,
        RegisteredClaims: jwt.RegisteredClaims{
            ExpiresAt: jwt.NewNumericDate(expirationTime),
        },
    }

    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    tokenString, err := token.SignedString(getJWTSecret())
    if err != nil {
        return "", err
    }

    return tokenString, nil
}

// 渡されたJWTトークンを検証
func VerifyJWT(tokenString string) (*Claims, error) {
    claims := &Claims{}

    token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
        return getJWTSecret(), nil
    })
    if err != nil {
        return nil, err
    }

    if !token.Valid {
        return nil, errors.New("invalid token")
    }

    return claims, nil
}
