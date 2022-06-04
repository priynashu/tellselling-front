import { Link, useLocation } from 'react-router-dom';
import { HomeData, AppsData, AdminData } from './SidebarData';
import {useState} from "react"
import { getLocalUser } from '../../utils/GetLocalUser';
import styles from './Sidebar.module.scss';
import Logo from './logo.png'
import "./sidebar.css"
/***
 * @name SideBar
 * @description Renders Side Navigation bar to the panel
 * @param null
 */

const SideBar = () => {
  const location = useLocation();
  const localUser = getLocalUser();
  // const [isOpen, setIsOpen] = useState(false);
  // const [onClose, setOnClose] = useState(false);
  // // const localUser = "Aman"
  // const toggleDrawer = (open) => (event) => {
  //   if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
  //     return;
  //   }
  //   setIsOpen(open);
  // };

  const isActiveClass = (path) =>
    location.pathname === path ? `${styles.item} ${styles.active}` : styles.item;

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <img src={Logo} style={{height:'28px',float:'left', marginRight:'10px'}}/> <h4 style={{color:'#776cf7'}}>Tellselling</h4>
      </div>
      {/* <BsArrowBarLeft className={styles.close_button} onClick={()=>{setIsOpen(true)}}/> */}
      {HomeData?.map((item) => (
        <Link to={item.routeTo} className={isActiveClass(item.routeTo)} key={item.routeTo}>
          {item.iconData} {item.name}
        </Link>
      ))}
      {/* <Drawer anchor='left' open={isOpen}>
        <Button  variant='outline-primary' style={{border:"none"}} onClick={toggleDrawer(false)}><BsFillXCircleFill/></Button> */}
      <div className={styles.group}>
        <div className={styles.title}>APPS</div>
        {AppsData?.map((item) => (
          <Link to={item.routeTo} className={isActiveClass(item.routeTo)} key={item.routeTo} >
            <span className={styles.item_name}> <span className="icons">{item.iconData}</span> {item.name}</span>            
          </Link>
        ))}
      </div>

      <div className={styles.group}>
        <div className={styles.title}>ADMIN</div>
        {localUser.role !== 'Admin' ? (
          <Link
            to={AdminData[0].routeTo}
            className={isActiveClass(AdminData[0].routeTo)}
            key={AdminData[0].routeTo}
            
          >
            {AdminData[0].iconData} {AdminData[0].name}
          </Link>
        ) : (
          AdminData?.map((item) => {
            return (
              <Link to={item.routeTo} className={isActiveClass(item.routeTo)} key={item.routeTo}>
                {item.iconData} {item.name}
              </Link>
            );
          })
        )}
      </div> 
      {/* </Drawer> */}
      {/* <div className={styles.group}>
        <div className={styles.title}>APPS</div>
        {AppsData?.map((item) => (
          <Link to={item.routeTo} className={isActiveClass(item.routeTo)} key={item.routeTo}>
            {item.iconData} {item.name}
          </Link>
        ))}
      </div>

      <div className={styles.group}>
        <div className={styles.title}>ADMIN</div>
        {localUser.role !== 'Admin' ? (
          <Link
            to={AdminData[0].routeTo}
            className={isActiveClass(AdminData[0].routeTo)}
            key={AdminData[0].routeTo}
          >
            {AdminData[0].iconData} {AdminData[0].name}
          </Link>
        ) : (
          AdminData?.map((item) => {
            return (
              <Link to={item.routeTo} className={isActiveClass(item.routeTo)} key={item.routeTo}>
                {item.iconData} {item.name}
              </Link>
            );
          })
        )}
      </div> */}
    </div>
  );
};

export { SideBar };
