import { Link } from 'react-router-dom';
import styles from './Card.module.scss';
import { AllRoutes } from '../../utils/AllRoutes';

const SalesRoomCard = ({ data }) => {
  return (
    <div className={styles.card}>
      <img className={styles.image} src={data.thumbnail} alt='Banner' />
      <div className={styles.text}>
        <h3 className={styles.room_title}>{data.title}</h3>
        <p className={styles.room_description}>
          {data.description}
        </p>
        <Link className={styles.link} to={AllRoutes.salesRoom}>
          View Room
        </Link>
      </div>
    </div>
  );
};

export { SalesRoomCard };
