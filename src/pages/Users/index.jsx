import { useState, useEffect } from 'react';
import axios from 'axios';

import { AccountTopbar } from '../../components';
import { UsersCard } from './UsersCard';
import { AddUserCard } from './AddUserCard';
import { AddUserDrawer } from './AddUserDrawer';
import { UserTable } from './UserTable';
import styles from './Users.module.scss';

import { getLocalUser } from '../../utils/GetLocalUser';
import { backend_url } from '../../utils/Config';

const Users = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tenantData, setTenantData] = useState();
  const [localUserData, setLocalUserData] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const localUser = getLocalUser();
    setLocalUserData(localUser);
    const tenantId = localUser.tenantId;
    if (localUser.role === 'Admin') {
      axios
        .get(backend_url+'tenants/getusers/'+tenantId)
        .then((res) => {
          setTenantData(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsOpen(open);
  };

  return (
    <>
      <AccountTopbar />
      {localUserData?.role !== 'Admin' ? (
        <h2 style={{ fontSize: '1.2em', fontWeight: '500', margin: '40px 0 0 20px' }}>
          You don't have permission to view this content !
        </h2>
      ) : (
        <div className={styles.users_wrapper}>
          <div className={styles.user_card_wrapper}>
            {tenantData?.sortedRoles.map((role) => (
              <UsersCard key={role.roleName} role={role.roleName} usersNumber={role.users.length} />
            ))}
            <AddUserCard onAddUser={toggleDrawer(true)} />
          </div>
          <AddUserDrawer
            isOpen={isOpen}
            onClose={toggleDrawer(false)}
            closeDrawer={() => setIsOpen(false)}
            onSuccess={() => fetchUsers()}
          />

          <h2 className={styles.user_title}>Users</h2>
          {tenantData && <UserTable userData={tenantData?.users} onEdituserSuccess={fetchUsers} />}
        </div>
      )}
    </>
  );
};

export { Users };
