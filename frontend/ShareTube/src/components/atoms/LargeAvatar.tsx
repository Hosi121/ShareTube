import { styled } from "@mui/material";
import Avatar from "./Avatar";

const LargeAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(25),
  height: theme.spacing(25),
  marginRight: theme.spacing(4),
  border: `4px solid ${theme.palette.background.paper}`,
  boxShadow: `0 4px 6px rgba(2, 0, 0, 0.1)`,
  fontSize: "5rem",
})) as typeof Avatar;

export default LargeAvatar;
