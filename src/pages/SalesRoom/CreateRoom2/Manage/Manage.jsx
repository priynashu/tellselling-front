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
import Guest from './Guests/Guests'
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
        const date = JSON.stringify(this.props.InfoData.fullDate).substring(1,11)
        
        
            // this.props.UpdatemeetingUrl("12345");
        
        return (
            <>
                <Container style={{ padding: '0px 150px' }}>
                    <div style={{ display: 'block', width: '100%', backgroundColor: '#ffffff' }}>
                        <h4><BiChevronLeft onClick={() => { this.props.UpdateScreen('SALESROOM') }} style={{ fontSize: '30px', marginRight: '10px', cursor: 'pointer' }} />{this.props.InfoData.name}</h4>
                        <Row style={{margin:"10px"}}>
                            <h4 >{this.props.InfoData.title}</h4>
                        </Row>
                        <Row style={{margin:"10px"}}>
                            <Col sm={7}>
                            <small style={{fontSize:"16px"}}>Event Date :{date}</small>
                                {/* {
                                    this.props.InfoData.events.map((val, key) => {
                                        return (<small>Event Date : {val.date}</small>)
                                    })
                                } */}
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
                                <Info Data={this.props.InfoData} UpdateEventPlace={this.props.UpdateEventPlace} UpdatemeetingUrl={this.props.UpdatemeetingUrl} />
                            </Tab>
                            <Tab eventKey="second" title="Guests">
                                <Guest link={this.props.InfoData.link} />
                            </Tab>
                            <Tab eventKey="third" title="Emails">
                                <Emails Data={this.props.InfoData} />
                            </Tab>
                            <Tab eventKey="four" title="Questions">
                                <Questions  updateQuestion={this.props.updateQuestion} question={this.props.question} link={this.props.InfoData.link}/>
                            </Tab>
                        </Tabs>
                    </div>
                </Container>
            </>
        )
    }
}

export default Manage