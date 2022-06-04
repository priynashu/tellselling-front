import { Link } from 'react-router-dom';
import styles from './Card.module.scss';
import { AllRoutes } from '../../utils/AllRoutes';

const FormCard = ({ title,imageUrl,id }) => {
  const link=AllRoutes.form+"?"+id;
  return (
    <div className={styles.card}>
      <img className={styles.image} src={imageUrl} alt='Banner' />
      <div className={styles.text}>
        <h3 className={styles.room_title}>{title}</h3>
        <Link className={styles.link} style={{marginTop:10}} to={link}>
          Edit Form
        </Link>
      </div>
    </div>
  );
};

export { FormCard };
