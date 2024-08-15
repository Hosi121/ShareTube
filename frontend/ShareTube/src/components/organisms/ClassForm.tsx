import React, { useState } from "react";
import { Box } from "@mui/material";
import InputField from "../atoms/TextField";
import Button from "../atoms/Button";
import { Class } from "../../types/class";

interface ClassFormProps {
  onAddClass: (
    newClass: Omit<Class, "id" | "created_at" | "updated_at" | "teacher">
  ) => void;
  isLoading: boolean;
}

const ClassForm: React.FC<ClassFormProps> = ({ onAddClass }) => {
  const [className, setClassName] = useState("");
  const [classLocation, setClassLocation] = useState("");

  // localStorageからusernameを取得
  const currentUserName = localStorage.getItem("username") || "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddClass({ className, classLocation, teacherName: currentUserName });
  };

  return (
    <Box>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <InputField
          label="授業名"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          required
        />
        <InputField
          label="教室"
          value={classLocation}
          onChange={(e) => setClassLocation(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2, borderRadius: 28 }}
        >
          授業を追加
        </Button>
      </Box>
    </Box>
  );
};

export default ClassForm;