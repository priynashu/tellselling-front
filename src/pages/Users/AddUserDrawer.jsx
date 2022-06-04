import { useState, Fragment } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import CloseIcon from '@mui/icons-material/Close';
import Form from "react-bootstrap/Form"
import { ToastContainer, toast } from 'react-toastify';

import { getLocalUser } from '../../utils/GetLocalUser';
import { backend_url } from '../../utils/Config';
import styles from './Drawerstyles.module.scss';

const ROLES = ['Sales', 'Partner', 'User', 'Admin'];

const AddUserDrawer = ({ isOpen, onClose, closeDrawer, onSuccess }) => {
  const currentUser = getLocalUser();

  const [formData, setFormData] = useState({
    email: '',
    role: 'Sales',
    department: '',
    manager: '',
    jobTitle: '',
    location: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    
      await axios.post(backend_url+'tenants/adduser', {...formData,tenantId: currentUser.tenantId}).then((res)=>{
        console.log("response of add user",res.data);
      toast.success('User added successfully !', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      onSuccess();
      }).catch ((err)=>{
        console.log("err message",err);
        if(err.message.includes(400)){
          toast.error('email already exists')  
        }
        else{
        toast.error('Failed to add user !', {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
      })
    closeDrawer(); 
    
  }

  const handleReset = (e) => {
    setFormData({
      email: '',
      role: 'Sales',
      department: '',
      manager: '',
      jobTitle: '',
      location: '',
    });
  };

  return (
    <Fragment>
      <Drawer anchor='right' open={isOpen} onClose={onClose}>
        <Box className={styles.drawer_wrapper}>
          <div className={styles.header}>
            <h3 className={styles.title}>Add Users</h3>
            <span className={styles.close_icon} onClick={onClose}>
              <CloseIcon />
            </span>
          </div>

          <Box
            component='form'
            onSubmit={handleSubmit}
            onReset={handleReset}
            className={styles.form}
            autoComplete='off'
          >
            <label htmlFor='email'>Add users with their email addresses</label>
            <Form.Control
              id='email'
              required
              value={formData.email}
              onChange={handleChange}
              placeholder='Enter email address'
              variant='outlined'
              size='small'
            />

            <label htmlFor='role'>Select User Role</label>
            <Form.Select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              size='small'
            >
              {ROLES.map((val) => (
                <option value={val} key={val}>
                  {val}
                </option>
              ))}
            </Form.Select>

            <label htmlFor='department'>Department</label>
            <Form.Control
              id='department'
              required
              value={formData.department}
              onChange={handleChange}
              placeholder='Sales'
              variant='outlined'
              size='small'
            />

            <label htmlFor='manager'>Manager</label>
            <Form.Control
              id='manager'
              required
              value={formData.manager}
              onChange={handleChange}
              placeholder="Enter manager's name or email"
              variant='outlined'
              size='small'
            />

            <label htmlFor='jobTitle'>Job Title</label>
            <Form.Control
              id='jobTitle'
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder='e.g. Product Manager'
              variant='outlined'
              size='small'
            />

            <label htmlFor='location'>Location</label>
            <Form.Control
              id='location'
              value={formData.location}
              onChange={handleChange}
              placeholder='e.g. San Jose'
              variant='outlined'
              size='small'
            />

            <div className={styles.buttons}>
              <button type='submit' className={styles.add}>
                Add
              </button>
              <button type='reset' className={styles.reset}>
                Reset
              </button>
            </div>
          </Box>
        </Box>
      </Drawer>
      <ToastContainer />
    </Fragment>
  );
};

export { AddUserDrawer };
