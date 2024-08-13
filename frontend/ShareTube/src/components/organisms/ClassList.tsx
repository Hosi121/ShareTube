import React from "react";
import { Grid } from "@mui/material";
import ClassCard from "../molecules/ClassCard";
import { Class } from "../../types/class";

interface ClassListProps {
  classes: Class[];
  onClassSelect: (classId: string) => void;
}

const ClassList: React.FC<ClassListProps> = ({ classes, onClassSelect }) => {
  return (
    <Grid container spacing={3}>
      {classes.map((cls) => (
        <Grid item xs={12} sm={6} md={4} key={cls.id}>
          <ClassCard
            className={cls.className}
            teacherName={cls.teacherName}
            classLocation={cls.classLocation}
            onClick={() => onClassSelect(cls.id.toString())}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ClassList;
