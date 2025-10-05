import { useState } from "react";
import api from "../services/api";

export function useVideoUpload() {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<any>(null);

  const upload = async (file: File, title: string, description: string) => {
    setError(null);
    const form = new FormData();
    form.append("file", file);
    form.append("title", title);
    form.append("description", description);

    const res = await api.post(`/upload`, form, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (e) => {
        if (e.total) setProgress(Math.round((e.loaded * 100) / e.total));
      },
    });
    return res.data;
  };

  return { upload, progress, error };
}

