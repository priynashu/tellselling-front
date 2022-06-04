import { useState, Fragment, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import { backend_url } from '../../utils/Config';
import styles from './Drawerstyles.module.scss';

const ROLES = ['Sales', 'Partner', 'User', 'Admin'];

const UserEditModal = ({ isOpen, onClose, closeDrawer, onSuccess, userData }) => {
  const [formData, setFormData] = useState({
    email: '',
    role: 'Sales',
    manager: '',
    jobTitle: '',
    location: '',
  });

  useEffect(() => {
    setFormData((prevData) => {
      return {
        ...prevData,
        email: userData.email,
        role: userData.role,
        manager: userData.manager,
        jobTitle: userData.jobTitle,
        location: userData.location,
      };
    });
  }, [userData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await axios.post(backend_url+'tenants/updateUser', {
        ...formData,
        userId: userData._id,
      });
      console.log(res);
      toast.success('User Updated Successfully !', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      onSuccess();
    } catch (error) {
      console.log(error);
      toast.error('Failed to Update User !', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
    closeDrawer();
  };

  const handleReset = () => {
    setFormData({
      email: '',
      role: 'Sales',
      department: '',
      manager: '',
      jobTitle: '',
      location: '',
    });
    closeDrawer();
  };

  return (
    <Fragment>
      <Drawer anchor='right' open={isOpen} onClose={onClose}>
        <Box className={styles.drawer_wrapper}>
          <div className={styles.header}>
            <h3 className={styles.title}>Edit User</h3>
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
            <label htmlFor='email'>Email Address</label>
            <TextField
              disabled
              id='email'
              required
              value={userData.email}
              placeholder='Enter email address'
              variant='outlined'
              size='small'
            />

            <label htmlFor='email'>First Name</label>
            <TextField
              disabled
              required
              value={userData.firstName}
              placeholder='First Name'
              variant='outlined'
              size='small'
            />

            <label htmlFor='email'>Last Name</label>
            <TextField
              disabled
              required
              value={userData.lastName}
              placeholder='Last Name'
              variant='outlined'
              size='small'
            />

            <label htmlFor='role'>User Role</label>
            <Select
              disabled={userData.role === 'Admin' ? true : false}
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              size='small'
            >
              {ROLES.map((val) => (
                <MenuItem value={val} key={val}>
                  {val}
                </MenuItem>
              ))}
            </Select>

            <label htmlFor='email'>Status</label>
            <TextField
              disabled
              required
              value={userData.accountStatus}
              placeholder='Last Name'
              variant='outlined'
              size='small'
            />

            <label htmlFor='manager'>Manager</label>
            <TextField
              id='manager'
              required
              value={formData.manager}
              onChange={handleChange}
              placeholder="Enter manager's name or email"
              variant='outlined'
              size='small'
            />

            <label htmlFor='jobTitle'>Job Title</label>
            <TextField
              id='jobTitle'
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder='e.g. Product Manager'
              variant='outlined'
              size='small'
            />

            <label htmlFor='location'>Location</label>
            <TextField
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
                Cancel
              </button>
            </div>
          </Box>
        </Box>
      </Drawer>
    </Fragment>
  );
};

export { UserEditModal };
