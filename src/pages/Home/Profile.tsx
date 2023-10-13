import React, { useEffect } from 'react';
import { Avatar, Box, Grow } from '@mui/material';
import { useAuth } from '../../components/context/AuthContext';
import { CustomSideBar, CustomTypography, ProType, BasicType, PlusType } from './styles';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const Profile: React.FC = () => {
  const { checkUser, user } = useAuth();

  useEffect(() => {
    checkUser();
  }, []);
  
  return (
    <Grow in={true} style={{ transformOrigin: '0 0 0' }} timeout={1000}>
      <CustomSideBar>
        <Box>
          <Avatar alt={user?.first_name} src={user?.image} sx={{ width: 100, height: 100, margin: '3rem 0' }} />
          <AddPhotoAlternateIcon sx={{ color: "#576CBC" }}/>
        </Box>
        <CustomTypography variant="h6">{user?.first_name} {user?.last_name}</CustomTypography>
        <CustomTypography variant="body1">{user?.email}</CustomTypography>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <CustomTypography variant="body2"  sx={{ marginRight: '2rem' }}>Account Type: </CustomTypography>
          {user?.account_type == "Basic" ? (
              <BasicType variant="body2">{user?.account_type}</BasicType>
            ) : user?.account_type == "Plus" ? (
              <PlusType variant="body2">{user?.account_type}</PlusType>
          ) : (
              <ProType variant="body2">{user?.account_type}</ProType>
          )}
        </Box>
      </CustomSideBar>
    </Grow>
  );
}

export default Profile;
