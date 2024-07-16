import { ClassAnalytics } from "../types/video";
import { Class } from "../types/class";

const mockClassAnalytics: ClassAnalytics = {
  classId: "class123",
  className: "プログラミング入門",
  totalViews: 3500,
  averageRetentionRate: 78,
  videos: [
    {
      videoId: "v1",
      title: "変数と定数",
      views: 750,
      averageViewDuration: 1620, // 27分
      totalDuration: 1800,
      retentionRate: 85,
      engagementRate: 72,
      likes: 120,
      comments: 45,
    },
    {
      videoId: "v2",
      title: "条件分岐",
      views: 680,
      averageViewDuration: 1500, // 25分
      totalDuration: 1800,
      retentionRate: 80,
      engagementRate: 68,
      likes: 95,
      comments: 38,
    },
    {
      videoId: "v3",
      title: "ループ処理",
      views: 620,
      averageViewDuration: 1380, // 23分
      totalDuration: 1800,
      retentionRate: 75,
      engagementRate: 65,
      likes: 85,
      comments: 30,
    },
    {
      videoId: "v4",
      title: "関数",
      views: 590,
      averageViewDuration: 1440, // 24分
      totalDuration: 1800,
      retentionRate: 78,
      engagementRate: 70,
      likes: 100,
      comments: 42,
    },
    {
      videoId: "v5",
      title: "クラスとオブジェクト",
      views: 540,
      averageViewDuration: 1560, // 26分
      totalDuration: 1800,
      retentionRate: 72,
      engagementRate: 62,
      likes: 75,
      comments: 28,
    },
  ],
};

const mockClassInfo: Class = {
  id: 123,
  className: "データとプログラミング",
  classLocation: "情24",
  teacherName: "杉山岳弘",
  created_at: new Date("2023-04-01"),
  updated_at: new Date("2023-07-15"),
};

export const getClassAnalytics = async (
  classId: string
): Promise<ClassAnalytics> => {
  // 実際のAPIリクエストの代わりに、モックデータを返す
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockClassAnalytics);
    }, 1000); // 1秒の遅延を模倣
  });
};

export const getClassInfo = async (classId: string): Promise<Class> => {
  // 実際のAPIリクエストの代わりに、モックデータを返す
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockClassInfo);
    }, 800); // 0.8秒の遅延を模倣
  });
};
