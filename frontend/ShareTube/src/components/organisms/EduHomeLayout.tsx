import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import ClassList from "../molecules/ClassList";
import { Class } from "../../types/class";
import ClassData from "../../testData/ClassData.json";

const EduHomeLayout: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const processedClasses = ClassData.map((item: any) => ({
        ...item,
        id: item.id,
        created_at: item.created_at,
        updated_at: item.updated_at,
      }));
      setClasses(processedClasses);
    } catch (error) {
      console.error("Error processing class data:", error);
      setError("授業データの処理中にエラーが発生しました。");
    }
  }, []);

  const handleClassSelect = (classId: string) => {
    console.log(`Selected class with ID: ${classId}`);
    // ここで選択された授業に対する処理を行う
  };

  console.log("Processed classes:", classes);

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        color="primary"
        fontWeight={"bold"}
      >
        授業一覧
      </Typography>
      <ClassList classes={classes} onClassSelect={handleClassSelect} />
    </Box>
  );
};

export default EduHomeLayout;
