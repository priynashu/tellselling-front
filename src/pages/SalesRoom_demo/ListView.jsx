import React from 'react'
import styles from './Salesroom.module.scss';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { AllRoutes } from '../../utils/AllRoutes';

function ListView({ contents, search}) {
    const navigate = useNavigate();
    const temp = contents.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    // console.log("sorted elements are:",temp);
    // const temp=contents.filter((item)=>{
    //     if(item.title.toUpperCase().includes(search.toUpperCase())){
    //         return item;
    //     }
    //     if(search.length==0){
    //         return item;
    //     }
    // })
    const handleEditClick=(data)=>{
        // console.log("data inside edit:",data);
        if(data.platform){
            console.log("it is live");
            navigate(AllRoutes.createRoom3+"?"+data.link)
        }
        else if(data.meetingValues){
            console.log("it is web");
            navigate(AllRoutes.createRoom2+"?"+data.link)
        }
        else{
            console.log("it is basic");
            navigate(AllRoutes.createRoom1+"?"+data.link)
        }
        
        
    }
    return (
        <>
            {
                temp.map((data, key) => {
                    return (
                        <div className={styles.salesroom_cards}>
                            <div className={styles.full_card}>
                                <div className={styles.image_wrapper}>
                                    <img src={data.thumbnail} style={{borderRadius:"5px"}} alt={data.title} />
                                </div>
                                <div className={styles.card_content}>
                                    <p className={styles.tags}>
                                        {
                                            data.tags.map((tag,k)=>{
                                                return (
                                                    <>#{tag} </>
                                                )
                                            })
                                        }
                                    </p>
                                    <h3 className={styles.content_title}>{data.title}</h3>
                                    <h4 className={styles.content_author}>
                                        By <span>{data.sales_person}</span>
                                    </h4>
                                    <p className={styles.content_des}>
                                        {data.description}
                                    </p>
                                </div>
                                <div className={styles.edit_area}>
                                    <Button onClick={()=>handleEditClick(data)} fullWidth variant='custom' className={styles.editBtn} style={{ textTransform: 'none' }}>
                                        Edit
                                    </Button>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </>
    )
}

export default ListView
