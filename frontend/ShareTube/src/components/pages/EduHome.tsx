import React from "react";
import { Container, Box } from "@mui/material";
import EduHomeLayout from "../organisms/EduHomeLayout";
import { animated } from "react-spring";

const AnimatedBox = animated(Box);

const EduHome: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <AnimatedBox>
        <EduHomeLayout />
      </AnimatedBox>
    </Container>
  );
};

export default EduHome;
