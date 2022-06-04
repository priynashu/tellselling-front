import React, { Component } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Container } from '@mui/material';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { FiTarget } from "react-icons/fi";
import { BiChevronsRight } from "react-icons/bi";
import { BiChevronLeft } from "react-icons/bi";
import './style.css'
import { InlineWidget,PopupButton } from "react-calendly";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import urlParser from "url-parse"
import { backend_url } from '../../utils/Config';
class SalesRooms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            selected_section: '',
            contents: []
        }
    }
    FetchData = async () => {
        const query=urlParser(window.location.href).pathname;
        const link=query.substring(12,query.length);
        //const link = "";
        const url = backend_url+"salesroom/" + link + "/" + link;
        //console.log(url);
        await axios.get(url).then((res) => {
            this.setState({ data: res.data });
            console.log(res.data);
            document.title = res.data.title;
        }).catch((err) => {
            console.log(err);
        })
    }
    componentDidMount() {
        this.FetchData();
    }

    render() {
        const SelectSection = (section) => {
            this.setState({ selected_section: section });
            if (this.state.data.contents != undefined) {
                this.state.data.contents.map((val, key) => {
                    if (val.section_name == section) { 
                        this.setState({ selected_section: val.section_name });
                        this.setState({ contents: val.contents });
                    }
                })
            }
        }
        const SectionList = () => {
            if (this.state.data.contents != undefined) {
                const temp = [];
                this.state.data.contents.map((val, key) => {
                    temp.push(val.section_name);
                })
                return (
                    <ListGroup style={{ border: 'none', cursor: 'pointer' }}>
                        {
                            this.state.data.contents.map((content) => {
                                return (
                                    <ListGroup.Item style={{ border: 'none', cursor: 'pointer' }} onClick={() => { SelectSection(content.section_name) }}>
                                        <h5><BiChevronsRight style={{ float: 'left', color: 'blue' }} />{content.section_name}</h5>
                                    </ListGroup.Item>
                                )
                            })

                        }
                    </ListGroup>
                )
            }
            return (
                <ListGroup style={{ border: 'none', cursor: 'pointer' }}>

                </ListGroup>
            )
        }

        const Contents = () => {
            if (this.state.selected_section.length == 0) {
                if (this.state.data.contents != undefined) {
                    this.state.data.contents.map((val, key) => {
                        if (key == 0) {
                            this.setState({ selected_section: val.section_name });
                            this.setState({ contents: val.contents });
                        }
                    })
                }
            }
            return (
                <>
                    <h3><FiTarget style={{ float: 'left', marginRight: '10px', color: 'blue' }} />{this.state.selected_section}</h3>
                    {
                        this.state.contents.map((resource, key) => {
                            return (
                                <iframe src={resource.fileCdnLink} style={{ width: '100%', height: '350px', border: '0.5px solid black', marginBottom: '20px' }}></iframe>
                            )
                        })
                    }
                </>
            )
        }
        const CTA = () => {
            if (this.state.data.contents != undefined) {
                const cta = JSON.parse(this.state.data.cta);
                console.log(cta);
                return (
                    <>
                        <small><b>Contact :</b> {this.state.data.sales_person}</small>
                        <video controls style={{ marginTop: '5', width: '100%', height: 'auto', borderRadius: '20' }}>
                            <source src={this.state.data.welcome_message.url} type='video/webm' />
                        </video>
                        {
                            cta.map((action, key) => {
                                if (action.type == 'MEETING') {
                                    return (
                                        <>
                                            <PopupButton
                                                className=""
                                                pageSettings={{
                                                    backgroundColor: 'ffffff',
                                                    hideEventTypeDetails: false,
                                                    hideGdprBanner: true,
                                                    hideLandingPageDetails: false,
                                                    primaryColor: '00a2ff',
                                                    textColor: '4d5055'
                                                }}
                                                prefill={{
                                                    customAnswers: {
                                                        a1: 'a1',
                                                        a10: 'a10',
                                                        a2: 'a2',
                                                        a3: 'a3',
                                                        a4: 'a4',
                                                        a5: 'a5',
                                                        a6: 'a6',
                                                        a7: 'a7',
                                                        a8: 'a8',
                                                        a9: 'a9'
                                                    },
                                                    date: new Date('2022-02-01T18:03:09.767Z'),
                                                    email: 'test@test.com',
                                                    firstName: 'Jon',
                                                    guests: [
                                                        'janedoe@example.com',
                                                        'johndoe@example.com'
                                                    ],
                                                    lastName: 'Snow',
                                                    name: 'Jon Snow'
                                                }}
                                                styles={{ width:'100%'}}
                                                text="Book a Meeting"
                                                url="https://calendly.com/utpalendu"
                                                utm={{
                                                    utmCampaign: 'Spring Sale 2019',
                                                    utmContent: 'Shoe and Shirts',
                                                    utmMedium: 'Ad',
                                                    utmSource: 'Facebook',
                                                    utmTerm: 'Spring'
                                                }}
                                            />
                                        </>
                                    )
                                }
                                if (action.type == 'SIGNUP') {
                                    return (
                                        <Button variant="contained" style={{ width: '100%', marginTop: '10px' }}>Signup</Button>
                                    )
                                }
                            })
                        }

                    </>
                )
            } else {
                return (
                    <></>
                )
            }

        }
        return (

            <>
                <Container style={{ marginTop: '30px' }}>
                    <h2>{this.state.data.title}</h2>
                    <Row style={{ marginTop: '20px' }}>
                        <Col sm={3}>
                            {
                                (this.state.data.length != 0) ? <SectionList /> : <></>
                            }

                        </Col>

                        <Col sm={6}>
                            <Contents />
                        </Col>
                        <Col sm={3}>
                            <CTA />
                        </Col>
                    </Row>
                </Container>

            </>
        )
    }
}
export default SalesRooms