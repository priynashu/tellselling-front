import { ToastContainer } from 'react-toastify';

import { SideBar } from '../SideBar';
import { TopBar } from '../TopBar';
import styles from './Layout.module.scss';

const Layout = ({ children }) => {
  return (
    <div className={styles.main}>
      <SideBar />
      <div className={styles.content}>
        <TopBar />
        <div className={styles.pages}>{children}</div>
      </div>
      <ToastContainer />
    </div>
  );
};

export { Layout };
