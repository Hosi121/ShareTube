<div align="center">
  <img height="-10" width="120" src="https://static.vecteezy.com/system/resources/previews/004/852/965/original/video-play-film-player-movie-line-icon-illustration-logo-template-suitable-for-many-purposes-free-vector.jpg"  alt="GitHub Profile Trophy"/>
  <h1 align="center">ShareTube</h1>
  <p align="center">学内での動画共有サービス！同大学内のローカルコミュニティ内で，動画共有を楽しもう！</p>
</div>

<div align="center">
  <h2 align="center">使用技術</h2>
  <img height="70" width="200%" src="https://skillicons.dev/icons?i=go,typescript,react,vite,mysql,docker">
</div>


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
