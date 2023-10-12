import React, { useEffect } from 'react';
import { Avatar, Box, Grow } from '@mui/material';
import { useAuth } from '../../components/context/AuthContext';
import { CustomSideBar, CustomTypography } from './styles';

const Profile: React.FC = () => {
  const { checkUser, user } = useAuth();

  useEffect(() => {
    checkUser();
  }, []);
  
  return (
    <Grow in={true} style={{ transformOrigin: '0 0 0' }} timeout={1000}>
      <CustomSideBar>
        <Avatar alt={user?.first_name} src={user?.image} sx={{ width: 100, height: 100, margin: '3rem 0' }} />
        <Box>
          <CustomTypography variant="h6">{user?.first_name} {user?.last_name}</CustomTypography>
          <CustomTypography variant="body1">{user?.email}</CustomTypography>
        </Box>
      </CustomSideBar>
    </Grow>
  );
}

export default Profile;
