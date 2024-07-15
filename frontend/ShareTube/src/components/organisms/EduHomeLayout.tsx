import React from "react";
import { Box, Typography } from "@mui/material";
import ClassList from "../molecules/ClassList";
import { Class } from "../../types/class";

const EduHomeLayout: React.FC = () => {
  const classes: Class[] = [
    { id: 1, name: "データとプログラミング", teacher: "杉山先生" },
    { id: 2, name: "情報社会思想", teacher: "吉田先生" },
  ];

  const handleClassSelect = (classId: string) => {
    console.log(`Selected class with ID: ${classId}`);
    // ここで選択された授業に対する処理を行う
  };

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
