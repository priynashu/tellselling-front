import { useState } from 'react';
import { getLocalUser } from '../../utils/GetLocalUser';
import styles from './Topbar.module.scss';
import {RiAccountCircleFill} from 'react-icons/ri'
import {MdOutlinePersonOutline} from 'react-icons/md'
import {FiPower} from 'react-icons/fi'
import { useNavigate} from 'react-router-dom';
import { AllRoutes } from '../../utils/AllRoutes';
import {
  Container,
  Row,
  Col} from 'react-bootstrap';
import {Modal, Box} from '@mui/material';
import "./styles.css"
import * as alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
const imageUrl = 'https://i.imgur.com/0eVx62a.png';

const TopBar = () => {
  const userData = getLocalUser();
  console.log("user data",userData);
  const navigate = useNavigate();
  const [open,
    setOpen] = useState(false);
const handleOpen = () => {
    setOpen(true);
};
const handleClose = () => {
    setOpen(false);
};
  const handleProfileClick = ()=>{
    handleOpen()
    console.log("profile button click");
  }
  const handleAccountClick=()=>{
    navigate(AllRoutes.account, { replace: true });   
    handleClose()
  }
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
    <div className={styles.topbar}>      
      <div className={styles.text} onClick={handleProfileClick} style={{cursor:"pointer"}}>
        <h4 className={styles.title} style={{marginBottom:"0"}}>
          {userData?.firstName} {userData?.lastName}
        </h4>
        <p className={styles.role}>{userData?.role}</p>
      </div>
      <div  >
        {userData.profilePhoto?<img style={{width:"35px",height:"35px", borderRadius:"50%",marginLeft:"5px"}} src={userData.profilePhoto} alt='profile' />:<RiAccountCircleFill style={{fontSize:"40px",color:"grey",marginLeft:"5px"}} /> }
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box className={styles.box}>
        <Container style={{margin:"0"}}>
          <Row style={{paddingTop:"5px",paddingLeft:"10px",cursor:"pointer"}} className={styles.profile}>
            <Col style={{padding:"0"}} sm={12} onClick={handleAccountClick}>
            <MdOutlinePersonOutline style={{fontSize:"20px",paddingBottom:"3px"}}/> <span style={{fontSize:"15px"}}>Profile</span>
            </Col>
          </Row>
          
          <Row style={{paddingLeft:"10px",paddingBottom:"5px"}} className={styles.logout} >
            <Col style={{padding:"0"}} sm={12} onClick={handleSignOut}>
            <FiPower style={{fontSize:"18px",paddingBottom:"3px"}}/> <span style={{fontSize:"15px"}}>Logout</span>
            </Col>
          </Row>
        </Container>
        </Box>  
    </Modal>
      
    </div>
  );
};

export { TopBar };
