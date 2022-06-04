import React, { Component, useState } from 'react';
import Container from 'react-bootstrap/Container';
import {
    Row,
    Col,
    Image,
    Form,
    Button,
    InputGroup
} from 'react-bootstrap';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import styles from "./createRoom3.module.scss"
import { BsVimeo, BsCalendar, BsArrowRepeat } from 'react-icons/bs';
import EventNoteIcon from '@mui/icons-material/EventNote';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import DatePicker from 'react-date-picker';
import DateTimePicker from 'react-datetime-picker';
import { FaKey } from 'react-icons/fa'
import { FiFastForward } from 'react-icons/fi'
import { MdOutlineRotateRight } from 'react-icons/md'
import { AiOutlinePicture, AiFillYoutube } from 'react-icons/ai'
import { SiWistia } from 'react-icons/si'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import { DefaultThumbnails } from './DefaultThumbnails'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Schedule from './Schedule';



class Info extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alignment: 'left',
            dateValue: new Date(),
            selected_thumbnail: 'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1658&q=80',
            stream_platform: 'Youtube',
            stream_link: '',
            event_type:'Multiple',
            event_dates:[],
            event_date:"",
            required_registration:false,
            required_registration_approvals:false,
            title:'',
            link:'',
            fullDate:this.props.InfoData.fullDate
        }
    }
    CheckAllOk = () =>{
        if(this.state.title.length!=0 && this.state.stream_id.length!=0 && this.state.event_dates.length!=0){
            return true;
        }else{
            return false;
        }
    }
    Information = () =>{
        console.log("room 3 date",this.state.event_date.length);
        const final_data = {
            name: this.state.title,
            thumbnail: this.state.selected_thumbnail,
            description: '',
            events:this.state.event_dates,
            platform: this.state.stream_platform,
            stream_id: this.state.link,
            event_date:[],
            link:Math.random().toString(36).slice(2),
            fullDate:this.state.fullDate,
            dateTime:this.state.event_date?this.state.event_date:new Date().toLocaleString()
        }
        console.log("create event live:",final_data);
        this.props.UpdateInfo(final_data);
        this.props.UpdateScreen('SALESROOM');
    }

    render() {
        //parent functions
        const SetEventType=(type)=>{
            this.setState({event_type:type});
        }
        const setEventDate=(date)=>{
            this.setState({event_date:date})
        }
        const SetEventDates=(dates)=>{
            this.setState({event_dates:dates});
        }
        const HandleTitle = (e) =>{
            this.setState({title: e.target.value})
        }
        const HandleLink = (e) =>{
            this.setState({link: e.target.value})
        }
        const ThumbnailSelect = () => {
            const [thumbnailModal, setThumbnailModal] = useState(false);
            const handleClose = () => {
                setThumbnailModal(false);
            }
            const handleOpen = () => {
                setThumbnailModal(true);
            }
            const style = {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 600,
                bgcolor: 'background.paper',
                border: 'none',
                boxShadow: 40,
                p: 2,
            };
            const SelectImage = (image) => {
                this.setState({ selected_thumbnail: image })
            }
            return (
                <>
                    <Button onClick={handleOpen} style={{ fontSize: "15px" }} className="mt-3" variant="secondary">
                        <AiOutlinePicture style={{ marginRight: '5px' }} />Change Cover Photo
                    </Button>
                    <Modal
                        open={thumbnailModal}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        style={{ border: 'none' }}
                        aria-describedby="modal-modal-description">
                        <Box sx={style} style={{ border: 'none' }}>
                            <Typography id="modal-modal-title" style={{ marginBottom: '10px' }} variant="h6" component="h2">
                                Select Cover Image
                            </Typography>
                            <Row>
                                {
                                    DefaultThumbnails.map((thumb, key) => {
                                        return (
                                            <Col sm={4}>
                                                <img className={'thumbnail-choose'} style={{ width: '100%', height: ' 100px', marginBottom: '15px', cursor: 'pointer' }} onClick={() => { SelectImage(thumb); }} src={thumb} />
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </Box>
                    </Modal>
                </>
            );
        }
        const SelectStream = (e) => {
            this.setState({ stream_platform: e.target.value })
        }
        const StreamInfo = () => {
            return (
                <Row>
                    <Col sm={12} className="mt-4">
                        <div
                            style={{
                                background: "#ccddff"
                            }}
                            className={styles.stream_box}>
                            {
                                (this.state.stream_platform == 'Youtube') ?
                                    <>
                                        <p className={styles.stream_link}><AiFillYoutube style={{ fontSize: "30px", color: "red" }} />
                                            &nbsp;Youtube, nice! Please Copy the video ID below - eg.
                                            https://www.youtube.com/watch?v=<span style={{
                                                fontWeight: "bold",
                                                color: "blue"
                                            }}>LXb3EKWsinQ</span>
                                        </p>
                                    </> : <></>
                            }
                            {
                                (this.state.stream_platform == 'Vimeo') ?
                                    <>
                                        <p className={styles.stream_link}><BsVimeo style={{ fontSize: "20px", color: "#00ADEF" }} />
                                            &nbsp;&nbsp; Vimeo, great! Please Copy the video ID below - eg.
                                            https://vimeo.com/<span style={{
                                                fontWeight: "bold",
                                                color: "blue"
                                            }}>76979871</span>
                                        </p>
                                    </> : <></>
                            }
                            {
                                (this.state.stream_platform == 'Wistia') ?
                                    <>
                                        <p className={styles.stream_link}><SiWistia style={{ fontSize: "20px", color: "#56be8e" }} />
                                            &nbsp;&nbsp; Wistia, excellent! Please Copy the video ID below - eg.
                                            https://support.wistia.com/medias/<span style={{
                                                fontWeight: "bold",
                                                color: "blue"
                                            }}>h1z3uqsjal</span>
                                        </p>
                                    </> : <></>
                            }
                        </div>
                    </Col>
                </Row>
            )

        }
        const HandleRequireRegistration = (e) =>{
            if(this.state.required_registration){
                this.setState({required_registration:false})
            }else{
                this.setState({required_registration:true})
            }
        }
        const HandleRequireRegistrationApprovals = (e) =>{
            if(this.state.required_registration_approvals){
                this.setState({required_registration_approvals:false})
            }else{
                this.setState({required_registration_approvals:true})
            }
        }
        const setFullDate=(date)=>{
            this.setState({fullDate:date})
        }
        return (
            <>
                <Container className={styles.container}>
                    <Row className="h-5" fluid>
                        <Col sm={12} className={styles.img_col}>
                            <Image
                                className='w-100'
                                style={{ height: '250px' }}
                                src={this.state.selected_thumbnail} />
                            <ThumbnailSelect />
                            <Form>
                                <Row className='mt-3'>
                                    <Col sm={12}>
                                        <Form.Label style={{ fontWeight: "500", color: '#4c4a4a' }}>Event Name</Form.Label>
                                        <InputGroup className="mb-3">
                                            <Form.Control placeholder="Sales Demo Webminar" onChange={HandleTitle} className={styles.event_form} />
                                            <MdOutlineRotateRight className={styles.event_btn} />
                                        </InputGroup>

                                    </Col>
                                </Row>
                                <Row className="mt-1">
                                    <Col sm={6}>
                                        <Form.Label className={styles.stream_text}>Stream provider</Form.Label>
                                        <Form.Select aria-label="Default select example" onChange={SelectStream}>
                                            <option value="Youtube">Youtube</option>
                                            <option value="Vimeo">Vimeo</option>
                                            <option value="Wistia">Wistia</option>
                                        </Form.Select>
                                    </Col>
                                </Row>
                                <StreamInfo />
                                <Row className="mb-4">
                                    <Col sm={12}>
                                        <Form.Label className={styles.stream_identifier}>Stream Identifier</Form.Label>
                                        <Form.Control placeholder="Stream ID e.g. XXXXXXXX" onChange={HandleLink}/>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Container> < hr />
                <Container className={styles.container}>
                    <Row className={styles.row2}>
                        <Col>
                            <Schedule SetEventType={SetEventType} Type={this.state.event_type} Dates={this.state.event_dates} SetEventDates={SetEventDates} setFullDate={setFullDate} setEventDate={setEventDate} />
                            <br />
                            <br />
                            <Row>
                                <p className={styles.access_text}>
                                    <span><FaKey className={styles.key} /></span>&nbsp;Access</p>
                                <br />
                                <br />
                                <Row className="mb-3">
                                    <Col sm={1}>
                                        <Form.Check type="checkbox" onChange={HandleRequireRegistration}></Form.Check>
                                    </Col>
                                    <Col sm={9} className={styles.checkbox_require}>
                                        <Form.Text className="fw-bold" style={{fontSize: "15px"}}>Require Registration</Form.Text>
                                        <br />
                                        <Form.Text style={{opacity: "0.5"}}>If selected, guests must register to receive meeting details.</Form.Text>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={1}>
                                        <Form.Check type="checkbox" onChange={HandleRequireRegistrationApprovals}></Form.Check>
                                    </Col>
                                    <Col sm={10} className={styles.checkbox_require}>
                                        <Form.Text className="fw-bold" style={{fontSize: "15px"}}>Require Registration Approval</Form.Text>
                                        <br />
                                        <Form.Text style={{ opacity: "0.5"}}>If selected, meeting information will only be sent to manually approved guests.</Form.Text>
                                    </Col>
                                </Row>
                                <br />
                                <br />
                                <br />

                                <div className="mb-2">
                                    <Button variant="secondary" onClick={this.Information} size="md"><FiFastForward className={styles.createEvent_icon} />
                                        &nbsp;Create Event</Button>
                                </div>
                                <br />
                                {
                                    (!this.CheckAllOk)?<p style={{ color: "red", fontSize: "13px", fontWeight: "700" }}>There are errors that need to be fixed before submitting.</p>:<></>
                                }
                                
                            </Row>

                        </Col>

                    </Row>
                </Container>
            </>
        )
    }
}
export default Info;