import React, { useState, ChangeEvent, FormEvent } from "react";
import { Box, LinearProgress, Typography } from "@mui/material";
import CustomTextField from "../atoms/TextField";
import CustomButton from "../atoms/CustomButton";
import FileUpload from "../molecules/FileUpload";
import TagInput from "../molecules/TagInput";
import TagList from "../molecules/TagList";
import { UploadVideoInput } from "../../types/video";

interface UploadFormProps {
  onSubmit: (videoInput: UploadVideoInput, tags: string[]) => Promise<void>;
}

const UploadForm: React.FC<UploadFormProps> = ({ onSubmit }) => {
  const [videoInput, setVideoInput] = useState<UploadVideoInput>({
    title: "",
    description: "",
    file: null as unknown as File,
  });
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const allowedExtensions = [".mp4", ".avi", ".mov", ".wmv", ".flv", ".mkv"];
  const MAX_TITLE_LENGTH = 50;
  const MAX_DESCRIPTION_LENGTH = 200;
  const MAX_TAG_LENGTH = 10;
  const MAX_TAGS = 5;

  const handleVideoInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "title" && value.length <= MAX_TITLE_LENGTH) {
      setVideoInput((prev) => ({ ...prev, title: value }));
    } else if (
      name === "description" &&
      value.length <= MAX_DESCRIPTION_LENGTH
    ) {
      setVideoInput((prev) => ({ ...prev, description: value }));
    }
  };

  const handleFileChange = (file: File) => {
    if (file) {
      setVideoInput((prev) => ({ ...prev, file }));
      setFileName(file.name);
      setError("");
    } else {
      setVideoInput((prev) => ({ ...prev, file: null as unknown as File }));
      setFileName("");
    }
  };

  const handleTagInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= MAX_TAG_LENGTH) {
      setCurrentTag(e.target.value);
    }
  };

  const handleAddTag = () => {
    if (currentTag && !tags.includes(currentTag) && tags.length < MAX_TAGS) {
      setTags([...tags, currentTag]);
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);
    try {
      await onSubmit(videoInput, tags);
      // Reset form or show success message
    } catch (error) {
      setError("アップロードに失敗しました。");
    } finally {
      setUploading(false);
    }
  };

  const CharacterCount = ({
    current,
    max,
  }: {
    current: number;
    max: number;
  }) => (
    <Typography
      variant="caption"
      color="textSecondary"
      align="right"
      style={{ width: "100%", display: "block" }}
    >
      {current}/{max}
    </Typography>
  );

  return (
    <form onSubmit={handleSubmit}>
      <FileUpload
        allowedExtensions={allowedExtensions}
        fileName={fileName}
        error={error}
        onFileChange={handleFileChange}
      />
      <CustomTextField
        label="タイトル"
        name="title"
        value={videoInput.title}
        onChange={handleVideoInputChange}
        margin="normal"
        required
        variant="outlined"
        fullWidth
      />
      <CharacterCount
        current={videoInput.title.length}
        max={MAX_TITLE_LENGTH}
      />
      <LinearProgress
        variant="determinate"
        value={(videoInput.title.length / MAX_TITLE_LENGTH) * 100}
      />
      <Typography variant="caption" color="textSecondary">
        タイトルは最大{MAX_TITLE_LENGTH}文字まで記入できます。
      </Typography>
      <CustomTextField
        label="説明"
        name="description"
        value={videoInput.description}
        onChange={handleVideoInputChange}
        margin="normal"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
      />
      <CharacterCount
        current={videoInput.description.length}
        max={MAX_DESCRIPTION_LENGTH}
      />
      <LinearProgress
        variant="determinate"
        value={(videoInput.description.length / MAX_DESCRIPTION_LENGTH) * 100}
      />
      <Typography variant="caption" color="textSecondary">
        説明文は最大{MAX_DESCRIPTION_LENGTH}文字まで記入できます。
      </Typography>
      <TagInput
        currentTag={currentTag}
        onTagInputChange={handleTagInputChange}
        onAddTag={handleAddTag}
      />
      <Typography variant="caption" color="textSecondary">
        タグは最大{MAX_TAG_LENGTH}文字まで記入できます。
      </Typography>
      <TagList tags={tags} onRemoveTag={handleRemoveTag} />
      <Typography variant="caption" color="textSecondary">
        タグは最大{MAX_TAGS}つまで追加できます。
      </Typography>
      {uploading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
      ) : (
        <CustomButton
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2, py: 1.5, borderRadius: 4 }}
        >
          動画をアップロード
        </CustomButton>
      )}
    </form>
  );
};

export default UploadForm;
