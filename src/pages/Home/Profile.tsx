import React, { useEffect, useState } from 'react';
import {  Box, Grow } from '@mui/material';
import { useAuth } from '../../components/context/AuthContext';
import { CustomSideBar, CustomTypography, ProType, BasicType, PlusType, CustomAvatar, CustomAddImage } from './styles';
import * as API from '../../apis/Apis';

const Profile: React.FC = () => {
  const { checkUser, user } = useAuth();
  const [imageChangeActive, setImageChangeActive] = useState(false);

  const handleChangeImage = () => {
    setImageChangeActive(true);
    setTimeout(() => {
      setImageChangeActive(false);
    }, 200);

  };

  useEffect(() => {
    checkUser();
  }, []);
  
  return (
    <Grow in={true} style={{ transformOrigin: '0 0 0' }} timeout={1000}>
      <CustomSideBar>
        <Box>
          <CustomAvatar alt={user?.first_name} src={user?.image} >{user?.first_name.charAt(0)}</CustomAvatar>
          <CustomAddImage isActive={imageChangeActive} onClick={handleChangeImage}/>
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
