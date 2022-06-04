import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

import styles from './Account.module.scss';
import {Row,Col} from 'react-bootstrap'
const Input = styled('input')({
  display: 'none',
});

export const UploadPicture = ({ handleFileUpload,handleFileReset }) => {
  return (
    <label htmlFor='upload-file'>
      <Input
        accept='image/*'
        id='upload-file'
        multiple={false}
        type='file'
        onChange={handleFileUpload}
      />
      <Row style={{marginLeft:"5px"}}>
        <Col sm="auto" style={{padding:'0',paddingRight:"15px"}}>
        <Button
        variant='contained'
        component='span'
        className={styles.upload}
        style={{ textTransform: 'none' }}
      >
        Upload
      </Button>
        </Col>
        <Col sm="auto" style={{padding:'0',paddingRight:"15px"}}>
        <button className={styles.reset} onClick={handleFileReset}>
                    Reset
      </button>
        </Col>
      </Row>
      
      
    </label>
  );
};
