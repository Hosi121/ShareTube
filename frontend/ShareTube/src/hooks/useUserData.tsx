import { useState, useEffect } from "react";
import { User } from "../types/user";
import { Video } from "../types/video";
import userData from "../testData/userData.json";

interface UserWithVideos extends User {
  videos?: Video[];
}

const useUserData = () => {
  const [user, setUser] = useState<UserWithVideos | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // JSONからデータを読み込む
    try {
      const mockUser: UserWithVideos = {
        id: 1, // IDはJSONに含まれていないので仮の値を設定
        username: userData.name,
        email: userData.email,
        created_at: new Date().toISOString(), // 作成日時もJSONにないので現在時刻を設定
        videos: userData.videos.map((video) => ({
          id: video.id,
          user_id: 1, // ユーザーIDも仮の値を設定
          title: video.title,
          description: "", // 説明文はJSONにないので空文字を設定
          video_url: video.thumbnail, // サムネイルURLをビデオURLとして使用
          likes: video.views, // 視聴回数をいいね数として使用
          created_at: new Date().toISOString(), // ビデオの作成日時も現在時刻を設定
          tags: [], // タグ情報はJSONにないので空配列を設定
        })),
      };
      setUser(mockUser);
      setIsLoading(false);
    } catch (err) {
      setError("Failed to load user data");
      setIsLoading(false);
    }
  }, []);

  const updateUser = (updatedUser: Partial<UserWithVideos>) => {
    setUser((prev) => (prev ? { ...prev, ...updatedUser } : null));
  };

  return { user, isLoading, error, updateUser };
};

export default useUserData;
