import React from "react";
import { Grid } from "@mui/material";
import ClassCard from "./ClassCard";

interface Class {
  id: number;
  name: string;
  teacher: string;
}

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
            name={cls.name}
            teacher={cls.teacher}
            onClick={() => onClassSelect(cls.id.toString())}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ClassList;
