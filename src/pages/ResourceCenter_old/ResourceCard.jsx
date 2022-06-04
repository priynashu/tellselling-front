import { IoIosShareAlt } from 'react-icons/io';
import { AiFillEye } from 'react-icons/ai';
import axios from 'axios'

import styles from './resource.module.scss';

//menu imports
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button } from '@mui/material';

//modal imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { backend_url } from '../../utils/Config';

//modal styles
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export const ResourceCard = ({id , imageUrl, category, title, shares, views , openEditDrawer , fetchData}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  //modal state
  const [open, setOpen] = useState(false);

  //dropdown handlers
  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = (e) => {
    setAnchorEl(null);
  };

  //modal handlers
  const handleModalOpen = () => {
    handleMenuClose();
    setOpen(true);
  };
  const handleModalClose = () => {
    setOpen(false);
  };

  const deleteResources = async (processURL) => {
    let fileName =  processURL.substr(processURL.lastIndexOf('/'));
    console.log(fileName);
    const extensionType = fileName.substr(fileName.lastIndexOf('.')) ;
    fileName = fileName.substr(1 , fileName.length - extensionType.length - 1);
    console.log(fileName);

    const res = await axios.post(backend_url+'/resources/delete', {
      public_id: fileName,
      _id: id
    }).then(res => res.data);

    handleMenuClose();
    fetchData();
  };

  return (
    <>

    <div className={styles.card}>
      <div className={styles.image_wrapper}>
        <img src={imageUrl} alt={title} />
      </div>
      <div className={styles.post_content}>
        <div>
          <p className={styles.post_category}>{category}</p>
          <h4 className={styles.post_title}>{title} 
          <Button 
          style={{float:'right'}} 
          onClick={handleOpenMenu} 
          aria-controls="menu" 
          aria-haspopup="true" 
          aria-expanded={Boolean(anchorEl) ? 'true' : undefined}>
            <span style={{float:'right'}}>
              <MoreVertIcon fontSize='small' ></MoreVertIcon>
            </span>
          </Button>
          </h4>
        </div>
        <div className={styles.stats_wrapper}>
          <div className={styles.stat}>
            <IoIosShareAlt color='grey' />
            <span className={styles.number_count}>{shares}</span>
          </div>
          <div className={styles.stat}>
            <AiFillEye color='grey' />
            <span className={styles.number_count}>{views}</span>
          </div>
        </div>
      </div>
    </div>

    <Menu 
      style = {{
        marginTop: '50px',
        transform: 'translateX(0px) translateY(-50px)'
      }}
      id="menu" 
      anchorEl={anchorEl} 
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      disableAutoFocusItem
      open={Boolean(anchorEl)}
      onClose={handleMenuClose} 
    >
      <MenuItem onClick={handleModalOpen}><span> Preview</span></MenuItem>
      <MenuItem onClick={() => openEditDrawer(id)}>Edit</MenuItem>
      <MenuItem onClick={() => deleteResources(imageUrl,id)}>Delete</MenuItem>
    </Menu>

    <Modal
      open={open}
      onClose={handleModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle} className={styles.preview_modal}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        <img style={{width:'100%', height:'100%'}} src={imageUrl} alt={title} />
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </Box>
    </Modal>

    </>
  );
};
