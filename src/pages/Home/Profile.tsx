import React, { useEffect, useState } from 'react';
import {  Box, Grow, IconButton } from '@mui/material';
import { useAuth } from '../../components/context/AuthContext';
import FileBase from 'react-file-base64';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { CustomSideBar, CustomTypography, ProType, BasicType, PlusType, CustomAvatar, CustomAddImage } from './styles';
import * as API from '../../apis/Apis';

interface ProfileFormData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}


const Profile: React.FC = () => {
  const { user, refreshUserToken } = useAuth();
  const [imageChangeActive, setImageChangeActive] = useState(false);
  const [imageChangeLoading, setImageChangeLoading] = useState(false);
  const [profielImage, setProfileImage] = useState('');
  const [formData, setFormData] = useState<ProfileFormData>({
    email: user?.email || '',
    password: '',
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
  });

  const handleActiveAddImage = () => {
    setImageChangeActive(true);
    setTimeout(() => {
      setImageChangeActive(false);
    }, 200);

  };

  useEffect(() => {
    const ApiCall = async () => {
      if(profielImage) {
        setImageChangeLoading(true);
        const { data } = await API.updateuserImage({image: profielImage});
        refreshUserToken(data);
        setImageChangeLoading(false);
      }
    };
    ApiCall();
  }, [profielImage]);
  
  return (
    <Grow in={true} style={{ transformOrigin: '0 0 0' }} timeout={1000}>
      <CustomSideBar>
        <Box>
          <CustomAvatar alt={user?.first_name} src={user?.image} >{user?.first_name.charAt(0)}</CustomAvatar>
          <IconButton aria-label="upload picture" component="label" sx={{  position: 'absolute', right: 125, top: 125 }}>
            { imageChangeLoading? 
              <img src={'/loading.svg'} alt="My SVG" style={{ height: "3rem" }} /> :
              <AddPhotoAlternateIcon sx={{ color: imageChangeActive ? "#FF5733" : "#6499E9", transition: 'color 0.2s' }} onClick={handleActiveAddImage}/>
            }
            <div style={{ display: 'none' }}>
              <FileBase type="file" multiple={false} onDone={({base64}: {base64: string})  => setProfileImage(base64)}/>
            </div>          
          </IconButton>
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
