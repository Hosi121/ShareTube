import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import ClassList from "./ClassList";
import { Class } from "../../types/class";
import { classService } from "../../services/classService";

const EduHomeLayout: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const classData = await classService.getClasses();
        setClasses(classData);
      } catch (error) {
        setError("授業データの取得中にエラーが発生しました。");
      }
    };

    fetchClasses();
  }, []);

  const handleClassSelect = (classId: string) => {
    console.log(`Selected class with ID: ${classId}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom color="primary" fontWeight={"bold"}>
        授業一覧
      </Typography>
      {error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <ClassList classes={classes} onClassSelect={handleClassSelect} />
      )}
    </Box>
  );
};

export default EduHomeLayout;