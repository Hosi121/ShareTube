import React from "react";
import { Container, Box } from "@mui/material";
import EduHomeLayout from "../organisms/EduHomeLayout";
import { useSpring, animated } from "react-spring";

const AnimatedBox = animated(Box);

const EduHome: React.FC = () => {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(50px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { duration: 1000 },
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <AnimatedBox style={fadeIn}>
        <EduHomeLayout />
      </AnimatedBox>
    </Container>
  );
};

export default EduHome;
