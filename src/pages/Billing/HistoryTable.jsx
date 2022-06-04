import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import axios from 'axios';
import styles from './historyTable.module.scss';
import {AiOutlineCloudDownload} from 'react-icons/ai'
// import { UserEditModal } from './UserEditModal';
// import styles from './usertable.module.scss';
import { backend_url } from '../../utils/Config';
const Labels = ['PAYMENT NUMBER', 'DESCRIPTION', 'AMOUNT', 'ACTIONS'];

const HistoryTable = ({ historyData}) => {
    const handleDownloadClick=(url)=>{
        // console.log("inside download",url);
        window.open(url)
      }
    const [anchorEl, setAnchorEl] = useState(null);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [url,setUrl] = useState();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

      
console.log("history data",historyData);
  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tr}>
            {Labels.map((label) => (
              <th key={label}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {historyData &&
            historyData.map((user) => {
                

              return (
                <tr key={user.id} className={styles.tr}>                  
                  <td className={styles.td}>{user.id}</td>
                  <td className={styles.td}>{user.description}</td>
                  <td className={styles.td}>${(user.amount)/100}</td>                  

                  <td className={styles.td}>
                    {/* <Button
                    className={styles.actions}
                      id='basic-button'
                      aria-controls='basic-menu'
                      aria-haspopup='true'
                      onClick={(e) => {                        
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
                    > */}
                      <AiOutlineCloudDownload className={styles.downloadBtn}onClick={()=>{handleDownloadClick(user.receipt_url)}}/>
                    {/* </Menu> */}
                    
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {/* <UserEditModal
        isOpen={isEditOpen}
        onClose={toggleEDitDrawer(false)}
        closeDrawer={() => setIsEditOpen(false)}        
        
      /> */}
    </>
  );
};

export { HistoryTable };
