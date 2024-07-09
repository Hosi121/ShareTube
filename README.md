# ShareTube

**使用する技術**

[![My Skills](https://skillicons.dev/icons?i=go,typescript,react,vite,mysql,docker)](https://skillicons.dev)

## Frontend

```
cd frontend/ShareTube
npm intstall
npm run dev
```

## Backend

### go側の設定

```
cd backend
go mod download
go mod tidy
```

### mysql側の設定

.envファイルをbackend直下に作成します．

```
cd backend
touch .env
```

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=video_sns
JWT_SECRET=your_jwt_secret
```

データベースの確認方法

```
sudo mysql -u root -p
USE video_sns
SHOW TABLES;
SELECT * FROM users;
```

要求されたパスワードは，.envファイルのDB_passwordの値です．

### go側のエントリーポイント

```
go run main.go
```
