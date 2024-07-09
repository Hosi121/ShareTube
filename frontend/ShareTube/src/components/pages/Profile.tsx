import React, { useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import useUserData from '../../hooks/useUserData';
import UserInfoCard from '../molecules/UserInfoCard';
import VideoList from '../organisms/VideoList';
import EditProfileModal from '../molecules/EditProfileModal';
import SettingsModal from '../molecules/SettingsModal';

const Profile: React.FC = () => {
  const { user, isLoading, error, updateUser } = useUserData();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;
  if (!user) return <Typography>No user data available</Typography>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <UserInfoCard
            user={user}
            onSettingsClick={() => setSettingsModalOpen(true)}
            onEditClick={() => setEditModalOpen(true)}
          />
        </Grid>
        <Grid item xs={12}>
          <VideoList videos={user.videos} />
        </Grid>
      </Grid>
      <EditProfileModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        user={user}
        onSave={updateUser}
      />
      <SettingsModal
        open={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        user={user}
        onSave={updateUser}
      />
    </Container>
  );
};

export default Profile;