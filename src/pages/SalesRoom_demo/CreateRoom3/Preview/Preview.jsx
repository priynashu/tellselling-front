import React, { Component, useState } from 'react'
import Button from '@mui/material/Button';
import { getLocalUser } from '../../../../utils/GetLocalUser';
import axios from 'axios';
import styles from '../salescontent.module.scss';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FiTarget } from "react-icons/fi";
import { BiChevronsRight } from "react-icons/bi";

import { BiChevronLeft } from "react-icons/bi";

export class Preview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.PreviewData,
            filtered_content: this.props.PreviewData[0]
        }
    }

    render() {
        const FileViewer = (url) => {
            return (
                <></>
            );
        }
        const FilteredContent = (section) => {
            this.state.data.forEach((val, key) => {
                if (val.section_name == section) {
                    this.setState({ filtered_content: val })
                }
            })

        }

        const Sections = () => {
            return (
                <Nav className="flex-column">
                    {
                        this.state.data.map((val, key) => {
                            return (
                                <Nav.Link style={{ color: '#000000' }} onClick={() => { FilteredContent(val.section_name) }}>
                                    <BiChevronsRight style={{ marginRight: 10, fontSize: 30, color: 'blue' }} /> {val.section_name}
                                </Nav.Link>
                            )
                        })
                    }
                </Nav>
            )
        }
        const Content = () => {
            return (
                <>
                    <h3><FiTarget style={{ marginRight: 10, fontSize: 30, color: 'blue' }} /> {this.state.filtered_content.section_name}</h3>
                    <div>
                        {
                            this.state.filtered_content.contents.map((data, key) => {
                                return (
                                    <iframe style={{ height: 450, width: '90%', marginTop: '40px', border:'0.5px solid #f1f1f1' }} src={data.fileCdnLink}></iframe>
                                )
                            })
                        }
                    </div>
                </>
            )
        }
        const WelcomeMessgae = () => {
            const welcome_message = this.props.WelcomeMessage;
            console.log(welcome_message);
            if(welcome_message.type=='video'){
                return (
                    <video controls style={{ marginTop: '5', width: '100%', height: 'auto', borderRadius: '20' }}>
                        <source src={welcome_message.url} type='video/webm' />
                    </video>
                )
            }else{
                return (<></>)
            }
            
        }
        const CTA = () => {

            return (
                <>
                    <b style={{ borderBottom: '2px solid #eee' }}>Salesroom for Admin & Team</b>
                    <p style={{ fontSize: 14, marginTop: 10, color: '#a1a1a1' }}><b>Contact :</b> Admin</p>
                    <WelcomeMessgae/>
                    <Button sx={{ mt: 2 }} style={{ width: '100%', marginBottom: '10' }} variant="contained">Book a Meeting</Button>
                    <Button sx={{ mt: 1 }} style={{ width: '100%', marginTop: '10' }} variant="outlined">Ask a question</Button>
                </>
            )
        }
        return (
            <>
                <Button onClick={() => { this.props.UpdateScreen('SALESROOM'); }}><BiChevronLeft style={{ marginRight: 8 }} /> Back to Salesroom Content</Button>
                <Container style={{ backgroundColor: '#ffffff', padding: 10, paddingTop: 30 }}>
                    <Row>
                        <Col><Sections /></Col>
                        <Col xs={6}><Content /></Col>
                        <Col><CTA /></Col>
                    </Row>
                </Container>
            </>

        )
    }
}

export default Preview
