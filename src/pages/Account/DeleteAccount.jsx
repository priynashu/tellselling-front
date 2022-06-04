import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';
import axios from 'axios';

import { getLocalUser } from '../../utils/GetLocalUser';
import { AllRoutes } from '../../utils/AllRoutes';

import styles from './Account.module.scss';
import {backend_url} from "../../utils/Config"
const DeleteButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(red[600]),
  backgroundColor: red[600],
  textTransform: 'none',
  padding: '3px 20px',
  '&:hover': {
    backgroundColor: red[700],
  },
}));

const DeleteAccount = () => {
  const navigate = useNavigate();
  const [isConfirm, setConfirm] = useState(false);

  const handleDelete = async () => {
    const localUser = getLocalUser();
    try {
      const res = await axios.delete(backend_url+`users/delete/${localUser.email}`);
      console.log(res.data);
      localStorage.clear();
      navigate(AllRoutes.signinRoute, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.delete_account}>
      <h2 className={styles.title}>Delete Account</h2>
      <div className={styles.form}>
        <p className={styles.sure_text_1}>Are you sure you want to delete your account</p>
        <p className={styles.sure_text_2}>
          Once you delete your account, there is no going back, Please be certain
        </p>
        <div className={styles.checked_div}>
          <input
            type='checkbox'
            id='confirm'
            value={isConfirm}
            onChange={(e) => setConfirm(e.target.checked)}
          />
          <label htmlFor='confirm'>Confirm Delete</label>
        </div>
        <Stack spacing={2} direction='row'>
          <DeleteButton
            disabled={!isConfirm}
            size='large'
            variant='contained'
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
          >
            Delete
          </DeleteButton>
        </Stack>
      </div>
    </div>
  );
};

export { DeleteAccount };
