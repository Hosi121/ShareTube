import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Switch,
  IconButton,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { User } from "../../types/user";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(3),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
  },
}));

const SettingItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(2, 0),
}));

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
  user: User;
  onSave: (updatedUser: Partial<User>) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  open,
  onClose,
  user,
  onSave,
}) => {
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  const handleSave = () => {
    // ここで設定を保存する処理を実装
    // 例: onSave({ settings: { notifications, darkMode, language } });
    onClose();
  };

  return (
    <StyledDialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        設定
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <List disablePadding>
          <SettingItem>
            <ListItemText
              primary="通知"
              secondary="アプリからの通知を受け取る"
              primaryTypographyProps={{ variant: "h6" }}
            />
            <NotificationsIcon color="action" sx={{ mr: 2 }} />
            <Switch
              edge="end"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
            />
          </SettingItem>
          <Divider />
          <SettingItem>
            <ListItemText
              primary="ダークモード"
              secondary="アプリの外観を暗くする"
              primaryTypographyProps={{ variant: "h6" }}
            />
            <DarkModeIcon color="action" sx={{ mr: 2 }} />
            <Switch
              edge="end"
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
            />
          </SettingItem>
          <Divider />
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          キャンセル
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          保存
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default SettingsModal;
