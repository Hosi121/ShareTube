import { Grid } from "@mui/material";
import ClassCard from "../molecules/ClassCard";
import { Class } from "../../types/class";

interface ClassListProps {
  classes: Class[];
  onClassSelect: (classId: string) => void;  // ここでonClassSelectを定義
}

const ClassList: React.FC<ClassListProps> = ({ classes, onClassSelect }) => {
  return (
    <Grid container spacing={3}>
      {classes.map((classItem) => (
        <Grid item xs={12} sm={6} md={4} key={classItem.id}>
          <ClassCard
            className={classItem.className}
            teacherName={classItem.teacherName}
            classLocation={classItem.classLocation}
            onClick={() => onClassSelect(classItem.id.toString())}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ClassList;