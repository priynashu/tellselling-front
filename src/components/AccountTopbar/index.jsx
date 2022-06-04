import { NavLink, useLocation } from 'react-router-dom';

import { getLocalUser } from '../../utils/GetLocalUser';
import { AllRoutes } from '../../utils/AllRoutes';
import { MdPersonOutline } from 'react-icons/md';
import { FiLock } from 'react-icons/fi';
import {BiUser} from 'react-icons/bi'
import { BsBell, BsBookmark } from 'react-icons/bs';
import {BsChevronRight} from 'react-icons/bs'
import {Row,Col} from 'react-bootstrap'
import styles from './AccountTopbar.module.scss';


const AccountTopbar = () => {
  const location = useLocation();
  const localUser = getLocalUser();

  return (
    <div className={styles.wrapper}>
      <Row>
          <Col sm="auto">
          <span className={styles.title}>Account</span>                  
          </Col>
          <Col sm="auto" style={{paddingTop:"5px",paddingLeft:"0",paddingRight:"0"}}>
          <a className={styles.after_title}>Home</a>&nbsp;&nbsp;<BsChevronRight style={{fontSize:"12px",color:"gray",fontWeight:"900"}}/>
          </Col>
          <Col sm="auto" style={{paddingTop:"5px",paddingLeft:"5px",paddingRight:"0"}}>
          <a className={styles.after_title}>Admin</a>&nbsp;&nbsp;<BsChevronRight style={{fontSize:"12px",color:"gray",fontWeight:"900"}}/>
          </Col>
          <Col sm="auto" style={{paddingTop:"5px",paddingLeft:"5px",paddingRight:"0"}}>
          <a className={styles.after_admin}>Account</a>
          </Col>
        </Row>
      <div className={styles.links}>
        <NavLink
          to={AllRoutes.account}
          className={location.pathname === AllRoutes.account ? styles.active : styles.link}
        >
          <BiUser size={17} style={{marginTop:"3px"}} /><span  className={styles.span_link}>Account</span>
        </NavLink>
        {localUser.role === 'Admin' && (
          <NavLink
            to={AllRoutes.users}
            className={location.pathname === AllRoutes.users ? styles.active : styles.link}
          >
            <FiLock style={{marginTop:"3px"}}/> <span>Users</span>
          </NavLink>
        )}
        {localUser.role === 'Admin' && (
          <NavLink
            to={AllRoutes.commissionRules}
            className={
              location.pathname === AllRoutes.commissionRules ? styles.active : styles.link
            }
          >
            <BsBell style={{marginTop:"3px"}}/> <span>Commission Rules</span>
          </NavLink>
        )}

        {localUser.role === 'Admin' && (
          <NavLink
            to={AllRoutes.billing}
            className={location.pathname === AllRoutes.billing ? styles.active : styles.link}
          >
            <BsBookmark style={{marginTop:"3px"}}/> <span>Billing</span>
          </NavLink>
        )}
        {localUser.role === 'Admin' && (
          <NavLink
            to={AllRoutes.billing}
            className={location.pathname === AllRoutes.setting ? styles.active : styles.link}
          >
            <BsBookmark style={{marginTop:"3px"}}/> <span>Settings</span>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export { AccountTopbar };
