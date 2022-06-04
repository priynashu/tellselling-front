import React, { Component } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import 'bootstrap/dist/css/bootstrap.min.css';
import { FiTarget } from "react-icons/fi";
import { Card, Col, Row } from 'react-bootstrap';


const Empty = () => {
    return (
        <div>
            <small style={{ textAlign: 'center', color: '#a1a1a1' }}>No Content Section Found</small>
        </div>
    )
}
const SectionWiseContents = ({ contents }) => {
    //console.log(contents);
    return (
        
        <>
          <div style={{ width: '100%' }}>
                <b style={{ marginTop: 20 }}>Sections</b>
            </div>

            { 
            
                (contents.length == 0) ? <Empty /> : <></>
            
            }
            <Accordion defaultActiveKey="0" style={{ marginTop: 10, marginBottom: 10 }}>
                {contents.map((data, key) => {
                    return (
                        
                        <Accordion.Item eventKey={key}>
                            <Accordion.Header style={{ borderRadius: 0, padding: 0 }}><FiTarget style={{ marginRight: 8 }} />{data.section_name}</Accordion.Header>
                            <Accordion.Body>
                                <Row>
                                    {
                                        (data.contents.length == 0) ? <small style={{ width: '100%', color: 'gray', textAlign: 'center', padding: '40px' }}>No content found</small> : <></>
                                    }
                                    { 
                                        data.contents.map((content, k) => {
                                            const create_date = new Date(content.createdAt)
                                            return (
                                                <Col sm={4}>
                                                    <Card style={{ marginBottom: 10 }}>
                                                        <Card.Body style={{ padding: 5, height: '100px', width: '100%', backgroundPosition: 'center', backgroundSize: 'cover', backgroundImage: `url(${content.thumbnail})`, cursor: 'pointer' }} variant="top"></Card.Body>
                                                        <Card.Body style={{ padding: '0.5rem 0.5rem' }}>
                                                            <b style={{ fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', lineClamp: 2, boxOrient: 'vertical' }}>
                                                                {content.resourceTitle}
                                                            </b>
                                                            <div>
                                                                <small style={{ fontSize: 10 }}>Created at {create_date.getDay() + "-" + (create_date.getMonth() + 1) + "-" + create_date.getFullYear()}</small>
                                                                <div>
                                                                    {
                                                                        content.tags.map((val, i) => {
                                                                            return (<span style={{ backgroundColor: '#eee', margin: 5, padding: '2px 8px', borderRadius: '30%', fontSize: 8 }}>{val.label}</span>)
                                                                        })
                                                                    }

                                                                </div>
                                                            </div>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            )
                                        })
                                        
                                    }
                                </Row>
                            </Accordion.Body>
                        </Accordion.Item>

                    )
                })}
            </Accordion>
        </>
    );
}

export default SectionWiseContents
