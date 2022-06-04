import { SalesRoomTypeCard } from './SalesRoomTypeCard';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import styles from './createrooms.module.scss';

import { SelectRoomTypeData } from './SelectRoomTypeData';
import Header from '../../../components/Header';

const SelectRoomType = () => {
  return (
    <div className={styles.main}>
      <Header title='Digital Sales Room' links={['Select Digital Sales Room Type']} />
      <div className={styles.wrapper}>
        <div className={styles.all_types}>
          {SelectRoomTypeData.map((data) => (
            <SalesRoomTypeCard
              key={data.title}
              title={data.title}
              description={data.description}
              features={data.features}
              image={data.image}
              navigateTo={data.navigateTo}
            />
          ))}
        </div>
        <div className={styles.tips_wrapper}>
          <div className={styles.headline}>
            <AiOutlineInfoCircle size={20} style={{float:'left'}} />
            <h4 style={{float:'left'}} >Tips</h4>
          </div>
          <p className={styles.each_tip}>
          Sales enablement leaders need a clear strategy to support the sales force in a virtual selling environment.
          </p>
          <p className={styles.each_tip}>
          For successful virtual selling today, sales enablement leaders must adjust their existing investments and reallocate resources among people, processes and technology.
          </p>
        </div>
      </div>
    </div>
  );
};

export { SelectRoomType };
