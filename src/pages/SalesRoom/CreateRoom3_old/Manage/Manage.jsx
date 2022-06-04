import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Tabs from 'react-bootstrap/Tabs';
import {
    Row,
    Col,
    InputGroup,
    FormControl
} from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import { BiChevronLeft } from "react-icons/bi";
import { Container } from 'react-bootstrap';
import Info from './Details/Info'
import Questions from './Questions/Questions'
import Emails from './Emails/Emails'
import Guests from './Guests/Guests';

export class Manage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current_tab: 0,
            info: this.props.InfoData
        }
    }
    render() {
        console.log("manage event data",this.props.InfoData);
        // const date = JSON.stringify(this.props.InfoData.fullDate).substring(1,11)
        return (
            <>
                <Container style={{ padding: '0px 150px' }}>
                    <div style={{ display: 'block', width: '100%', backgroundColor: '#ffffff' }}>
                        <h4><BiChevronLeft onClick={() => { this.props.UpdateScreen('SALESROOM') }} style={{ fontSize: '30px', marginRight: '10px', marginTop:'20px', cursor: 'pointer' }} />{this.props.InfoData.name}</h4>
                        <Row>
                            <Col sm={7}>
                                {
                                    this.props.InfoData?.events?.map((val, key) => {
                                        let eventDate = JSON.stringify(val.dateTime).substring(1,11)
                                        return (<small>Event Date : {eventDate}</small>)
                                    })
                                }
                            </Col>
                            <Col sm={5}>
                                <small>Link</small>
                                <InputGroup className="mb-3">
                                    <InputGroup.Text size={'small'} id="basic-addon1">https://domain/com/</InputGroup.Text>
                                    <FormControl
                                        placeholder="Username"
                                        aria-label="Username"
                                        value={this.props.InfoData.link}
                                        aria-describedby="basic-addon1"
                                    />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Tabs defaultActiveKey="first">
                            <Tab eventKey="first" title="Details">
                                <Info Data={this.props.InfoData} />
                            </Tab>
                            <Tab eventKey="second" title="Guests">
                                <Guests link={this.props.InfoData.link} />
                            </Tab>
                            <Tab eventKey="third" title="Emails">
                                <Emails Data={this.props.InfoData}/>
                            </Tab>
                            <Tab eventKey="four" title="Questions">
                                <Questions updateQuestion={this.props.updateQuestion}/>
                            </Tab>
                        </Tabs>
                    </div>
                </Container>
            </>
        )
    }
}

export default Manage