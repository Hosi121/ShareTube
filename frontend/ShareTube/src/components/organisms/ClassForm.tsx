import React, { useState } from "react";
import { Box } from "@mui/material";
import InputField from "../atoms/TextField";
import Button from "../atoms/Button";
import { Class } from "../../types/class";

interface AddClassFormProps {
  onAddClass: (
    newClass: Omit<Class, "id" | "created_at" | "updated_at" | "teacher">
  ) => void;
  currentUserName: string;
  isLoading: boolean;
}

const AddClassForm: React.FC<AddClassFormProps> = ({
  onAddClass,
  currentUserName,
}) => {
  const [className, setclassName] = useState("");
  const [classLocation, setClassLocation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddClass({ className, classLocation, teacherName: currentUserName });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <InputField
        label="授業名"
        value={className}
        onChange={(e) => setclassName(e.target.value)}
        required
      />
      <InputField
        label="教室"
        value={classLocation}
        onChange={(e) => setClassLocation(e.target.value)}
        required
      />
      <InputField label="担当教員" value={currentUserName} disabled />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2, borderRadius: 28 }}
      >
        授業を追加
      </Button>
    </Box>
  );
};

export default AddClassForm;
