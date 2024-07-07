# backend/Dockerfile

# 1. ベースイメージを最新バージョンで指定
FROM golang:latest

# 2. 作業ディレクトリを設定
WORKDIR /app

# 3. Goモジュールを初期化して依存関係をインストール
COPY go.mod go.sum ./
RUN go mod download

# 4. アプリケーションのソースコードをコピー
COPY . .

# 5. アプリケーションをビルド
RUN go build -o main .

# 6. アプリケーションを起動
CMD ["./main"]

# 7. 必要なポートを公開
EXPOSE 8080