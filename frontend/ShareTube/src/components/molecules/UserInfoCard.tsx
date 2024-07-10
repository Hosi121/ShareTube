import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import Avatar from '../atoms/Avatar';
import Button from '../atoms/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';

interface UserInfoCardProps {
  user: {
    username: string;
    email: string;
  };
  onSettingsClick: () => void;
  onEditClick: () => void;
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({ user, onSettingsClick, onEditClick }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card>
      <CardContent sx={{ display: 'flex', alignItems: 'center', padding: 4 }}>
        <Avatar alt={user.username}>{getInitials(user.username)}</Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h2" gutterBottom fontWeight="bold" sx={{ mb: 2 }}>
            {user.username}
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            {user.email}
          </Typography>
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button variant="contained" startIcon={<SettingsIcon />} onClick={onSettingsClick}>
              設定
            </Button>
            <Button variant="contained" startIcon={<EditIcon />} onClick={onEditClick}>
              編集
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserInfoCard;