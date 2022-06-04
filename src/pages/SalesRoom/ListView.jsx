import React, { useEffect } from 'react'
import styles from './Salesroom.module.scss';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { AllRoutes } from '../../utils/AllRoutes';
import Empty from '../../components/Empty';
import * as alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import axios from 'axios'
import { backend_url } from '../../utils/Config';
function ListView({ contents, search,onSuccess}) {
    const navigate = useNavigate();
     console.log("contents are",contents);
    const temp = contents.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    // console.log("sorted elements are:",temp);
    let temp_more=temp.filter((item)=>{
        if(item.title.toUpperCase().includes(search.toUpperCase())){
            return item;
        }
        if(search.length==0){
            return item;
        }
    })
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
    const handleDeleteClick=(data)=>{
        console.log("delete data",data);
        alertify.confirm("Are you Sure","", function(){ 
             console.log("yes confirm");
             const deleteData={type:data.type,link:data.link}
             axios.post(backend_url+"salesroom/delete",deleteData).then((res)=>{
                onSuccess()
                //  window.location.reload()
                 console.log("delete salesroom successfull");
             }).catch((error)=>{
                console.log(error.message);
             })
             },
             function(){ 
                
                console.log("cancel");
            });
    }
    return (
        <>
            {
                temp_more.map((data, key) => {
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
                                    <Button onClick={()=>handleDeleteClick(data)} fullWidth variant='custom' className={styles.deleteBtn} style={{ textTransform: 'none' }}>
                                        Delete
                                    </Button>
                                </div>
                                <br />
                                
                            </div>
                        </div>
                    );
                })
            }
            {
                (temp_more.length==0)?<Empty/>:<></>
            }
        </>
    )
}

export default ListView
