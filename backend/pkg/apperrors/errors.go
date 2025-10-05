package apperrors

type AppError struct {
    Code       string      `json:"code"`
    Message    string      `json:"message"`
    Details    interface{} `json:"details,omitempty"`
    StatusCode int         `json:"-"`
}

func (e *AppError) Error() string { return e.Message }

var (
    ErrUserNotFound    = &AppError{Code: "USER_NOT_FOUND", Message: "User not found", StatusCode: 404}
    ErrInvalidPassword = &AppError{Code: "INVALID_PASSWORD", Message: "Invalid password", StatusCode: 401}
    ErrDuplicateEmail  = &AppError{Code: "DUPLICATE_EMAIL", Message: "Email already exists", StatusCode: 409}
    ErrDuplicateUser   = &AppError{Code: "DUPLICATE_USERNAME", Message: "Username already exists", StatusCode: 409}
    ErrVideoNotFound   = &AppError{Code: "VIDEO_NOT_FOUND", Message: "Video not found", StatusCode: 404}
    ErrCommentNotFound = &AppError{Code: "COMMENT_NOT_FOUND", Message: "Comment not found", StatusCode: 404}
)

