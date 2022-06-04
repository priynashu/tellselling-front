import React from 'react';
import styles from './Salesroom.module.scss';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { AllRoutes } from '../../utils/AllRoutes';
import { Card, Col, Row } from 'react-bootstrap';
import Empty from '../../components/Empty';
import * as alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.css';
import axios from 'axios'
import { backend_url } from '../../utils/Config';
export default function GridView({ contents,search,onSuccess }) {
    const navigate = useNavigate();
    const temp=contents.filter((item)=>{
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
                //  window.location.reload()
                onSuccess()
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
        <Row>
            {
                temp?.map((data, key) => {
                    return (
                        <Col sm={3} style={{marginTop:'10px'}}>
                            <Card style={{ width: '100%' }} className={styles.salesroom_grid_cards}>
                                <Card.Img variant="top" style={{height:'160px'}} src={data.thumbnail} />
                                <Card.Body>
                                    <Card.Title>{data.title}</Card.Title>
                                    <Card.Text>
                                    {data.description}
                                    </Card.Text>
                                    <Button className={styles.editGridBtn} onClick={()=>{handleEditClick(data)}} fullWidth variant='custom' style={{ textTransform: 'none' }}>
                                        Edit
                                    </Button>
                                    <Button className={styles.deleteBtn} onClick={()=>{handleDeleteClick(data)}} fullWidth variant='custom' style={{ textTransform: 'none' }}>
                                        Delete
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })
            }
            {
                (temp.length==0)?<Empty/>:<></>
            }
        </Row>
    );
}
