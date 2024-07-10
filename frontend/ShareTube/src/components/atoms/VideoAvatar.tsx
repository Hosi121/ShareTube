import { styled } from "@mui/material";
import Avatar from "./Avatar";

const VideoAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
})) as typeof Avatar;

export default VideoAvatar;
