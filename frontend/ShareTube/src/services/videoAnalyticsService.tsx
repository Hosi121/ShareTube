import { ClassAnalytics } from "../types/video";
import { Class } from "../types/class";
import EduVideoData from "../testData/EduVideoData.json";

const mockClassInfo: Class = {
  id: 123,
  className: "データとプログラミング",
  classLocation: "情24",
  teacherName: "杉山岳弘",
  created_at: new Date("2023-04-01"),
  updated_at: new Date("2023-07-15"),
};

export const getClassAnalytics = async (): Promise<ClassAnalytics> => {
  // 実際のAPIリクエストの代わりに、モックデータを返す
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(EduVideoData as ClassAnalytics);
    }, 1000); // 1秒の遅延を模倣
  });
};

export const getClassInfo = async (): Promise<Class> => {
  // 実際のAPIリクエストの代わりに、モックデータを返す
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockClassInfo);
    }, 800); // 0.8秒の遅延を模倣
  });
};