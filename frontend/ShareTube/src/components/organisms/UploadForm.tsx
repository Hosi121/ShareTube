import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';
import CustomTextField from '../atoms/TextField';
import CustomButton from '../atoms/CustomButton';
import FileUpload from '../molecules/FileUpload';
import TagInput from '../molecules/TagInput';
import TagList from '../molecules/TagList';
import { UploadVideoInput } from '../../types/video';

interface UploadFormProps {
  onSubmit: (videoInput: UploadVideoInput, tags: string[]) => Promise<void>;
}

const UploadForm: React.FC<UploadFormProps> = ({ onSubmit }) => {
  const [videoInput, setVideoInput] = useState<UploadVideoInput>({
    title: '',
    description: '',
    file: null as unknown as File,
  });
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string>('');

  const allowedExtensions = ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.mkv'];

  const handleVideoInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVideoInput(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

      if (allowedExtensions.includes(extension)) {
        setVideoInput(prev => ({ ...prev, file }));
        setFileName(file.name);
        setError('');
      } else {
        setError('サポートされていないファイル形式です。動画ファイルを選択してください。');
        e.target.value = '';
      }
    }
  };

  const handleTagInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentTag(e.target.value);
  };

  const handleAddTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);
    try {
      await onSubmit(videoInput, tags);
      // Reset form or show success message
    } catch (error) {
      setError('アップロードに失敗しました。');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CustomTextField
        label="タイトル"
        name="title"
        value={videoInput.title}
        onChange={handleVideoInputChange}
        required
      />
      <CustomTextField
        label="説明"
        name="description"
        value={videoInput.description}
        onChange={handleVideoInputChange}
        multiline
        rows={4}
      />
      <FileUpload
        allowedExtensions={allowedExtensions}
        fileName={fileName}
        error={error}
        onFileChange={handleFileChange}
      />
      <TagInput
        currentTag={currentTag}
        onTagInputChange={handleTagInputChange}
        onAddTag={handleAddTag}
      />
      <TagList tags={tags} onRemoveTag={handleRemoveTag} />
      {uploading ? (
        <Box sx={{ width: '100%' }}>
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