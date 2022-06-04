import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import styles from './createrooms.module.scss';

const SalesRoomTypeCard = ({ title, description, features, image, navigateTo }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.full_card}>
      <div className={styles.image_wrapper}>
        <img src={image} alt={title} />
      </div>
      <div className={styles.card_content}>
        <h3 className={styles.content_title}>{title}</h3>

        <p className={styles.content_des}>{description}</p>

        <ul className={styles.features}>
          {features?.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </div>
      <div className={styles.edit_area}>
        <Button
          fullWidth
          variant='contained'
          style={{
            textTransform: 'none',
            borderColor: '#7367f0 !important',
            backgroundColor: '#7367f0 !important',
            color: '#fff !important',
            fontSize:'12px'
          }}
          onClick={() => navigate(navigateTo)}>
          Continue {'>'}
        </Button>
      </div>
    </div>
  );
};

export { SalesRoomTypeCard };
