import AddUserSVG from '../../assets/add-new-user.svg';
import styles from './Users.module.scss';

const AddUserCard = ({ onAddUser }) => {
  return (
    <div className={styles.add_new_card}>
      <div className={styles.image_div}>
        <img src={AddUserSVG} alt='Add New' />
      </div>
      <div className={styles.button_content}>
        <button onClick={onAddUser}>Add Users</button>
        <p>Add user, if it does not exist</p>
      </div>
    </div>
  );
};

export { AddUserCard };
