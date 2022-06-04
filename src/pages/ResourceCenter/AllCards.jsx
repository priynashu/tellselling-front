import { ResourceCard } from './ResourceCard';
import styles from './resource.module.scss';

// const url1 = 'https://source.unsplash.com/XtUd5SiX464/1000x900';
// const url2 = 'https://source.unsplash.com/xej3GOtAQ-o/1000x900';
// const url3 = 'https://source.unsplash.com/b-qKvXilo6Q/1000x900';

export const AllCards = ({ resourceData , openEditDrawer , fetchData}) => {
  return (
    <div className={styles.card_wrapper}>
      {resourceData?.map((item) => (
        <ResourceCard
          key={item._id}
          id={item._id}
          imageUrl={item.thumbnail}
          category={item.resourceCategory}
          title={item.resourceTitle}
          shares={item.sharedBy.length}
          views={item.viewedBy.length}
          openEditDrawer={openEditDrawer}
          fetchData = {fetchData}
        />
      ))}
      {/* <ResourceCard
        imageUrl={url1}
        category='Why References'
        title="Referenceble Sales Overview May'21"
        shares={60}
        views={107}
      /> */}
    </div>
  );
};
