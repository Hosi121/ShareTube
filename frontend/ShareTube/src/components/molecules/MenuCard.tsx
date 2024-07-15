import React from "react";
import { Card, CardActionArea } from "@mui/material";
import Typography from "../atoms/typography";
import { useSpring, animated } from "react-spring";

interface MenuCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const AnimatedCard = animated(Card);

const MenuCard: React.FC<MenuCardProps> = ({
  title,
  description,
  icon,
  onClick,
}) => {
  const [spring, setSpring] = useSpring(() => ({
    scale: 1,
    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
  }));

  return (
    <AnimatedCard
        style = {spring}
        onMouseEnter={() => setSpring({ scale: 1.05, boxShadow: "0px 8px 12px rgba(0,0,0,0.2)" })}
        onMouseLeave={() => setSpring({ scale: 1, boxShadow: "0px 4px 6px rgba(0,0,0,0.1)" })}
      sx={{
        width: "500px",
        height: "400px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <CardActionArea
        onClick={onClick}
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
        }}
      >
        {icon}
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          align="center"
          fontWeight={"bold"}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx = {{ mb: 3 }}
          fontWeight={"bold"}
        >
          {description}
        </Typography>
      </CardActionArea>
    </AnimatedCard>
  );
};

export default MenuCard;
