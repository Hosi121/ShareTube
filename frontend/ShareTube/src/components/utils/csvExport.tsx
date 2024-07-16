import { ClassAnalytics, VideoAnalytics } from "../../types/video";

export const generateCSV = (analytics: ClassAnalytics): string => {
  const headers = [
    "Video Title",
    "Views",
    "Average View Duration (seconds)",
    "Retention Rate (%)",
    "Engagement Rate (%)",
    "Completion Rate (%)", // 新しく追加した指標
  ];

  const rows = analytics.videos.map((video: VideoAnalytics) => [
    video.title,
    video.views.toString(),
    video.averageViewDuration.toString(),
    video.retentionRate.toFixed(2),
    video.engagementRate.toFixed(2),
    ((video.averageViewDuration / video.totalDuration) * 100).toFixed(2), // 完了率を計算
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  return csvContent;
};

export const downloadCSV = (csvContent: string, fileName: string): void => {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
