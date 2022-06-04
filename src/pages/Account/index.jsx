import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { AccountTopbar } from '../../components';
import { DeleteAccount } from './DeleteAccount';
import { UploadPicture } from './UploadPicture';
import styles from './Account.module.scss';
import { toast } from 'react-toastify';
import {Row,Col,Form} from 'react-bootstrap'
import { getLocalUser } from '../../utils/GetLocalUser';
import { AllRoutes } from '../../utils/AllRoutes';
import { isChanged } from './IsProfileDetailsChanged';
import {TextField} from "@mui/material"
import * as alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import { backend_url } from '../../utils/Config';
const imageUrl = 'https://i.imgur.com/0eVx62a.png';

const Account = () => {
  const navigate = useNavigate();
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [profileFile,setProfileFile] = useState()
  const [formData, setFormData] = useState({
    profilePhoto: '',
    firstName: '',
    lastName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
  });
  const [userData, setUserData] = useState({
    profilePhoto: '',
    firstName: '',
    lastName: '',
    email: '',
  });

  useEffect(() => {
    const localUserData = getLocalUser();
    setUserData({
      profilePhoto: localUserData.profilePhoto,
      firstName: localUserData.firstName,
      lastName: localUserData.lastName,
      email: localUserData.email,
    });
  }, []);

  useEffect(() => {
    setFormData((prevData) => {
      return {
        ...prevData,
        profilePhoto: userData.profilePhoto,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
      };
    });
  }, [userData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => setFormData({ ...formData, profilePhoto: reader.result });
    }
  };

  const handleFileReset = (e) => {
    setFormData({ ...formData, profilePhoto: '' });
  };

  useEffect(() => {
    setIsDataChanged(isChanged(formData, userData));
  }, [formData, userData]);

  const profilePhotoUpload = (e) => {
    // this.setState({ thumbnail: e.target.files[0] })
    //Upload thumbnail
    const form = new FormData();
    form.append("file", e.target.files[0]);
    form.append("upload_preset", "ce0qpcmg");
    axios.post("https://api.cloudinary.com/v1_1/tellselling/image/upload", form).then((res) => {
        const url = res.data.url;
        console.log("profile url",url);
        setFormData({ ...formData, profilePhoto: url  });
    }).catch((err) => {
        console.log(err);
    });
}
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("form data",formData);
    try {
      const res = await axios.post(backend_url+'users/update', formData);
      localStorage.setItem('user', JSON.stringify(res.data));
      toast.success('Userdata updated successfully !', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      setIsDataChanged(false);
      window.location.reload()
    } catch (error) {
      console.log(error);
      toast.error('Failed to Update Data !', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  };

  const handleReset = (e) => {
    setFormData({
      profilePhoto: '',
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      currentPassword: '',
      newPassword: '',
    });
  };

  // const handleSignOut = () => {
  //   if (window.confirm("Are you sure?")) {
       
  //      localStorage.clear();
  //   navigate(AllRoutes.signinRoute, { replace: true });
  // } else {
  //   console.log("You pressed cancel!")
  // }
    
  // };
  const handleSignOut=()=>{
    
    alertify.confirm("Are you Sure","", function(){ 
      localStorage.clear();
        navigate(AllRoutes.signinRoute, { replace: true });
    },
         function(){ 
            
            console.log("cancel");
        });
}

  return (
    <>
      <AccountTopbar />
      <div className={styles.account_wrapper}>
        <div className={styles.profile_details}>
          <h2 className={styles.title}>Profile Details</h2>
          <div className={styles.form}>
            <div className={styles.image_wrapper}>
              <Row>
                <Col sm="auto" style={{paddingRight:"0",marginRight:"10px"}}>
                <img src={formData.profilePhoto || imageUrl} alt='profile' />
                </Col>              
                <Col sm="auto" className="mt-4" style={{paddingLeft:"0"}}>               
                <div>
                  <UploadPicture handleFileUpload={handleFileUpload} handleFileReset={handleFileReset} />
                <p className={styles.file_types}>Allowed file types: png, jpg, jpeg</p>
                </div>
              </Col>
              </Row>
            </div>
            <form className={styles.form_content} onSubmit={handleSubmit} onReset={handleReset}>
              <div className={styles.name}>
                <div className={styles.first_name}>
                  <label htmlFor='firstName' className={styles.label}>First Name</label>
                  <Form.Control
                    className={styles.input_form}
                    id='firstName'
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    size='small'
                    fullWidth                    
                  />
                </div>
                <div className={styles.last_name}>
                  <label htmlFor='lastName' className={styles.label}>Last Name</label>
                  <Form.Control
                    id='lastName'
                    className={styles.input_form}
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    size='small'
                  />
                </div>
              </div>
              <div className={styles.email}>
                <label htmlFor='email' className={styles.label}>Email</label>
                <Form.Control
                  id='email'
                  className={styles.input_form}
                  value={formData.email}
                  required                                    
                  size='small'                  
                />
              </div>
              
                <div className={styles.password}>
                  <label htmlFor='currentPassword' className={styles.label}>Current Password</label>
                  <Form.Control
                    id='currentPassword'
                    value={formData.currentPassword}
                    className={styles.input_form}
                    onChange={handleChange}
                    autoComplete='off'
                    type='password'                    
                    fullWidth                    
                  />
                </div>
                <div className={styles.password}>
                  <label htmlFor='newPassword' className={styles.label}>New Password</label>
                  <Form.Control
                    id='newPassword'
                    className={styles.input_form}
                    value={formData.newPassword}
                    onChange={handleChange}
                    autoComplete='off'
                    type='password'                    
                    fullWidth                    
                  />
                </div>
              
              <div className={styles.form_buttons}>
                <Button
                  type='submit'
                  disabled={!isDataChanged}
                  color='success'
                  variant='contained'
                  size='medium'
                  style={{ textTransform: 'none' }}
                >
                  Save changes
                </Button>
                <Button
                  type='reset'
                  disabled={!isDataChanged}
                  color='warning'
                  variant='outlined'
                  size='medium'
                  style={{ textTransform: 'none' }}
                >
                  Discard
                </Button>

                <LogoutButton size='large' variant='contained' onClick={handleSignOut}>
                  Sign Out
                </LogoutButton>
              </div>
            </form>
          </div>
        </div>
        <DeleteAccount />
      </div>
    </>
  );
};

const LogoutButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(red[600]),
  backgroundColor: red[600],
  textTransform: 'none',
  padding: '3px 20px',
  '&:hover': {
    backgroundColor: red[700],
  },
}));

export { Account };
