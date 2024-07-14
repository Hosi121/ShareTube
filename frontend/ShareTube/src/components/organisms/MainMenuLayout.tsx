import React from "react";
import { Grid } from "@mui/material";
import MenuCard from "../molecules/MenuCard";
import { School, EmojiEmotions } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const MainMenuLayout: React.FC = () => {
  const navigate = useNavigate();
  const handleForFunClick = () => {
    navigate("/home");
  };
  const handleForEducationClick = () => {
    navigate("/eduhome");
  };
  return (
    <Grid container justifyContent="center" alignItems="center" spacing={4}>
      <Grid item>
        <MenuCard
          title="ShareTube"
          description="学生が投稿した動画を視聴する方はこちら"
          icon={<EmojiEmotions sx={{ fontSize: 60, color: "#3f51b5" }} />}
          onClick={handleForFunClick}
        />
      </Grid>
      <Grid item>
        <MenuCard
          title="ShareTube for Education"
          description="授業動画を視聴する方はこちら"
          icon={<School sx={{ fontSize: 60, color: "#3f51b5" }} />}
          onClick={handleForEducationClick}
        />
      </Grid>
    </Grid>
  );
};

export default MainMenuLayout;
