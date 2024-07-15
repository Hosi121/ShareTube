import React from "react";
import { Card, CardActionArea, Typography, Box } from "@mui/material";
import { useSpring, animated } from "react-spring";

interface ClassCardProps {
  name: string;
  teacher: string;
  onClick: () => void;
}

const AnimatedCard = animated(Card);

const ClassCard: React.FC<ClassCardProps> = ({ name, teacher, onClick }) => {
  const [spring, setSpring] = useSpring(() => ({
    scale: 1,
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  }));

  return (
    <AnimatedCard
      style={spring}
      onMouseEnter={() =>
        setSpring({ scale: 1.03, boxShadow: "0 8px 15px rgba(0,0,0,0.2)" })
      }
      onMouseLeave={() =>
        setSpring({ scale: 1, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" })
      }
    >
      <CardActionArea onClick={onClick} sx={{ p: 2, height: "100%" }}>
        <Box
          sx={{
            width: "300px",
            height: "200px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" component="div" gutterBottom fontWeight={"bold"}>
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {teacher}
          </Typography>
        </Box>
      </CardActionArea>
    </AnimatedCard>
  );
};

export default ClassCard;
