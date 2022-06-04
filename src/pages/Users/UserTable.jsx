import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import axios from 'axios';

import { UserEditModal } from './UserEditModal';
import styles from './usertable.module.scss';
import { backend_url } from '../../utils/Config';
const Labels = ['EMAIL ID', 'FIRST NAME', 'LAST NAME', 'ROLE', 'STATUS', 'ACTIONS'];

const UserTable = ({ userData, onEdituserSuccess }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const open = Boolean(anchorEl);
  const [selectedData, setSelectedData] = useState({});

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleEDitDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsEditOpen(open);
  };

  const openEditDrawer = () => {
    setIsEditOpen(true);
    handleClose();
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(backend_url+'users/delete/'+selectedData.email);
      console.log(res.data);
      toast.success('User Deleted Successfully !', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      handleClose();
      onEdituserSuccess();
    } catch (error) {
      console.log(error);
      toast.error('Failed to Update User !', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  };

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            {Labels.map((label) => (
              <th key={label}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {userData &&
            userData.map((user) => {
              return (
                <tr key={user._id}>
                  <td>{user.email}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.role}</td>
                  <td>{user.accountStatus}</td>
                  <td>
                    <Button
                      className={styles.actions}
                      id='basic-button'
                      aria-controls='basic-menu'
                      aria-haspopup='true'
                      aria-expanded={open ? 'true' : undefined}
                      onClick={(e) => {
                        setSelectedData(user);
                        handleClick(e);
                      }}
                    >
                      <MoreVertIcon style={{ color: 'grey' }} />
                    </Button>
                    <Menu
                      id='basic-menu'
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                      elevation={3}
                    >
                      <MenuItem onClick={openEditDrawer}>
                        <EditIcon fontSize='small' />
                        <span style={{ marginLeft: '5px' }}>Edit</span>
                      </MenuItem>
                      <MenuItem onClick={handleDelete}>
                        <DeleteIcon fontSize='small' />
                        <span style={{ marginLeft: '5px' }}>Delete</span>
                      </MenuItem>
                    </Menu>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <UserEditModal
        isOpen={isEditOpen}
        onClose={toggleEDitDrawer(false)}
        closeDrawer={() => setIsEditOpen(false)}
        onSuccess={onEdituserSuccess}
        userData={selectedData}
      />
    </>
  );
};

export { UserTable };
