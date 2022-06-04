import React from 'react';
import styles from './Salesroom.module.scss';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { AllRoutes } from '../../utils/AllRoutes';
import { Card, Col, Row } from 'react-bootstrap';

export default function GridView({ contents,search }) {
    const navigate = useNavigate();
    const temp=contents.filter((item)=>{
        if(item.title.toUpperCase().includes(search.toUpperCase())){
            return item;
        }
        if(search.length==0){
            return item;
        }
    })
    return (
        <Row>
            {
                temp.map((data, key) => {
                    return (
                        <Col sm={3} style={{marginTop:'10px'}}>
                            <Card style={{ width: '100%' }} className={styles.salesroom_grid_cards}>
                                <Card.Img variant="top" style={{height:'160px'}} src={data.thumbnail} />
                                <Card.Body>
                                    <Card.Title>{data.title}</Card.Title>
                                    <Card.Text>
                                    {data.description}
                                    </Card.Text>
                                    <Button onClick={()=>{navigate(AllRoutes.createRoom1+"?"+data.link)}} fullWidth variant='contained' style={{ textTransform: 'none' }}>
                                        Edit
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })
            }
        </Row>
    );
}
