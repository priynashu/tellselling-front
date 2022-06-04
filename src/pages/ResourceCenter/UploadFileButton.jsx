import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

import styles from '../Account/Account.module.scss';

const Input = styled('input')({
  display: 'none',
});

export const UploadFileButton = ({ isContent, handleFileUpload }) => {
  return (
    <label htmlFor={isContent ? 'upload-file' : 'upload-thumb'} style={{ margin: '0' }}>
      <Input
        accept={isContent ? 'image/*, video/*, .pdf' : 'image/*'}
        id={isContent ? 'upload-file' : 'upload-thumb'}
        multiple={false}
        type='file'
        onChange={handleFileUpload}
        required={true}
      />
      <Button
        variant='contained'
        component='span'
        className={styles.upload}
        style={{ textTransform: 'none' }}
      >
        Upload
      </Button>
    </label>
  );
};
