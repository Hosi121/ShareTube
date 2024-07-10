import React from 'react';
import { Avatar as MUIAvatar, AvatarProps as MUIAvatarProps } from '@mui/material';

interface AvatarProps extends MUIAvatarProps {}

const Avatar: React.FC<AvatarProps> = (props) => {
  return <MUIAvatar {...props}>{props.children}</MUIAvatar>;
};

export default Avatar;